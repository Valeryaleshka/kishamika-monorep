import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAntIcons } from '@ant-design/icons-angular';
import { AccountBookFill } from '@ant-design/icons-angular/icons';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducer } from './store/app/app.reducers';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideStore(),
    provideState({ name: 'theme', reducer: appReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !environment.production
    }),
    provideAntIcons([AccountBookFill]),
    provideRouter(routes),
  ],
};
