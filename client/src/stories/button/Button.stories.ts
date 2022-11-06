import MyButton from './Button.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  label: string;
}

export default {
  title: 'Atoms/Button',
  component: MyButton,
  argTypes: {
    variant: ['primary', 'secondary'],
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => ({
  components: { MyButton },
  setup () {
    return { args };
  },
  template: '<my-button v-bind="args"/>',
});

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  variant: 'primary',
  label: 'Submit',
};

Secondary.args = {
  label: 'Cancel',
  variant: 'secondary',
};
