SOLR_VER="6.4.2"
SOLR_URL="http://redrockdigimark.com/apachemirror/lucene/solr/${SOLR_VER}/solr-${SOLR_VER}.tgz"

# Get SOLR binary
wget ${SOLR_URL}

# extract installer script
tar xzf solr-${SOLR_VER}.tgz solr-${SOLR_VER}/bin/install_solr_service.sh --strip-components=2

# install solr with data directory in ~/solr
sudo bash install_solr_service.sh solr-${SOLR_VER}.tgz -u `whoami` -d ~/solr
