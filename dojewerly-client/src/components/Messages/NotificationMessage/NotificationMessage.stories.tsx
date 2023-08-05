import NotificationMessage from '../NotificationMessage/NotificationMessage';
import icons from '../../../assets/icons/icons';

export default {
  component: NotificationMessage,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['error', 'sucess'],
      },
    },
    message: { control: 'text' },
    iconRight: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
    timeout: { control: 'number' },
    iconRightClick: { action: 'Icon clicked' },
    absolute: { control: 'boolean' }
  },
  tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const DefaultSucessMessage = {
  args: {
    message: 'Error message',
    iconRight: 'close',
    timeout: 0,
  },
};