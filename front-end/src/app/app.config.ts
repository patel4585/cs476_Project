import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
=======
import { provideHttpClient } from '@angular/common/http';

>>>>>>> 0993b16d62bcd65379f077413689ed8859852759
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
