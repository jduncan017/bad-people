import { useRef } from "react";
import { Button } from "~/components/ui/Button";
import { useClickOutside } from "~/hooks/useClickOutside";

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetModal({ isOpen, onClose, onConfirm }: ResetModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h3 className="mb-2 text-xl font-bold text-white">Reset Session?</h3>
        <p className="mb-6 text-zinc-400">
          This will clear all session stats, history, and bad prompts. This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
