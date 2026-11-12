// The redesign pages the build owns. Everything else in the repo (the current live site,
// articles, area pages, about/scoring/terms) is left exactly as it is.
module.exports = {
  PAGES: {
    'home-v2.html': 'home',
    'vibe-v3.html': 'map',
    'quiz-photo.html': 'quiz',
    'quiz-results-v3.html': 'results',
    'compare-v3.html': 'compare',
    'towns/index-v2.html': 'beach-towns',
  },
  isTownPage: f => /-v3\.html$/.test(f),
};
