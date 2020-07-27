import React from 'react';
import { StoryFn } from '@storybook/addons';
import { Input, Button } from '@molecules';
import { Form, FormInstance } from 'blueprint-form';
import { Icon } from '@atoms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default {
  component: Input,
  title: 'Molecules/Input',
  decorators: [
    (storyFn: StoryFn): JSX.Element => {
      interface TimeData {
        name: string;
      }
      const form = new FormInstance<TimeData>({
        name: ''
      });
      return (
        <Form form={form} onSubmit={() => void(0)}>
          <div style={{ maxWidth: '500px', backgroundColor: '#DDD' }} className="pa-4">
            {storyFn() as JSX.Element}
          </div>
        </Form>
      );
    }
  ]
};

export const defaultView= (): JSX.Element => (
  <Input
    label="Name"
    name="name"
    placeholder="Enter your name here"
  />
);

export const required= (): JSX.Element => (
  <Input
    label="Password"
    type="password"
    name="name"
    required
  />
);

export const withRightButton= (): JSX.Element => (
  <Input
    name="search"
    placeholder="Search"
    rightElement={
      <Button bare minimal>
        <Icon icon={faSearch} />
      </Button>
    }
  />
);

export const withBgAndTextColor= (): JSX.Element => (
  <Input
    name="search"
    placeholder="Search"
    className="bg-grey-input text-white-input shadow-none-input"
    rightElement={
      <Button bare minimal>
        <Icon icon={faSearch} className="text-white" />
      </Button>
    }
  />
);
