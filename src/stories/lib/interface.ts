import { ReactNode } from 'react';
import { DecoratorFunction } from '@storybook/addons';

export type CSFStory = {
  title: string;
  decorators: DecoratorFunction<ReactNode>[];
  parameters?: { [name: string]: unknown };
};
