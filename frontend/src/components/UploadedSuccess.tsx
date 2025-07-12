import useCVToPDF from "../store/cvToEdit";
import ErrorMessage from "./ErrorMessage";

interface UploadedSuccessProps {
  uploadedCVDetails: {
    message: string;
    cvLink: string;
    fileId: string | number;
    fileName: string;
  };
  setApplicationSteps: React.Dispatch<React.SetStateAction<number>>;
}

const UploadedSuccess = ({
  uploadedCVDetails,
  setApplicationSteps,
}: UploadedSuccessProps) => {
  if (!uploadedCVDetails) {
    <ErrorMessage text="Error" errorMessage="No CV details found" />;
  }

  const { setCVToPDF } = useCVToPDF();

  const handleReset = () => {
    setCVToPDF(null);
    setApplicationSteps(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/success.gif"
        alt="Success"
        className="w-24 h-24 mb-4 rounded-3xl"
      />
      <h2 className="text-2xl font-semibold mb-2">Success!</h2>
      <p className="text-lg mb-4">{uploadedCVDetails.message}</p>
      <div className="flex items-center justify-center mb-4">
        <a
          href={uploadedCVDetails.cvLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Download CV
        </a>
        <a
          href={import.meta.env.VITE_GOOGLE_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 text-blue-500 hover:underline"
        >
          View in Google Drive
        </a>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        File ID: {uploadedCVDetails.fileId}
      </p>
      <p className="text-sm text-gray-500">
        File Name: {uploadedCVDetails.fileName}
      </p>
      <button
        className="bg-blue-700 text-white p-2 mt-4 rounded hover:bg-blue-600
        transition cursor-pointer"
        onClick={handleReset}
      >
        Create Another CV
      </button>
    </div>
  );
};

export default UploadedSuccess;
