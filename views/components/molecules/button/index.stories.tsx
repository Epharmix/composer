import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { 
  faBell,
  faQuestionCircle,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@atoms';
import { Button } from '@molecules';
import { StoryFn } from '@storybook/addons';

export default {
  component: Button,
  title: 'Molecules/Button',
};

export const primary = (): JSX.Element => (
  <Button
    intent="primary"
    onClick={action('button-click')}
  >
    <Icon className="mr-2" icon={faQuestionCircle} />
    <span className="font-bold">Click me!</span>
  </Button>
);

export const outlined = (): JSX.Element => (
  <Button outlined className="border-blue shadow-blue">
    <Icon className="mr-2 text-blue" icon={faBell} />
    <span className="font-bold text-blue">Alerts</span>
  </Button>
);

export const withLinkNoBorderRadius = (): JSX.Element => (
  <Button
    intent="danger"
    className="shadow-none rounded-none"
    linkTo="#"
  >
    I has link!
  </Button>
);

export const minimalUnderlinedText = (): JSX.Element => (
  <Button bare minimal>
    <Icon icon={faCheck} className="mr-2 text-sans-sm"/>
    <span className="text-sans-sm dotted">Resolve</span>
  </Button>
);

withLinkNoBorderRadius.story = {
  decorators: [(storyFn: StoryFn) => <BrowserRouter>{storyFn()}</BrowserRouter>],
};
