const BASE_SOCKET_URL = process.env.NEXT_PUBLIC_API_URL
export const SOCKET_URL = `${BASE_SOCKET_URL}/ws`

console.log(SOCKET_URL)