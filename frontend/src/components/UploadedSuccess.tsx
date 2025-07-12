import ErrorMessage from "./ErrorMessage";

interface UploadedSuccessProps {
  uploadedCVDetails: {
    message: string;
    cvLink: string;
    fileId: string | number;
    fileName: string;
  };
}

const UploadedSuccess = ({ uploadedCVDetails }: UploadedSuccessProps) => {
  console.log("Uploaded CV Details:", uploadedCVDetails);

  if (!uploadedCVDetails) {
    <ErrorMessage text="Error" errorMessage="No CV details found" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/success.svg" alt="Success" className="w-24 h-24 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Success!</h2>
      <p className="text-lg mb-4">{uploadedCVDetails.message}</p>
      <a
        href={uploadedCVDetails.cvLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Download CV
      </a>
      <p className="text-sm text-gray-500 mt-2">
        File ID: {uploadedCVDetails.fileId}
      </p>
      <p className="text-sm text-gray-500">
        File Name: {uploadedCVDetails.fileName}
      </p>
    </div>
  );
};

export default UploadedSuccess;
