import { createMuiTheme } from '@material-ui/core';

export const commonTheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiChip: {
      // Name of the rule
      root: {
        // Some CSS
        width: '1.2em',
        height: '1.2em',
      },
    },
  },
});
