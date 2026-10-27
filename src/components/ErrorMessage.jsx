import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="flex-1">
        <p>{message}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="mt-2 font-semibold underline underline-offset-2 hover:text-red-950">
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
