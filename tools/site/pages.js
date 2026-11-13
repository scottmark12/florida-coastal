// The redesign pages the build owns. Everything else in the repo (the current live site,
// articles, area pages, about/scoring/terms) is left exactly as it is.
module.exports = {
  PAGES: {
    'index.html': 'home',
    'map.html': 'map',
    'find-your-mile.html': 'quiz',
    'quiz-results.html': 'results',
    'compare.html': 'compare',
    'towns/index.html': 'beach-towns',
  },
  isTownPage: f => /-v3\.html$/.test(f),
};
