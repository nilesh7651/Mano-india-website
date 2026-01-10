import API from "./api";

export async function fetchBlogPosts() {
  const res = await API.get("/blog");
  return res.data;
}

export async function fetchBlogPostBySlug(slug) {
  const res = await API.get(`/blog/${slug}`);
  return res.data;
}
