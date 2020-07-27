import React from 'react';
import { StoryFn } from '@storybook/addons';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Card, {
  CardFrame,
  CardBlock,
  CardTitle,
  CardBreakout
} from '.';

export default {
  component: Card,
  title: 'Molecules/Card',
  decorators: [
    (storyFn: StoryFn): JSX.Element => (
      <div className="ma-4">
        {storyFn()}
      </div>
    )
  , withKnobs]
};

export const defaultView = (): JSX.Element => (
  <Card
    faded={boolean('faded', false)}
  >
    Hello World!
  </Card>
);

export const frameView = (): JSX.Element => (
  <CardFrame>
    <CardTitle>
      <h1>Card Title (H1)</h1>
    </CardTitle>
    <CardTitle>
      <h2>Card Title (H2)</h2>
    </CardTitle>
    <CardTitle>
      <h3>Card Title (H3)</h3>
    </CardTitle>
    <CardTitle>
      <h4>Card Title (H4)</h4>
    </CardTitle>
    <CardBlock>
      This is a block!
    </CardBlock>
    <CardBreakout>
      This is a breakout block!
    </CardBreakout>
    <CardBlock>
      This is another block!
    </CardBlock>
    <CardBreakout right>
      This is a breakout block with arrow on the right!
    </CardBreakout>
    <CardBlock>
      This is yet another block!
    </CardBlock>
  </CardFrame>
);

