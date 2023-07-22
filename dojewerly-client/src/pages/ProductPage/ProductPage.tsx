import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
const ProductPage = memo(() => {
 
  const location = useLocation();
  const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  return (
    <>
      <main className="">
        <div>ProductPage {path}</div>
      </main>
    </>
  );
});

export default ProductPage;