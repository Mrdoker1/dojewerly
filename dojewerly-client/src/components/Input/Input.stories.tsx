import Input from './Input';

export default {
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    type: { control: 'radio', options: ['Text', 'Password'] },
    hasError: { control: 'boolean' },
    message: { control: 'text' },
  },
 tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const DefaultInput = {
  args: {
    value: 'Input Value',
    label: 'Input Label',
    defaultValue: 'Default Value',
    placeholder: 'Placeholder',
    message: 'Explanation message',
    type: 'text',
    disabled: false,
    hasError: false,
  },
};