import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'; // 실제 자료실 페이지
import LoginPage from './LoginPage'; // 실제 자료실 페이지
import Archive from './Archive'; // 실제 자료실 페이지
import ProtectedRoute from './ProtectedRoute';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 누구나 볼 수 있는 일반 페이지 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          

          {/* 🔒 보호되는 페이지: ProtectedRoute로 감쌉니다. */}
          <Route 
            path="/archive" 
            element={
              <ProtectedRoute>
                <Archive />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
