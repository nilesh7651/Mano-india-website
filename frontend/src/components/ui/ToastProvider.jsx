import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

const DEFAULT_DURATION_MS = 3500;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const notify = useCallback((toast) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const type = toast?.type || "info";
    const title = toast?.title || "";
    const message = toast?.message || "";
    const durationMs = Number.isFinite(toast?.durationMs) ? toast.durationMs : DEFAULT_DURATION_MS;

    setToasts((prev) => [{ id, type, title, message }, ...prev].slice(0, 4));

    const timer = setTimeout(() => removeToast(id), durationMs);
    timersRef.current.set(id, timer);

    return id;
  }, [removeToast]);

  const value = useMemo(() => ({ notify, removeToast }), [notify, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[92vw] max-w-sm">
        {toasts.map((t) => {
          const styles =
            t.type === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-200"
              : t.type === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-200"
                : t.type === "warning"
                  ? "border-amber-500/20 bg-amber-500/10 text-amber-200"
                  : "border-gray-700 bg-gray-900 text-gray-200";

          return (
            <div
              key={t.id}
              className={`border rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm ${styles}`}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {t.title ? (
                    <div className="text-sm font-semibold truncate">{t.title}</div>
                  ) : null}
                  {t.message ? (
                    <div className="text-sm text-gray-200/90 mt-0.5 break-words">{t.message}</div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  className="text-xs text-gray-300 hover:text-white transition-colors"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      notify: () => undefined,
      removeToast: () => undefined,
    };
  }
  return ctx;
}
