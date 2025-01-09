export const sessionOptions = {
  password: process.env.NEXT_SESSION_SECRET as string, // Make sure to set SESSION_SECRET in your .env
  cookieName: 'my-app-session',
  cookieOptions: {
    secure: process.env.NEXT_NODE_ENV === 'production', // Ensure this is true in production for HTTPS
    httpOnly: true, // Ensure the cookie is not accessible by JavaScript on the client-side
    maxAge: 60 * 60, // Set the session duration (1 hour, adjust as needed)
  },
};
