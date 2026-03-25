import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactTest from './ContactTest'
import Archive from './pages/Archive'; // 실제 자료실 페이지
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>사이트 준비 중입니다.</h1>
        </div>
      </section>

      <ContactTest />

      <BrowserRouter>
        <Routes>
          {/* 누구나 볼 수 있는 일반 페이지 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

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
