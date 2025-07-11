import { create } from "zustand";
import type { CV } from "../../types/CV";

interface CVToPDFState {
  cvToPDF: CV | null;
  setCVToPDF: (cvToPDF: CV | null) => void;
}

const useCVToPDF = create<CVToPDFState>((set) => ({
  cvToPDF: null,
  setCVToPDF: (cvToPDF) => set({ cvToPDF }),
}));

export default useCVToPDF;
