"use client";
import { useEffect, useState } from "react";
import { GoogleSheetRepository } from "@/infrastructure/GoogleSheetRepository";
import { FetchSheetRows } from "@/application/usecases/fetchSheetRows";
import { SheetRow } from "@/domain/entities/SheetRow";
import { GoogleSheetUrlModal } from "@/components/GoogleSheetUrlModal";
import { useGoogleSheetUrl } from "@/components/useGoogleSheetUrl";

export default function GoogleSheetTable() {
  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [csvUrl, modalOpen, , handleSaveUrl, setModalOpen] =
    useGoogleSheetUrl();

  useEffect(() => {
    if (!csvUrl) return;
    const fetchRows = async () => {
      setLoading(true);
      try {
        const repo = new GoogleSheetRepository(csvUrl);
        const usecase = new FetchSheetRows(repo);
        const data = await usecase.execute();
        setRows(data);
      } catch {
        // Si axios responde con error, borra la url del sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("csvUrl");
          setModalOpen(true);
        }
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRows();
  }, [csvUrl, setModalOpen]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <GoogleSheetUrlModal
        isOpen={modalOpen}
        onClose={() => {}}
        onSave={handleSaveUrl}
      />
      <h2 className="font-bold mb-6 text-2xl text-center">
        Datos de Google Sheets
      </h2>
      {loading && (
        <p className="text-lg text-gray-500 dark:text-gray-400">Cargando...</p>
      )}
      {!loading && rows.length === 0 && (
        <p className="text-lg text-gray-500 dark:text-gray-400">
          No hay datos.
        </p>
      )}
      {!loading && rows.length > 0 && (
        <div className="overflow-x-auto w-full max-w-2xl">
          <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white">
            <thead>
              <tr>
                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-3 text-lg font-semibold bg-gray-100 dark:bg-gray-800">
                  Producto
                </th>
                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-3 text-lg font-semibold bg-gray-100 dark:bg-gray-800">
                  Item
                </th>
                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-3 text-lg font-semibold bg-gray-100 dark:bg-gray-800">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-100 dark:bg-gray-800"
                  }
                >
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">
                    {row.Producto}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">
                    {row.Item}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">
                    {row.Cantidad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
