/**
 * This is to generate startbucks.json, locations of all starbucks world wide
 */
const request = require('request');

const url = 'https://data.sfgov.org/api/views/rqzj-sfat/rows.json';

function createIndex(body) {
  request({
    method: 'POST',
    url: 'http://localhost:8983/solr/food-trucks/update/json/docs?commit=true',
    body,
    json: true,
  }, (err, res, result) => {
    if (err) throw err;
    if (res.statusCode !== 200) return process.stderr.write(JSON.stringify(result));

    return process.stdout.write(JSON.stringify(result));
  });
}

request({ url, json: true }, (err, res, body) => {
  if (err) throw err;
  if (res.statusCode !== 200) throw new Error('Failed to get Data');

  const { meta: { view: { columns } }, data } = body;

  const docs = [];
  data.forEach((row) => {
    const hash = {};
    row.forEach((cell, i) => {
      const key = columns[i].name.toLowerCase();
      hash[key] = (key === 'fooditems')
        ? (cell || '').split(':').map(t => t.trim())
        : cell;
    });

    hash.latlng = `${hash.latitude},${hash.longitude}`;
    docs.push(hash);
  });

  createIndex(docs);
});
