import API from "./api";

export async function fetchPublicThemes() {
  const res = await API.get("/themes");
  return res.data;
}

export async function createThemeRequest(payload) {
  const res = await API.post("/theme-requests", payload);
  return res.data;
}

export async function adminFetchThemes() {
  const res = await API.get("/admin/themes");
  return res.data;
}

export async function adminCreateTheme(payload) {
  const res = await API.post("/admin/themes", payload);
  return res.data;
}

export async function adminUpdateTheme(id, payload) {
  const res = await API.put(`/admin/themes/${id}`, payload);
  return res.data;
}

export async function adminDeleteTheme(id) {
  const res = await API.delete(`/admin/themes/${id}`);
  return res.data;
}

export async function adminFetchThemeRequests() {
  const res = await API.get("/admin/theme-requests");
  return res.data;
}

export async function adminUpdateThemeRequest(id, payload) {
  const res = await API.patch(`/admin/theme-requests/${id}`, payload);
  return res.data;
}
