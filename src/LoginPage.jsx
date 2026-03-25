import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('userToken', data.token); // 증표 저장
        navigate('/archive'); // 자료실로 이동
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ padding: '50px', textAlign: 'center' }}>
      <h2>자료실 접근 인증</h2>
      <p>등록된 이메일 주소를 입력해주세요.</p>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
          style={{ padding: '10px', width: '250px' }}
        />
        <button type="submit" disabled={loading} style={{ marginLeft: '10px', padding: '10px 20px' }}>
          {loading ? '확인 중...' : '입장하기'}
        </button>
      </form>
    </div>
  );
}