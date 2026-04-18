// search-places.js
// PresetSearch: small, fast local search for preset NCR places.
// Contains ~50 useful Delhi-NCR locations used by the autocomplete.
// Exposes PresetSearch.init(), PresetSearch.search(query), PresetSearch.bestMatch(q)

var PresetSearch = (function(){
  const places = [
    { name: "Sector 62 Noida", lat:28.6315, lng:77.3688, desc:"Noida" },
    { name: "Sector 18 Noida", lat:28.5672, lng:77.3266, desc:"Noida DND" },
    { name: "Noida City Centre", lat:28.5705, lng:77.3240 },
    { name: "Akshardham Delhi", lat:28.6187, lng:77.2773 },
    { name: "Mayur Vihar Phase 1", lat:28.5961, lng:77.3024 },
    { name: "Yamuna Bank", lat:28.5920, lng:77.2871 },
    { name: "Connaught Place", lat:28.6319, lng:77.2167 },
    { name: "India Gate", lat:28.6129, lng:77.2295 },
    { name: "Lajpat Nagar", lat:28.5716, lng:77.2440 },
    { name: "Lotus Temple", lat:28.5535, lng:77.2588 },
    { name: "Hauz Khas", lat:28.5488, lng:77.2000 },
    { name: "Ghaziabad Railway Station", lat:28.6663, lng:77.4325 },
    { name: "Vaishali Metro", lat:28.6418, lng:77.3319 },
    { name: "Kaushambi", lat:28.6285, lng:77.3628 },
    { name: "Indirapuram", lat:28.6229, lng:77.3783 },
    { name: "Raj Nagar Extension", lat:28.7027, lng:77.4475 },
    { name: "Hazrat Nizamuddin", lat:28.5673, lng:77.2506 },
    { name: "Akshardham Flyover", lat:28.6198, lng:77.2764 },
    { name: "GT Road", lat:28.7200, lng:77.0800 },
    { name: "Anand Vihar", lat:28.6517, lng:77.3155 },
    { name: "Rohini", lat:28.7210, lng:77.1111 },
    { name: "Dwarka", lat:28.5950, lng:77.0170 },
    { name: "Saket", lat:28.5245, lng:77.2120 },
    { name: "Lajpat Nagar", lat:28.5712, lng:77.2476 },
    { name: "Janakpuri", lat:28.6244, lng:77.0643 },
    { name: "New Delhi Railway", lat:28.6383, lng:77.2195 },
    { name: "Karol Bagh", lat:28.6528, lng:77.1855 },
    { name: "Kalkaji", lat:28.5550, lng:77.2581 },
    { name: "Noida Sector 62 Bus Stand", lat:28.6320, lng:77.3695 },
    { name: "Sector 15 Noida", lat:28.5743, lng:77.3196 },
    { name: "Sec 128 Noida", lat:28.5547, lng:77.3534 },
    { name: "Faridabad", lat:28.4089, lng:77.3178 },
    { name: "Gurugram", lat:28.4595, lng:77.0266 },
    { name: "NH-24 Ghaziabad Crossing", lat:28.6851, lng:77.4411 },
    { name: "Sarita Vihar", lat:28.5290, lng:77.2958 },
    { name: "Mayur Vihar Extension", lat:28.6020, lng:77.3100 },
    { name: "Saket Metro", lat:28.5320, lng:77.2049 },
    { name: "AIIMS", lat:28.5670, lng:77.2100 },
    { name: "GTB Nagar", lat:28.6665, lng:77.2189 },
    { name: "Paket", lat:28.5242, lng:77.2133 },
    { name: "Pragati Maidan", lat:28.6311, lng:77.2435 },
    { name: "Rajiv Chowk", lat:28.6319, lng:77.2167 },
    { name: "Bhikaji Cama Place", lat:28.5671, lng:77.1601 },
    { name: "Okhla", lat:28.5394, lng:77.2703 },
    { name: "Okhla Phase 2", lat:28.5535, lng:77.2692 }
  ];

  let idx = [];
  function init(){
    // build a tiny lowercase index for fast substring matching
    idx = places.map(p => ({ name: p.name.toLowerCase(), full: p }));
  }

  function search(q){
    if(!q) return places.slice(0,10);
    q = q.toLowerCase();
    const out = idx.filter(i => i.name.includes(q)).map(i=>i.full);
    // if no substring matches, return fuzzy startsWith
    if(out.length===0){
      const pre = idx.filter(i => i.name.split(' ').some(part => part.startsWith(q))).map(i=>i.full);
      return pre.length ? pre.slice(0,10) : places.slice(0,10);
    }
    return out.slice(0,12);
  }

  function bestMatch(q){
    q = (q||'').toLowerCase();
    let best = places.find(p => p.name.toLowerCase()===q);
    if(best) return best;
    // fallback: first that includes
    best = places.find(p => p.name.toLowerCase().includes(q));
    return best || places[0];
  }

  return { init, search, bestMatch, data:places };
})();