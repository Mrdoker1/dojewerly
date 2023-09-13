import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import Button from '../../components/Button/Button';
import ProductImage from '../../components/Image/ProductImage/ProductImage';
import styles from './ProductPage.module.css';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProductById } from '../../app/reducers/productsSlice';

const ProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const product = useSelector((state: RootState) => state.products.products.find(p => p._id === id));
    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0); // сброс позиции скролла к верху страницы
      if (!product && id) {
        dispatch(fetchProductById(id));
      }
    }, [id, product, dispatch]);

    const handleBackClick = () => {
      navigate(-1);
    };

    if (!product) return <div>Loading...</div>;

    return (
      <div className={styles.container}>
        <div className={styles.productSection}>
          <div className={styles.productGallery}>
            {product.imageURLs.length > 0 ? product.imageURLs.map((imageUrl, index) => (
              <ProductImage key={index} imageUrl={imageUrl} alt={product.name} className={styles.image} />
            )) : (
              <icons.noImageL className={styles.image} />
            )}
          </div>
          <div className={styles.productDetailsWrapper}>
            <div className={styles.productDetails}>
              <div className={styles.productDetailsHeading}>
                <Button variant='text' iconLeft='arrowLeft' text="BACK" onClick={handleBackClick} className={styles.backButton}/>
                <h1 className={styles.productName}>{product.name}</h1>
              </div>
              <ul className={styles.productProperties}>
                <li>
                  <icons.arrowUp />
                  Material: {product.props.material}
                </li>
                <li>
                  <icons.arrowUp />
                  Gender: {product.props.gender}
                </li>
                <li>
                  <icons.arrowUp />
                  Type: {product.props.type}
                </li>
              </ul>
              <div className={styles.productDetailsDescription}>
                {product.props.description}
              </div>
              <hr className={styles.solid} />
              <div className={styles.productDetailsPriceWrapper}>
                <span className={styles.price}>${product.price}</span>
                <span className={styles.stock}>{product.stock} in stock</span>
              </div>
              <Button text="CONTACT SELLER" size='large' fullWidth />
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductPage;
