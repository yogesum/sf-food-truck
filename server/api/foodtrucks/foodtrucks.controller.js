import solr from '../../components/solr';

export function index(req, res) {
  const start = Number(req.query.start) || 0;
  const rows = Number(req.query.rows);
  const fl = (req.query.fl || '*');

  const { q = '*', latlng } = req.query;
  const query = solr.createQuery()
    .q(q || '*:*')
    .fl(`${fl},distance:geodist(),score`)
    .start(start)
    .rows(Math.min(rows, 30) || 30)
    .sort({ score: 'desc' });

  if (latlng) {
    // boost results based on distance
    query
      .edismax()
      .set('boost=recip(geodist(),2,200,20)')
      .set('sfield=latlng')
      .set(`pt=${latlng}`);
  }

  solr.getAsync('select', query)
  .then(({
    response: {
      docs: data,
      numFound,
    },
  }) => res.json({ data, numFound }))
  .catch(err => res.status(500).json(err));
}

export default {
  index,
};
