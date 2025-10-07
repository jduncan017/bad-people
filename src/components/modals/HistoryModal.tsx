import { useRef } from "react";
import { useClickOutside } from "~/hooks/useClickOutside";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptHistory: string[];
}

export function HistoryModal({
  isOpen,
  onClose,
  promptHistory,
}: HistoryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="flex w-full max-w-2xl flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        style={{ maxHeight: "80vh" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            All Questions ({promptHistory.length})
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          className="overflow-y-auto pr-2"
          style={{ maxHeight: "calc(80vh - 100px)" }}
        >
          {promptHistory.length > 0 ? (
            <div className="space-y-2">
              {promptHistory.map((prompt, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-3"
                >
                  <p className="text-sm text-zinc-300">{prompt}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-zinc-500">
              No questions generated yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
