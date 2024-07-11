import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UtilityService } from './shared/service/utility-service.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { apiInterceptor } from './shared/interceptor/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withInterceptors([apiInterceptor])),
  provideRouter(routes, withComponentInputBinding()),
  provideAnimationsAsync(),
  UtilityService, {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: { panelClass: ["success-snackbar", "error-snackbar"] }
  }
  ]



};
