<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

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
Then go to your project that has `abacus-angular-library` as dependency and it the root folder (of the Angular project) :

```bash
$ npm link abacus-angular-library
```

## Publish to NPM

First ensure that you update the version number in `/projects/abacus-angular-library/package.json` and then run :

```bash
npm run publish
```

Of course you nee to be connected to [npmjs](https://www.npmjs.com/) with an account with permissions on that repo.
