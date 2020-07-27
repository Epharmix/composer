import React from 'react';
import { Text } from '@atoms';

export default {
  component: Text,
  title: 'Atoms/Text',
};

export const defaultView = (): JSX.Element => <Text>Hello!</Text>;
export const asH1 = (): JSX.Element => <Text as="h1">Hello!</Text>;
export const asH1Serif = (): JSX.Element => <Text as="h1" serif>Hello!</Text>;
export const bold = (): JSX.Element => <Text bold>Hello!</Text>;
export const underline = (): JSX.Element => <Text underline>Hello!</Text>;
export const uppercase = (): JSX.Element => <Text uppercase>Hello!</Text>;
export const boldDotted = (): JSX.Element => <Text bold dotted>Hello!</Text>;
export const brandColor = (): JSX.Element => <Text bold color="brand">Hello!</Text>;
