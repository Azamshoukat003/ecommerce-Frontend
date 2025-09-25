import React from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
}

/**
 * Reusable confirmation dialog.
 * - `onConfirm` may be async; pass `loading` prop while performing async work.
 * - `onCancel` called when dialog closed/cancel pressed.
 */
export default function ConfirmationDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={() => onCancel?.()}>
      <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          //   transition={{ duration: 0.16 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-[70] focus:outline-none"
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                destructive ? "bg-red-50" : "bg-indigo-50"
              }`}
            >
              <svg
                className={`h-5 w-5 ${
                  destructive ? "text-red-600" : "text-indigo-600"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {destructive ? (
                  <path
                    d="M12 9v4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M12 5v14m7-7H5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </div>

            <div className="flex-1">
              <Dialog.Title
                id="confirmation-dialog-title"
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description
                  id="confirmation-dialog-description"
                  className="text-sm text-gray-600 dark:text-gray-300 mt-1"
                >
                  {description}
                </Dialog.Description>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onCancel?.()}
              disabled={loading}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 disabled:opacity-60"
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              onClick={() => onConfirm()}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white font-medium flex items-center gap-2 ${
                destructive
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-indigo-600 hover:bg-indigo-500"
              } disabled:opacity-60`}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {confirmLabel}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
