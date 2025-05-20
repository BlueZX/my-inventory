import { useCallback, useState } from "react";

export function useGoogleSheetUrl(): [
  string | null,
  boolean,
  (show?: boolean) => void,
  (url: string) => void,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
] {
  const [csvUrl, setCsvUrl] = useState<string | null>(
    typeof window !== "undefined" ? sessionStorage.getItem("csvUrl") : null
  );
  const [modalOpen, setModalOpen] = useState(!csvUrl);

  const showModal = useCallback((show: boolean = true) => {
    setModalOpen(show);
  }, []);

  const handleSaveUrl = useCallback((url: string) => {
    sessionStorage.setItem("csvUrl", url);
    setCsvUrl(url);
    setModalOpen(false);
  }, []);

  // Expose a setter for the modal, the url, and the save handler
  return [csvUrl, modalOpen, showModal, handleSaveUrl, setModalOpen];
}
