import { useState, useEffect } from 'react';
import {
  Info,
  Shield,
  LineChart,
  FileText,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Zap,
  Bookmark,
  Search,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Check,
} from 'lucide-react';
import { settingsMenuApi } from '../../services/api';

// Must stay in sync with SettingsPage's ICON_MAP
const ICON_OPTIONS = [
  'Zap', 'Bookmark', 'Info', 'Shield', 'LineChart',
  'FileText', 'LayoutDashboard', 'LogOut',
];

const ICON_MAP = {
  Info, Shield, LineChart, FileText, LayoutDashboard, LogOut, Zap, Bookmark,
};

// ── Toggle (compact & orange theme) ──────────────────────────────────────────
const CustomToggle = ({ isOn, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-10 h-5 rounded-full relative transition-colors duration-300 flex items-center shrink-0 ${isOn ? 'bg-[#FF6B00]' : 'bg-[#334155]'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform duration-300 flex items-center justify-center ${isOn ? 'translate-x-5' : 'translate-x-1'}`}>
      {isOn && <Check size={10} className="text-[#FF6B00]" strokeWidth={4} />}
    </div>
  </button>
);

// ── Compact Preview Card (Orange theme) ──────────────────────────────────────
const PreviewCard = ({ item }) => {
  const IconComponent = ICON_MAP[item.icon_key] || Info;
  return (
    <div
      className={`w-full flex items-center justify-between px-3 py-2 bg-[#0A0A0A] border ${item.is_highlight
          ? 'border-[#FF6B00]/40 shadow-[0_0_10px_rgba(255,107,0,0.1)]'
          : 'border-white/5'
        } rounded-xl shadow-sm`}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <div className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center border ${item.is_highlight
            ? 'bg-[#FF6B00]/15 border-[#FF6B00]/70'
            : 'bg-white/5 border-white/10'
          }`}>
          <IconComponent className="w-3.5 h-3.5 text-[#FF6B00]" strokeWidth={2.2} />
        </div>
        <span className="font-semibold text-xs tracking-wide text-gray-200 truncate">
          {item.name || 'Menu Item'}
        </span>
      </div>
      <ChevronRight size={14} className={item.is_highlight ? 'text-[#FF6B00]' : 'text-gray-600'} />
    </div>
  );
};

// ── Empty form state ─────────────────────────────────────────────────────────
const emptyForm = () => ({
  name: '',
  icon_key: 'Info',
  path: '',
  is_highlight: false,
  is_logout: false,
  status: true,
  sort_order: 0,
});

// ════════════════════════════════════════════════════════════════════════════
const AdminSettings = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModal] = useState(false);
  const [editingItem, setEditing] = useState(null); // null = create mode
  const [formData, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ── Fetch ──────────────────────────────────────────────────────────────
  const fetchItems = () => {
    setLoading(true);
    settingsMenuApi
      .getAll()
      .then(setItems)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  // ── Derived list (client-side search) ─────────────────────────────────
  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── Status toggle ──────────────────────────────────────────────────────
  const toggleStatus = async (item) => {
    // Optimistic update
    setItems((prev) =>
      prev.map((i) => i.id === item.id ? { ...i, status: !i.status } : i)
    );
    try {
      await settingsMenuApi.update(item.id, { status: !item.status });
    } catch {
      // Revert on failure
      setItems((prev) =>
        prev.map((i) => i.id === item.id ? { ...i, status: item.status } : i)
      );
    }
  };

  // ── Open modals ────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      icon_key: item.icon_key,
      path: item.path || '',
      is_highlight: item.is_highlight,
      is_logout: item.is_logout,
      status: item.status,
      sort_order: item.sort_order,
    });
    setModal(true);
  };

  // ── Save (create or update) ────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        path: formData.path || null,
      };
      if (editingItem) {
        const updated = await settingsMenuApi.update(editingItem.id, payload);
        setItems((prev) => prev.map((i) => i.id === updated.id ? updated : i));
      } else {
        const created = await settingsMenuApi.create(payload);
        setItems((prev) => [...prev, created].sort((a, b) => a.sort_order - b.sort_order));
      }
      setModal(false);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await settingsMenuApi.remove(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleteId(null);
    }
  };

  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="w-full h-auto md:h-full flex flex-col">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg md:text-xl font-bold text-white tracking-wider uppercase">
          Settings Menu
        </h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white font-bold hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] transition-all shadow-lg text-sm"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search menus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#141a29] border border-gray-700 text-white rounded-full pl-4 pr-10 py-2 outline-none focus:border-[#FF6B00] text-sm w-full sm:w-64 placeholder-gray-500 transition-all focus:shadow-[0_0_10px_rgba(255,107,0,0.2)]"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Modern Compact Table */}
      <div className="flex-none md:flex-1 bg-[#141a29] rounded-xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#1e293b]/80 border-b border-gray-800 text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 w-1/3">Item Details</th>
                <th className="px-4 py-3 hidden sm:table-cell max-w-[140px]">Path</th>
                <th className="px-4 py-3 text-center w-16">Sort</th>
                <th className="px-4 py-3 text-center w-20">Status</th>
                <th className="px-4 py-3 hidden lg:table-cell w-[260px]">Preview</th>
                <th className="px-4 py-3 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#FF6B00]" size={24} />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    No items found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const IconComponent = ICON_MAP[item.icon_key] || Info;
                  return (
                    <tr key={item.id} className="hover:bg-[#1e2638] transition-colors group">
                      
                      {/* Item Details (Name + Badges) */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-[#FF6B00]/10 flex items-center justify-center shrink-0 border border-[#FF6B00]/20">
                            <IconComponent size={14} className="text-[#FF6B00]" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-white truncate text-sm">{item.name}</span>
                              {item.is_highlight && (
                                <span className="px-1.5 py-0.5 rounded bg-[#FF6B00]/10 text-[#FF6B00] text-[9px] font-bold border border-[#FF6B00]/20 uppercase">Highlight</span>
                              )}
                              {item.is_logout && (
                                <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 text-[9px] font-bold border border-red-500/20 uppercase">Logout</span>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono mt-0.5 sm:hidden truncate">{item.path || 'No path'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Path (Truncated) */}
                      <td className="px-4 py-3 hidden sm:table-cell max-w-[140px]">
                        <div className="truncate text-xs font-mono text-gray-400" title={item.path}>
                          {item.path || '—'}
                        </div>
                      </td>

                      {/* Sort */}
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-medium text-gray-400 bg-black/30 px-2 py-1 rounded border border-white/5">{item.sort_order}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <CustomToggle isOn={item.status} onToggle={() => toggleStatus(item)} />
                        </div>
                      </td>

                      {/* Compact Preview */}
                      <td className="px-4 py-3 hidden lg:table-cell w-[260px]">
                        <PreviewCard item={item} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 rounded-md transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="p-3 border-t border-gray-800 mt-auto flex items-center justify-between text-sm text-gray-400 bg-[#141a29]">
          <div className="text-xs font-medium text-gray-500">
            {filtered.length} total item{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* ── Edit / Create Modal ───────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2638] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gray-700/50 flex flex-col">

            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-700/50 shrink-0">
              <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
            </div>

            {/* Body */}
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto custom-scrollbar">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Name <span className="text-[#FF6B00] ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setForm({ ...formData, name: e.target.value })}
                  className="w-full bg-black/40 border border-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:border-[#FF6B00] focus:shadow-[0_0_15px_rgba(255,107,0,0.15)] font-medium transition-all"
                />
              </div>

              {/* Icon Key */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Icon <span className="text-[#FF6B00] ml-1">*</span>
                </label>
                <select
                  value={formData.icon_key}
                  onChange={(e) => setForm({ ...formData, icon_key: e.target.value })}
                  className="w-full bg-black/40 border border-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:border-[#FF6B00] focus:shadow-[0_0_15px_rgba(255,107,0,0.15)] font-medium transition-all cursor-pointer"
                >
                  {ICON_OPTIONS.map((k) => (
                    <option key={k} value={k} className="bg-[#1e2638]">{k}</option>
                  ))}
                </select>
              </div>

              {/* Path */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide">
                  Path <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="/plans"
                  value={formData.path}
                  onChange={(e) => setForm({ ...formData, path: e.target.value })}
                  className="w-full bg-black/40 border border-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:border-[#FF6B00] focus:shadow-[0_0_15px_rgba(255,107,0,0.15)] font-medium transition-all"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide">Sort Order</label>
                <input
                  type="number"
                  min={1}
                  max={editingItem ? items.length : items.length + 1}
                  value={formData.sort_order}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    const max = editingItem ? items.length : items.length + 1;
                    setForm({ ...formData, sort_order: Math.min(Math.max(val, 1), max) });
                  }}
                  className="w-full bg-black/40 border border-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:border-[#FF6B00] focus:shadow-[0_0_15px_rgba(255,107,0,0.15)] font-medium transition-all"
                />
                <p className="text-xs text-gray-500">
                  Valid range: 1 – {editingItem ? items.length : items.length + 1}
                </p>
              </div>

              {/* Toggles row */}
              <div className="md:col-span-2 flex flex-wrap gap-6 items-center pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.is_highlight}
                    onChange={(e) => setForm({ ...formData, is_highlight: e.target.checked })}
                    className="w-4 h-4 accent-[#FF6B00]"
                  />
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white">Highlight (orange border)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.is_logout}
                    onChange={(e) => setForm({ ...formData, is_logout: e.target.checked })}
                    className="w-4 h-4 accent-red-500"
                  />
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white">Logout trigger</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => setForm({ ...formData, status: e.target.checked })}
                    className="w-4 h-4 accent-[#22c55e]"
                  />
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white">Active (visible on Settings page)</span>
                </label>
              </div>

              {/* Live preview */}
              <div className="md:col-span-2 space-y-2 mt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Preview</p>
                <div className="bg-black/50 p-4 rounded-xl border border-white/5">
                  <PreviewCard item={formData} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-gray-700/50 flex justify-end items-center space-x-4 bg-[#141a29]/50 shrink-0">
              <button
                onClick={() => setModal(false)}
                className="px-5 py-2.5 rounded-lg bg-[#334155] text-white font-medium hover:bg-[#475569] transition-colors text-sm"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formData.name}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white font-bold hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] transition-all text-sm disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ──────────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#1e2638] border border-gray-700 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Delete Item</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              This will remove the item from the Settings page. This action cannot be undone.
            </p>
            <div className="flex gap-3">
               <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#334155] text-gray-300 font-bold hover:bg-[#475569] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors text-sm shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
