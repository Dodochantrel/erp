import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideAnimations(),
    provideToastr({
      timeOut: 8000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
    }),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),
  ],
};
