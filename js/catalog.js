/*! QNS catalog helper — loads content/catalog.json when needed */
(function (global) {
  var CACHE = null;
  function loadCatalog() {
    if (CACHE) return Promise.resolve(CACHE);
    return fetch('content/catalog.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('catalog.json HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) { CACHE = data; return data; });
  }
  global.QNSCatalog = {
    load: loadCatalog,
    bySection: function (section) {
      return loadCatalog().then(function (data) {
        var list = (data && data.articles) || [];
        return list.filter(function (a) { return a.section === section; });
      });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
