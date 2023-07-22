import Button from './Button';

export default {
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    text: { control: 'text' },
    size: { control: 'radio', options: ['default', 'large'] },
  },
  tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const SmallButton = {
  args: {
    text: 'Small Button',
    disabled: false,
    size: 'small',
  },
};

export const LargeButton = {
  args: {
    text: 'Large Button',
    disabled: false,
    size: 'large',
  },
};