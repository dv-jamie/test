export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  // 프론트엔드에서 넘어올 데이터 (5종 세트)
  const { company, name, phone, email, message } = body;

  // 제목: [문의] 회사명(담당자) 문의내용첫줄
  const shortMsg = message.length > 15 ? message.substring(0, 15) + "..." : message;
  const subject = `[문의] ${company}(${name}) - ${shortMsg}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev", // 나중에 도메인 인증 후 수정 가능
      to: "sjm2506@gmail.com",     // <--- 실제 문의를 받을 메일 주소로 바꾸세요!
      subject: subject,
      reply_to: email, // 담당자가 메일함에서 바로 [답장] 누르면 문의자에게 가도록 설정
      html: `
        <h3>홈페이지 신규 문의 접수</h3>
        <p><strong>회사명:</strong> ${company}</p>
        <p><strong>담당자:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>내용:</strong></p>
        <div style="background:#f9f9f9; padding:15px; border-radius:8px; border:1px solid #ddd;">
          ${message.replace(/\n/g, '<br />')}
        </div>
      `,
    }),
  });

  return new Response(JSON.stringify({ success: res.ok }), {
    status: res.ok ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}