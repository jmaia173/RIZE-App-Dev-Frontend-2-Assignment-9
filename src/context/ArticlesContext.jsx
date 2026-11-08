import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  // Shape: { username: [article, article, ...] }
  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
  const stored = localStorage.getItem('savedArticlesByUser');
  return stored ? JSON.parse(stored) : {};
});

useEffect(() => {
  localStorage.setItem('savedArticlesByUser', JSON.stringify(savedArticlesByUser));
}, [savedArticlesByUser]);

  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticlesByUser[user.username] || [];
  };

  const saveArticle = (article) => {
    if (!user) return;
    setSavedArticlesByUser((prev) => {
      const current = prev[user.username] || [];
      if (current.some((a) => a.url === article.url)) {
        return prev;
      }
      return { ...prev, [user.username]: [...current, article] };
    });
  };

  const removeArticle = (url) => {
    if (!user) return;
    setSavedArticlesByUser((prev) => ({
      ...prev,
      [user.username]: (prev[user.username] || []).filter((a) => a.url !== url),
    }));
  };

  const isArticleSaved = (url) => {
    return getUserSavedArticles().some((a) => a.url === url);
  };

  // For the admin page (Step 7)
  const getAllUserArticles = () => savedArticlesByUser;

  return (
    <ArticlesContext.Provider
      value={{
        getUserSavedArticles,
        getAllUserArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};