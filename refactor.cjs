const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
            results.push(file);
        }
    });
    return results;
};

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix specific endpoints and names first
    content = content.replace(/\/api\/movies/g, '/api/audios');
    content = content.replace(/\/api\/categories/g, '/api/audio-categories');
    
    content = content.replace(/MovieRow/g, 'AudioRow');
    content = content.replace(/MovieCard/g, 'AudioCard');
    content = content.replace(/AdminMovies/g, 'AdminAudios');
    content = content.replace(/AdminMovieForm/g, 'AdminAudioForm');
    
    // Generic variables
    content = content.replace(/\bmovies\b/g, 'audios');
    content = content.replace(/\bMovies\b/g, 'Audios');
    content = content.replace(/\bmovie\b/g, 'audio');
    content = content.replace(/\bMovie\b/g, 'Audio');

    // Properties
    content = content.replace(/posterUrl/g, 'coverImage');
    content = content.replace(/backdropUrl/g, 'bannerImage');
    content = content.replace(/\.year/g, '.releaseYear');

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Refactoring complete!');
