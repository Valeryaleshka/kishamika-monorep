import { Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { UserResolver } from './shared/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    resolve: {
      userData: UserResolver,
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'images',
        loadComponent: () =>
          import('./pages/images/images.component').then((m) => m.ImagesComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login-page/login-page.component').then((m) => m.LoginPageComponent),
      },
      {
        path: 'register',
        data: { register: true },
        loadComponent: () =>
          import('./pages/login/login-page/login-page.component').then((m) => m.LoginPageComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
