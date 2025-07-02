import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// export { renderModule } from '@angular/platform-server';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { AppServerModule } from './app/app.server.module';

