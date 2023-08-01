import ErrorMessage from './ErrorMessage';

export default {
  component: ErrorMessage,
  argTypes: {
    message: { control: 'text' },
  },
 tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const DefaultErrorMessage = {
  args: {
    message: 'Explanation message',
  },
};