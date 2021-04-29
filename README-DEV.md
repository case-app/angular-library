<p align="center">Abacus Nest Library</p>
 
## Description

Abacus Nest Library


## Installation

```bash
$ npm i
```

## Develop

### Build library

```bash
$ npm run build
```

or to watch file changes :
```bash
$ npm run build:watch
```

### Create a NPM Link to work live

After building library :
```bash
$ cd dist/abacus-angular-library
$ npm link // May require sudo.
```
Then go to your `@case-app/case` project it the `/client` folder (Angular project) :

```bash
$ npm link @case-app/angular-library
```

## Publish to NPM

First ensure that you update the version number in `/projects/abacus-angular-library/package.json` and then run :

```bash
npm run publish
```

Of course you nee to be connected to [npmjs](https://www.npmjs.com/) with an account with permissions on that repo.
