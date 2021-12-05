# HarcMap

- [Installation](#installation)
   - [Requirements](#requirements)
   - [How to prepare Intellij IDE](#how-to-prepare-intellij-ide-webstorm--phpstorm-for-front-end-development)
- [Development](#development)
   - [Devel environment](#devel-environment)
   - [Production environment](#production-environment)
   - [Development kit](#development-kit)
      - [Auto login](#auto-login)
- [Local Database](#local-database)
   - [Database installation](#database-installation)
   - [Default data in local database](#default-data-in-local-database)
   - [Adding "RTL Gdynia" points to database](#adding-rtl-gdynia-points-to-database)
- [Swagger API documentation](#swagger-documentation)
- [Version release](#version-release)



## Installation

### Requirements
- node v10.15.3 or higher
- npm v6.13.7 or higher

### How to prepare Intellij IDE (Webstorm) for front-end development
1. You have to get into `Settings/Languages & Frameworks/JavaScript/Webpack` and set `client/webpack.common.js` as a config file.
2. Open `Project Files` click by right button on `.eslintrc` file and click `Apply ESLint Code Style Rules` option.
3. You have to get into `Settings/Editor/Code Style/HTML`, find `Do not indent children of` option and add `script` tag there.
4. Restart IDE



## Development

### Devel environment
1. Go to main dir with all dirs.
2. Install common packages: `npm i`
3. Go to one of projects:

#### Client
1. Go to client dir `cd client`
2. Install client packages: `npm i`
3. Run the front-end sass watcher: `npm run import:sass:watch`
4. Run the front-end builder: `npm run build:dev:watch`
5. Build client files destination is in `public/`
   
#### Server
1. Go to server dir `cd client`
2. Install server packages: `npm i`
3. Copy `server/.env.local` file to new file `server/.env`   
4. Run database and server(watch mode): `npm run server:start-with-mongo`
5. App is ready on http://localhost:3030/
6. Api documentation on http://localhost:3030/api-docs

### Production environment

#### Client
1. Go to client dir `cd client`
2. Install client packages: `npm i`
3. Run the front-end sass watcher: `npm run import:sass:watch`
4. Run the front-end builder: `npm run build:prod`
5. Build client files destination is in `public/`

#### Server
Production environment have own configuration on production server.
It only differs with env variables defined in `.env` file

### Development kit

#### Vue.js devtools
1. Remove or disable Vue.js devtools
2. Install beta version from: https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg
3. Close and reopen chrome devtools (press F12 twice).

#### Dev Tools
In development mode check window.devTools object to use some internal app tools for example:
- autoLogin - switching between account types
- httpService - ease http calls
- api - all endpoints defined in app

#### Auto login
Write below commands to browser console:
- `devTools.autoLogin.switch()` will log out current user and login on opposite `accountType`
- `devTools.autoLogin.common()` will log out current user and login to common user
- `devTools.autoLogin.admin()` will log out current user and login to admin user

#### Test on mobile devices from localhost on your computer
**Instruction:**
1. Run devel environment
2. Connect mobile device and computer to the same WI-FI network
3. Check computer IP in your WI-FI network
4. Put computer IP to phone browser address like here _https://192.168.1.10:3030/_
5. Use your project from localhost on mobile device!

## Local database

### Database installation
1. To run the local database be sure that you already installed [Docker](https://www.docker.com/products/docker-desktop)
2. Next step is running npm script: 
```
// Warning! It can be necessary to run this command with administrator permissions (sudo)
npm run run:mongodb
``` 

### Default data in local database
For default, the local database is filling example data to run all basic functionality.
It means one user(zhp@harcmap.henouser.pl), one event(ab12) with 3 categories and 4 points.


It doesn't contain any data about "RTL Gdynia" event or another. 
Default data are the smallest content to run basic functionality!

All initialized data are setting from `/config/mongodb/local.js` script!

### Adding "RTL Gdynia" points to database:
1. To add points, necessary categories and events you have to run local database first ([read more](#local-database))
2. When local DB completely load, run command `npm run fill-database`.
3. That's all!

`fill-database` script, add only example "RTL Gdynia" data to database!


## Version release
To do list:
- Update CHANGELOG.md
- Update version in `client/package.json` and `package.json`
- Merge to master
- Create version tag
- Release on server
