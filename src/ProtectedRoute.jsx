import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // 로컬 스토리지에 토큰이 있는지 확인
  const isAuth = localStorage.getItem('userToken');

  if (!isAuth) {
    // 토큰이 없으면 로그인 페이지로 강제 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return children;
}