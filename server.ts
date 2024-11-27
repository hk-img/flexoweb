import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import { join } from 'path';
import 'reflect-metadata';

import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { existsSync } from 'fs';
import { AppServerModule } from './src/main.server';

import 'localstorage-polyfill';
import { environment } from 'src/environments/environment';
const fs = require('fs');
const path = require('path');
const googleMapsClient = require('@google/maps').createClient({
  key: environment.mapKey,
});

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  enableProdMode();
  const server = express();
  const distFolder = join(__dirname, process.env.DIST_FOLDER || '../browser');

  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';
  const limiter = rateLimit({
    windowMs: 10000,
    max: 200,
    message: `Too many requests from this IP, please try again`,
  });
  server.use(limiter);

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res, next) => {
    try {
      res.render(indexHtml, {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
    } catch (error) {
      console.error('Error rendering page:', error);
      res.status(500).send('An error occurred while rendering the page.');
    }
  });


  return server;
}

function run() {
  const port =  4400;

  // Start up the Node server

  try {
    const domino = require('domino');
    const templateA = fs.readFileSync(path.join('dist/flexo-aggregation-website/browser', 'index.html')).toString();
    const win = domino.createWindow(templateA);
    global['window'] = win;
    global['document'] = win.document;
    global['navigator'] = win.navigator;
    global['google'] = googleMapsClient;
    global['localStorage'] = localStorage;
  } catch (error) {
    console.error('Error initializing globals:', error);
  }

  // global['Geocoder'] = googleMapsClient;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

