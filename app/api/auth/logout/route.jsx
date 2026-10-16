export async function POST(req) {
  return new Response('Logout successful', {
    status: 200,
    headers: {
      'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
    },
  });
}
