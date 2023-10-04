import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputWithLanguage from '../../components/Input/InputWithLanguage/InputWithLanguage';

const NoPage = memo(() => {
  const navigate = useNavigate();

  return (
    <main className="main page-404 animated-background animated-background--topRight">
      <div className="container page-wrapper">
        <h1 className=''>{('Sorry! Page not found')}</h1>
        <p className=''>
          {('Head homepage or use the search to find what you`re looking for')}
        </p>
        <Button 
          onClick={() => { navigate('/');}}
          text = 'Back to Main'
        >
        </Button >
      </div>
    </main>
  );
});

export default NoPage;
