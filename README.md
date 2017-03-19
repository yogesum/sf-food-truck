# San Francisco - Food Trucks

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^6.2.2, npm ^3.9.5
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [Solr](http://lucene.apache.org/solr/) (`bash solr-install.sh`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `npm run build` or `gulp build` for building and `gulp serve` for preview.

## Solr Installation & Indexing

### Solr Binary Installation

- JAVA Runtime require for solr
- run below commands to install solr (or execute `bash solr-install.sh`)

```sh
SOLR_VER="6.4.2"
SOLR_URL="http://redrockdigimark.com/apachemirror/lucene/solr/${SOLR_VER}/solr-${SOLR_VER}.tgz"

# Get SOLR binary
wget ${SOLR_URL}

# extract installer script
tar xzf solr-${SOLR_VER}.tgz solr-${SOLR_VER}/bin/install_solr_service.sh --strip-components=2

# install solr with data directory in ~/solr
sudo bash install_solr_service.sh solr-${SOLR_VER}.tgz -u `whoami` -d ~/solr
```

### Solr Indexing

```sh
# make sure to create symbolic link
# to this project's solr conf from solr install directory
ln -s ~/sf-food-trucks/solr-conf ~/solr/data/food-trucks
```

- run `npm install` inside node project
- run `npm run solr-index` to index data from [DataSF](http://www.datasf.org/): [Food
Trucks](https://data.sfgov.org/Permitting/Mobile-Food-Facility-Permit/rqzj-sfat)
- run `npm start` or `npm run serve` to launch website in your default browser
