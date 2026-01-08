// Safe decoding of JWT payload
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return false;

  // Check if expired (exp is in seconds)
  if (Date.now() >= decoded.exp * 1000) {
    logout(); // Auto cleanup
    return false;
  }

  return true;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
