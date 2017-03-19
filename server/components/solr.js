import solrClient from 'solr-client';
import bluebird from 'bluebird';

const solr = solrClient.createClient('localhost', 8983, 'food-trucks', '/solr');
bluebird.promisifyAll(Object.getPrototypeOf(solr)); // promisify callbacks

export default solr;
