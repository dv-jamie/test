import { useState } from 'react';

export default function ContactTest() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('전송 중...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('메일이 성공적으로 발송되었습니다!');
        setFormData({ company: '', name: '', phone: '', email: '', message: '' });
        setStatus('발송 완료');
      } else {
        throw new Error('발송 실패');
      }
    } catch (error) {
      alert('에러가 발생했습니다. 환경변수나 코드를 확인해주세요.');
      setStatus('에러 발생');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">문의하기 테스트</h2>
      <h3>function 경로 수정</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text" placeholder="회사명" required
          className="w-full p-2 border rounded"
          value={formData.company}
          onChange={e => setFormData({...formData, company: e.target.value})}
        />
        <input
          type="text" placeholder="담당자명" required
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="tel" placeholder="연락처 (예: 010-0000-0000)" required
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
        />
        <input
          type="email" placeholder="이메일" required
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <textarea
          placeholder="문의 내용" required rows="4"
          className="w-full p-2 border rounded"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          문의 보내기
        </button>
      </form>
      
      {status && <p className="mt-4 text-center text-sm text-gray-500">{status}</p>}
    </div>
  );
}