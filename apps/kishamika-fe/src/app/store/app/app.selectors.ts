import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ThemeState } from './app.reducers';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectTheme = createSelector(
  selectThemeState,
  (state) => state.theme
);
