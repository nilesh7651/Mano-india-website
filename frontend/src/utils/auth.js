const base64UrlDecode = (input) => {
  try {
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return atob(padded);
  } catch {
    return null;
  }
};

// Safe decoding of JWT payload
const parseJwt = (token) => {
  try {
    const payload = token?.split(".")?.[1];
    if (!payload) return null;
    const decoded = base64UrlDecode(payload);
    if (!decoded) return null;
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
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
