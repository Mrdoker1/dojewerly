import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById, Article } from '../../app/reducers/articlesSlice'; // обновите путь
import styles from './ArticlePage.module.css';
import { AppDispatch, RootState } from '../../app/store';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Получаем текущую статью и статус загрузки из состояния
  const article = useSelector((state: RootState) => state.articles.currentArticle);
  const status = useSelector((state: RootState) => state.articles.status);

  useEffect(() => {
    // Проверяем, что articleId существует, прежде чем диспетчеризовать action
    if (status === 'idle' && id) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id, status]);

  // Пока статья загружается, можно отображать индикатор загрузки
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Если произошла ошибка, можно отобразить сообщение об ошибке
  if (status === 'failed') {
    return <div>Error loading the article.</div>;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {/* Содержимое для сайдбара (например, реклама) */}
        <p>Рекламный или другой блок</p>
      </aside>
      <main className={styles.mainContent}>
        {article && (
          <>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            {/* Другие элементы статьи, например, изображения, видео и т.д. */}
          </>
        )}
      </main>
    </div>
  );
};

export default ArticlePage;

