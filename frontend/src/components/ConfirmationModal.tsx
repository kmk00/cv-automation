import type { CV } from "../../types/CV";

interface ConfirmationModalProps {
  personalizedCv: CV;
  onClose: () => void;
}

const ConfirmationModal = ({
  personalizedCv,
  onClose,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    console.log("Confirmed action for CV:", personalizedCv);
  };

  return (
    <div>
      <div className="fixed inset-0 glassmorphism bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black/60 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
            <p>Are you sure you want to proceed with this action?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 cursor-pointer py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
