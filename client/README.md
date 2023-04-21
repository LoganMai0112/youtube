## Tech

MyTube uses a number of open source projects to work properly:

- [Reactjs] - HTML Enhanced for web apps!
- [Tailwindcss] - great UI boilerplate for modern web apps
- [Eslint] - code styling
- [Husky] - improve commit for client code
- [ion-sdk-js] - library for webRTC

## Installation

MyTube require [Nodejs](https://nodejs.org/en) v14+ to run.

Install the dependencies and devDependencies and start the server

```sh
cd youtube/client
npm i --legacy-peer-deps
```
### Install streaming server

[Ion-sfu](https://github.com/ionorg/ion-sfu): I use this library to connect peer to peer user through webRTC 

## Development
```sh
npm start
```

Verify the development by navigating to your server localhost address:
```sh
localhost:3000
```
