const Footer = () => {
  return (
    <footer className="bg-bg-dark text-gray-400 py-6 px-6 text-center text-sm border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-4">
        <a href="#" className="hover:text-white transition-colors text-brand">Terms and Privacy Notice</a>
        <a href="#" className="hover:text-white transition-colors text-brand">Send us feedback</a>
        <a href="#" className="hover:text-white transition-colors text-brand">Help</a>
      </div>
      <p>&copy; {new Date().getFullYear()}, OTT Clone, Inc. or its affiliates</p>
    </footer>
  );
};

export default Footer;
