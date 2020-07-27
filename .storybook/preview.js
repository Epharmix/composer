import '../views/index.scss';

import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { setConfiguration } from 'react-grid-system';

// Add a11y for all stories
addDecorator(withA11y);

// Default grid configuration for the App Shell
setConfiguration({
  gutterWidth: 26,
  gridColumns: 24,
});
