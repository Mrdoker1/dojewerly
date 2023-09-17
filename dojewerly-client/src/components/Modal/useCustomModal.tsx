import { useModal } from './ModalProvider';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Auntefication/Auth';
import SignUpForm from '../Auntefication/Forms/SignUpForm/SignUpForm';

// Создаем пользовательский хук для открытия модального окна
export function useCustomModal() {
  const { openModalWithContent, closeModal } = useModal();
  const navigate = useNavigate();

  // Функция для открытия модального окна
  const openModal = (type: 'auth' | 'error') => {
    switch (type) {
      case 'auth':
        openModalWithContent(
          <AuthComponent
            heading="Create an Account"
            description="Create DoJewerly account to Save Your Favourites and Receive Bonuses!"
            mainForm={<SignUpForm />} 
            buttonText="ALREADY HAVE AN ACCOUNT?"
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              navigate("/signin")
            }}
          />
        );
        break;
      case 'error':
        // Открыть другое модальное окно с типом 'error', если это необходимо
        break;
      default:
        // Обработка других типов модальных окон
        break;
    }
  };

  return { openModal };
}
