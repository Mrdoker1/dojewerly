import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../../app/store';

const AdminProtectedRoute = memo(() => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    if (user) {
      setIsLoading(false); // Убираем индикатор загрузки, когда пользователь загружен
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Отображаем индикатор загрузки, пока пользователь не загружен
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return <Outlet />;
});

export default AdminProtectedRoute;