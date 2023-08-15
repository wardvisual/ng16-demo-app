import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { config } from 'dotenv';

import { AppModule } from './app/app.module';

config();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
