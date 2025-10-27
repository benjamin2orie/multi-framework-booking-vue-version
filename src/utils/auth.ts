
export const SESSION_KEY = import.meta.env.VITE_SESSION_KEY as string;
console.log(SESSION_KEY)
export const USER_KEY = import.meta.env.VITE_USER_KEY as string;
console.log(USER_KEY)

export const login = (token: string, user: { email: string }) => {
  localStorage.setItem(SESSION_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => !!localStorage.getItem(SESSION_KEY);

export const getUser = (): { email: string } | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
