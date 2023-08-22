import icons from '../../assets/icons/icons';
import Dropdown from './Dropdown';

export default {
  component: Dropdown,
  argTypes: {
    onChange: { action: 'changed' },
    label: { control: 'text' },
    hasError: { control: 'boolean' },
    message: { control: 'text' },
    iconRight: { control: 'select', options: [''].concat(Object.keys(icons)) },
  },
  tags: ['autodocs'],
};

export const DefaultDropdown = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    label: 'Dropdown Label',
    message: 'Explanation message',
    hasError: false,
  },
};