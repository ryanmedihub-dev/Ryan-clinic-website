const fs = require('fs');
const docs = JSON.parse(fs.readFileSync('scripts/surgeon-full-dump.json','utf8'));
docs.forEach(d => {
  const city = (d.general && d.general.city) || 'NULL';
  const status = (d.settings && d.settings.status) || 'N/A';
  const slug = d.slug || 'N/A';
  const id = (d._id && d._id.$oid) ? d._id.$oid : String(d._id);
  console.log(city + ' | ' + status + ' | ' + slug + ' | ' + id);
});
