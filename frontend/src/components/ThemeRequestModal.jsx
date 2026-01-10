import { useMemo, useState } from "react";
import Button from "./ui/Button";
import { getUser } from "../utils/auth";
import { useToast } from "./ui/ToastProvider";
import { addThemeRequest } from "../utils/themeStore";
import { createThemeRequest } from "../services/themes";

export default function ThemeRequestModal({ theme, onClose, onSubmitted }) {
  const { notify } = useToast();
  const user = useMemo(() => getUser(), []);

  const [eventDate, setEventDate] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState(theme?.priceFrom ? String(theme.priceFrom) : "");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const canSubmit = Boolean(eventDate && city && budget);

  const submit = async () => {
    const currentUser = getUser();
    if (!currentUser) {
      notify({ type: "warning", title: "Login required", message: "Please login to book a theme." });
      return;
    }
    if (currentUser.role !== "user") {
      notify({ type: "warning", title: "User account required", message: "Only users can book themes." });
      return;
    }

    if (!canSubmit) {
      notify({ type: "warning", title: "Missing details", message: "Please fill event date, city, and budget." });
      return;
    }

    setSaving(true);
    try {
      const themeId = theme?._id || theme?.id;
      if (!themeId) {
        notify({ type: "error", title: "Missing theme", message: "Theme ID not found." });
        return;
      }

      // Primary (real) backend path
      try {
        await createThemeRequest({
          themeId,
          eventDate,
          city,
          budget: Number(budget),
          notes,
        });

        notify({
          type: "success",
          title: "Request sent",
          message: "Theme booking request sent to admin.",
        });

        onSubmitted?.();
        onClose?.();
        return;
      } catch {
        // Fallback to demo storage below
      }

      const req = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
        status: "PENDING",
        themeId,
        themeName: theme?.name,
        themePriceFrom: theme?.priceFrom,
        eventDate,
        city,
        budget: Number(budget),
        notes,
        user: {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
        },
      };

      addThemeRequest(req);

      notify({
        type: "success",
        title: "Request sent",
        message: "Theme booking request saved in demo fallback (backend not reachable).",
      });

      onSubmitted?.(req);
      onClose?.();
    } catch (e) {
      notify({ type: "error", title: "Failed", message: e?.message || "Could not send request" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-white truncate">Book Theme</h3>
            <p className="text-gray-400 text-sm mt-1 truncate">{theme?.name || "Theme"}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {!user ? (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200 px-4 py-3 text-sm">
            Please login as a user to send a theme booking request.
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Event date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Delhi"
              className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Budget (₹)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min={0}
              className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific decor requirements..."
              rows={3}
              className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="!bg-gray-900 !text-white">
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={!canSubmit}
            isLoading={saving}
            className="!bg-amber-600 !text-white"
          >
            Send Request
          </Button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          If the backend is unavailable, this form falls back to demo mode (stored in this browser) and is visible in Admin → Themes.
        </p>
      </div>
    </div>
  );
}
