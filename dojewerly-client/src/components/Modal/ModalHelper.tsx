import { useModal } from './ModalProvider';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Auntefication/Auth';
import SignUpForm from '../Auntefication/Forms/SignUpForm/SignUpForm';
import SignInForm from '../Auntefication/Forms/SignInForm/SignInForm';
import { useTranslation } from 'react-i18next';
import InfoModal from './Modals/InfoModal/InfoModal';
import doxBanner from '../../assets/images/banner-dox.jpg';

// Создаем пользовательский хук для открытия модального окна
export function useCustomModal() {
  const { openModalWithContent, closeModal } = useModal();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Функция для открытия модального окна
  const openModal = (type: 'signup' | 'signin' | 'dox') => {
    switch (type) {
      case 'signup':
        openModalWithContent(
          <AuthComponent
            heading={t('Create an Account')}
            description={t('Create DoJewerly account to Save Your Favourites and Receive Bonuses!')}
            mainForm={<SignUpForm />} 
            buttonText={t('ALREADY HAVE AN ACCOUNT?')}
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
            heading={t('Hello, Let\'s Sign In')}
            description={t('Please sign in to your DoJewerly Account.')}
            mainForm={<SignInForm />} 
            buttonText={t('CREATE NEW ACCOUNT')}
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              openModal('signup');
              //navigate("/signin")
            }}
          />
        );
        break;
      case 'dox':
        openModalWithContent(
          <InfoModal
            bannerImage={doxBanner}
            heading={t('DO X Jewelry')}
            subheading={t('COOMING SOON...')}
            description={t('This will be an exclusive section! Discover unique products and special offers not found in the main catalog. Stay tuned for updates!')}
            buttonText={t('GOT IT!')}
            buttonOnClick={() => {
              closeModal();
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
