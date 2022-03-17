<p align="center">CASE Angular Library</p>
 
## Description

CASE Angular Library

## Installation

```bash
$ npm i --force
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

### Development Workflow : CASE Angular Library showcase app

The showcase app in this repository "case-angular-library-showcase" is an example application that consumes the CASE Angular Library. The recommend way to develop is to work on this app calling elements directly from the library. You can serve the showcase app by doing so

```bash
ng serve
```

At the same time, _you should open a CASE server instance_ at the same time. The best way is to open the [CASE](https://github.com/case-app/case) repository and launch the following task

```bash
npm run start:server
```

To test it before publishing, it is recommended to test it on a local CASE app install with a NPM Link to the library as explained below.

### Create a NPM Link to test on local CASE app

After building library :

```bash
$ cd dist/case-angular-library
$ npm link // May require sudo.
```

Then go to your `@case-app/case` project it the `/client` folder (Angular project) :

```bash
$ npm link @case-app/angular-library
```

## Publish to NPM

First ensure that you update the version number in `/projects/case-angular-library/package.json` and then run :

```bash
npm run publish
```

Of course you need to be connected to [npmjs](https://www.npmjs.com/) with an account with permissions on that repo.
