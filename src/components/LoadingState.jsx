import { Loader2 } from "lucide-react";

export default function LoadingState({ message }) {
  return (
    <div role="status" className="flex items-center gap-3 text-sm text-pine-700">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{message}</span>
    </div>
  );
}
