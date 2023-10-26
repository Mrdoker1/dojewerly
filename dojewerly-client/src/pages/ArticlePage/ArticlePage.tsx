import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../app/reducers/articlesSlice'; // обновите путь
import styles from './ArticlePage.module.css';
import { AppDispatch, RootState } from '../../app/store';
import ReactMarkdown from 'react-markdown';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Получаем текущую статью и статус загрузки из состояния
  const article = useSelector((state: RootState) => state.articles.currentArticle);
  const status = useSelector((state: RootState) => state.articles.status);

  const { t } = useTranslation();

  useEffect(() => {
    // Проверяем, что articleId существует, прежде чем диспетчеризовать action
    if (status === 'idle' && id) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id, status]);

  // Пока статья загружается, можно отображать индикатор загрузки
  if (status === 'loading') {
    return <Loader text={t('Loading')}/>;
  }

  // Если произошла ошибка, можно отобразить сообщение об ошибке
  if (status === 'failed') {
    return <div>Error loading the article.</div>;
  }

  // Формирование текста для последней хлебной крошки
  let breadcrumbEndText = '';
  if (article) {
    const words = article.title.split(' '); // Разделяем заголовок на слова
    breadcrumbEndText = words.slice(0, 2).join(' ') + '...'; // Берем первые два слова и добавляем многоточие
  }

  return (
  <>
    <div className={styles.breadcrumbs}>
      <Breadcrumbs lastLink={breadcrumbEndText}/> {/* Передаем сформированный текст */}
    </div>
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {/* Содержимое для сайдбара (например, реклама) */}
        <p>Рекламный или другой блок</p>
      </aside>
      <main className={styles.mainContent}>
        {article && (
          <>
            <h1>{article.title}</h1>
            <ReactMarkdown>{article.content}</ReactMarkdown>
            {/* Другие элементы статьи, например, изображения, видео и т.д. */}
          </>
        )}
      </main>
    </div>
  </>
  );
};

export default ArticlePage;