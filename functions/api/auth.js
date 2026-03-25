export async function onRequestPost(context) {
  const { request, env } = context;
  const { email } = await request.json();

  // Cloudflare 대시보드 [Settings] -> [Functions] -> [Variables]에 등록한 값
  const rawEmails = env.ALLOWED_EMAILS || ""; 
  const allowedList = rawEmails.split(",").map(item => item.trim());

  if (allowedList.includes(email)) {
    return new Response(JSON.stringify({ 
      success: true, 
      token: "hj_auth_" + btoa(email) // 간단한 인증 토큰 생성
    }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ 
    success: false, 
    message: "등록되지 않은 사용자입니다." 
  }), { status: 401 });
}