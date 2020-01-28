# OpenStad bundle

Deze module combineert de verschillende servers en modules uit het OpenStad Ecosystem, teneinde de installatie van het hele pakket iets eenvoudiger te maken.

## 1. Download en initieer de code

```
git clone git@github.com:Amsterdam/openstad-bundle.git
cd openstad-bundle
git submodule init
git submodule update
npm i
```

## 2. Setup requirements

Dit script zet de databases op, maar die moeten al wel (leeg) bestaan.

```
CREATE DATABASE `openstad-api`;
CREATE DATABASE `openstad-image`;
CREATE DATABASE `openstad-mijnopenstad`;
```

Install knex globally
```
npm install knex -g
```

## 4. Configuratie

Elk element heeft een eigen configuratie file. Deze files worden straks aangemaakt door de installatie scripts in deze bundle. Daarvoor hebben we natuurlijk wel alle gegevens nodig.

Maak een file `./.env` met minimaal de volgende inhoud:

```
BASE_DOMAIN=

DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_BASE_NAME=openstad

BASIC_AUTH_USER=
BASIC_AUTH_PASSWORD=

FROM_EMAIL_ADDRESS=
SMTP_PORT=
SMTP_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=
```

Als je ze niet definieert dan gebruikt dit de volgende defaults:

```
API_DB_NAME=DB_BASE_NAME-api
IMAGE_DB_NAME=DB_BASE_NAME-image
```

Meer opties vindt je in de [docs directory](doc/env.md).

## 5. Init alles

```
npm run init-all
```

Dit script checked zelf wat hij nog moet doen, dus je kunt het meerdere keren draaien. Bijvoorbeeld als er halverwege iets mis ging.




## En dan



#### API server
werkt nu

#### Image server
werkt nu

#### Start de servers

```
npm run startall
```

Dat start alle servers in een lokale omgeving. Een proxy die alles doorlust en je https offloading regelt valt buiten de scope van deze bundle.




## TODO

Alles, bovenstaande doet nog niets