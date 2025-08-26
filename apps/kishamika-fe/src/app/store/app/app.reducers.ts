import { createReducer, on } from '@ngrx/store';
import { setTheme, toggleTheme } from './app.actions';

export interface ThemeState {
  theme: 'light' | 'dark';
}

export const initialState: ThemeState = {
  theme: 'dark',
};

export const appReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }) => ({ ...state, theme })),
  on(toggleTheme, (state) => ({
    ...state,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
);
