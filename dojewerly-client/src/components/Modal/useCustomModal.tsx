import { useModal } from './ModalProvider';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Auntefication/Auth';
import SignUpForm from '../Auntefication/Forms/SignUpForm/SignUpForm';
import SignInForm from '../Auntefication/Forms/SignInForm/SignInForm';

// Создаем пользовательский хук для открытия модального окна
export function useCustomModal() {
  const { openModalWithContent, closeModal } = useModal();
  const navigate = useNavigate();

  // Функция для открытия модального окна
  const openModal = (type: 'signup' | 'signin') => {
    switch (type) {
      case 'signup':
        openModalWithContent(
          <AuthComponent
            heading="Create an Account"
            description="Create DoJewerly account to Save Your Favourites and Receive Bonuses!"
            mainForm={<SignUpForm />} 
            buttonText="ALREADY HAVE AN ACCOUNT?"
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              openModal('signin');
              //navigate("/signin")
            }}
          />
        );
        break;
      case 'signin':
        openModalWithContent(
          <AuthComponent
            heading="Hello, Let's Sign In"
            description="Please sign in to your DoJewerly Account."
            mainForm={<SignInForm />} 
            buttonText="CREATE NEW ACCOUNT"
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              openModal('signup');
              //navigate("/signin")
            }}
          />
        );
        break;
      default:
        // Обработка других типов модальных окон
        break;
    }
  };

  return { openModal };
}
