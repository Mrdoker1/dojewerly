import ErrorMessage from './ErrorMessage';
import icons from '../../../assets/icons/icons';

export default {
  component: ErrorMessage,
  argTypes: {
    message: { control: 'text' },
    iconRight: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
    timeout: { control: 'number' },
    iconRightClick: { action: 'Icon clicked' },
  },
  tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const DefaultErrorMessage = {
  args: {
    message: 'Error message',
    iconRight: 'close',
    timeout: 0,
  },
};