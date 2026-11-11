// First-touch attribution. Remembers where a visitor came from (UTM tags, ad click IDs,
// referrer, landing page) so every form can send it to GHL with the lead.
(function () {
  var KEY = 'tsl_attribution';
  var FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; }
  }

  var stored = read();
  var params = new URLSearchParams(window.location.search);
  var hasTags = FIELDS.some(function (f) { return params.get(f); });

  // Keep the first visit, unless this visit arrived with campaign tags of its own.
  if (!stored || hasTags) {
    var data = {
      referrer: document.referrer || '',
      landingPage: window.location.href,
      firstSeenAt: new Date().toISOString()
    };
    FIELDS.forEach(function (f) { data[f] = params.get(f) || ''; });
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    stored = data;
  }

  window.tslAttribution = function () { return read() || stored || {}; };
})();
