import { useModal } from './ModalProvider';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../Auntefication/Forms/SignInForm/SignInForm';
import AuthComponent from '../Auntefication/Auth';
import banner from '../../assets/images/banner-1.jpg';

// Создаем пользовательский хук для открытия модального окна
export function useCustomModal() {
  const { openModalWithContent } = useModal();
  const navigate = useNavigate();

  // Функция для открытия модального окна
  const openModal = (type: 'auth' | 'error') => {
    switch (type) {
      case 'auth':
        openModalWithContent(
          <AuthComponent
            bannerImage={banner}
            heading="Hello, Let's Sign In"
            description="Please sign in to continue."
            mainForm={<SignInForm />}
            buttonText="CREATE NEW ACCOUNT"
            buttonIcon="arrowRight"
            buttonOnClick={() => navigate("/signup")}
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
