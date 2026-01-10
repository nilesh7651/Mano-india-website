import { useEffect, useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { useToast } from "../../components/ui/ToastProvider";
import {
  DEMO_THEMES,
  deleteTheme,
  getStoredThemes,
  getThemeRequests,
  getThemes as getFallbackThemes,
  setThemes as setStoredThemes,
  updateThemeRequestStatus,
  upsertTheme,
} from "../../utils/themeStore";
import {
  adminCreateTheme,
  adminDeleteTheme,
  adminFetchThemeRequests,
  adminFetchThemes,
  adminUpdateTheme,
  adminUpdateThemeRequest,
} from "../../services/themes";

const emptyForm = {
  id: "",
  name: "",
  priceFrom: "",
  image: "",
  description: "",
  tags: "",
  active: true,
};

export default function AdminThemes() {
  const { notify } = useToast();
  const [themes, setThemesState] = useState(() => getFallbackThemes());
  const [requests, setRequests] = useState(() => getThemeRequests());
  const [form, setForm] = useState(emptyForm);
  const [apiMode, setApiMode] = useState("unknown"); // 'api' | 'demo' | 'unknown'

  const usingDemo = useMemo(() => {
    const stored = getStoredThemes();
    return !stored || stored.length === 0;
  }, []);

  useEffect(() => {
    const load = async () => {
      // Try backend APIs first
      try {
        const [apiThemes, apiRequests] = await Promise.all([
          adminFetchThemes(),
          adminFetchThemeRequests(),
        ]);
        setThemesState(Array.isArray(apiThemes) ? apiThemes : []);
        setRequests(Array.isArray(apiRequests) ? apiRequests : []);
        setApiMode("api");
        return;
      } catch {
        // Fallback to demo/local
        setThemesState(getFallbackThemes());
        setRequests(getThemeRequests());
        setApiMode("demo");
      }
    };

    load();

    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const saveTheme = async () => {
    const payload = {
      name: form.name.trim(),
      priceFrom: Number(form.priceFrom || 0),
      image: form.image.trim(),
      description: form.description.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      active: Boolean(form.active),
    };

    // Backend path if available
    if (apiMode === "api") {
      try {
        const id = form.id?.trim(); // in API mode, id must be Mongo _id for update
        const saved = id ? await adminUpdateTheme(id, payload) : await adminCreateTheme(payload);

        setThemesState((prev) => {
          if (id) return prev.map((t) => ((t._id || t.id) === id ? saved : t));
          return [saved, ...prev];
        });
        setForm(emptyForm);
        notify({ type: "success", title: "Saved", message: "Theme saved successfully." });
        return;
      } catch (e) {
        notify({ type: "warning", title: "Backend unavailable", message: "Switching to demo fallback for Themes." });
        setApiMode("demo");
        // fall through to demo logic below
      }
    }

    // Demo fallback
    const id = form.id?.trim() || `theme-${Date.now()}`;
    const theme = { id, ...payload };
    const next = upsertTheme(theme);
    setThemesState(next.length ? next : getFallbackThemes());
    setForm(emptyForm);
    notify({ type: "success", title: "Saved (demo)", message: "Theme saved in demo fallback (local browser)." });
  };

  const removeTheme = async (id) => {
    if (apiMode === "api") {
      try {
        await adminDeleteTheme(id);
        setThemesState((prev) => prev.filter((t) => (t._id || t.id) !== id));
        notify({ type: "success", title: "Deleted", message: "Theme deleted." });
        return;
      } catch {
        notify({ type: "warning", title: "Backend unavailable", message: "Switching to demo fallback for Themes." });
        setApiMode("demo");
        // fall through to demo logic below
      }
    }

    const next = deleteTheme(id);
    setThemesState(next.length ? next : getFallbackThemes());
    notify({ type: "success", title: "Deleted (demo)", message: "Theme deleted in demo fallback (local browser)." });
  };

  const resetToDemo = () => {
    setStoredThemes([]);
    setThemesState(DEMO_THEMES);
    setApiMode("demo");
    notify({ type: "success", title: "Reset", message: "Reset to demo themes (local browser)." });
  };

  const markRequest = async (id, status) => {
    if (apiMode === "api") {
      try {
        const updated = await adminUpdateThemeRequest(id, { status });
        setRequests((prev) => prev.map((r) => ((r._id || r.id) === (updated._id || updated.id) ? updated : r)));
        notify({ type: "success", title: "Updated", message: `Request marked ${status}.` });
        return;
      } catch {
        notify({ type: "warning", title: "Backend unavailable", message: "Switching to demo fallback for requests." });
        setApiMode("demo");
        // fall through to demo logic below
      }
    }
    const next = updateThemeRequestStatus(id, status);
    setRequests(next);
    notify({ type: "success", title: "Updated (demo)", message: `Request marked ${status} in demo fallback.` });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-white">Themes</h1>
        <p className="text-gray-400 mt-1">
          Manage the Theme catalog. Public users see these at /themes. {apiMode === "api" ? "Connected to backend." : usingDemo ? "Currently showing DEMO themes." : "Using stored themes."}
        </p>
      </div>

      <section className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">Add / Update Theme</h2>
          <Button variant="secondary" size="sm" onClick={resetToDemo}>
            Reset to demo
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={`Theme ID (optional)${apiMode === "api" ? " - use Mongo _id for update" : ""}`} value={form.id} onChange={(v) => setForm((p) => ({ ...p, id: v }))} placeholder={apiMode === "api" ? "65f..." : "theme-royal-wedding"} />
          <Field label="Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} placeholder="Royal Wedding" />
          <Field label="Price From (₹)" type="number" value={form.priceFrom} onChange={(v) => setForm((p) => ({ ...p, priceFrom: v }))} placeholder="49999" />
          <Field label="Image URL" value={form.image} onChange={(v) => setForm((p) => ({ ...p, image: v }))} placeholder="https://..." />
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              placeholder="Theme details..."
            />
          </div>
          <div className="md:col-span-2">
            <Field label="Tags (comma separated)" value={form.tags} onChange={(v) => setForm((p) => ({ ...p, tags: v }))} placeholder="wedding, royal, premium" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
              />
              Active
            </label>
            <Button onClick={saveTheme} className="!bg-amber-600 !text-white">
              Save Theme
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Theme Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((t) => (
            <div key={t._id || t.id} className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="h-36 overflow-hidden">
                <img
                  src={t.image}
                  alt={`${t.name} theme`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t._id || t.id}</div>
                  </div>
                  <div className="text-amber-500 font-bold">₹ {Number(t.priceFrom || 0).toLocaleString()}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full border ${t.active === false ? "border-red-500/20 text-red-300 bg-red-500/10" : "border-green-500/20 text-green-300 bg-green-500/10"}`}>
                    {t.active === false ? "INACTIVE" : "ACTIVE"}
                  </span>
                  <Button variant="danger" size="sm" onClick={() => removeTheme(t._id || t.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Theme Booking Requests {apiMode === "api" ? "" : "(demo)"}</h2>
        {requests.length === 0 ? (
          <div className="text-gray-400">No requests yet.</div>
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r._id || r.id} className="bg-gray-950 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-white font-semibold truncate">{r.theme?.name || r.themeName}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(r.createdAt).toLocaleString()} • {r.user?.email}
                    </div>
                    <div className="text-sm text-gray-300 mt-2">
                      Event: {r.eventDate} • City: {r.city} • Budget: ₹ {Number(r.budget || 0).toLocaleString()}
                    </div>
                    {r.notes ? <div className="text-sm text-gray-400 mt-2">Notes: {r.notes}</div> : null}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-200 shrink-0">
                    {r.status}
                  </span>
                </div>

                <div className="mt-4 flex gap-3 justify-end">
                  <Button size="sm" variant="secondary" onClick={() => markRequest(r._id || r.id, "APPROVED")}>
                    Approve
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => markRequest(r._id || r.id, "REJECTED")}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
      />
    </div>
  );
}
