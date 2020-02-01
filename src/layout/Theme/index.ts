import { AppTheme } from 'styled-components';

const theme: AppTheme = {
  navbarHeight: 60,
};

export type ThemeProps<T = {}> = { theme: AppTheme } & T;

export { theme };
