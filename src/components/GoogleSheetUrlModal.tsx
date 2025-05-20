import React, { useState } from "react";

interface GoogleSheetUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

export const GoogleSheetUrlModal: React.FC<GoogleSheetUrlModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Ingresa la URL del Google Sheet (CSV)
        </h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-800 dark:text-white"
          placeholder="https://docs.google.com/spreadsheets/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              if (url) onSave(url);
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
