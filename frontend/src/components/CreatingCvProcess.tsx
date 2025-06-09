import { useMutation } from "@tanstack/react-query";
import { cvCreationApi } from "../api/cvCreation";
import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import LoadingCVProcess from "./LoadingCVProcess";

type CreatingCvProcessProps = {
  jobListing: string;
  applicationSteps: number;
  setApplicationSteps: React.Dispatch<React.SetStateAction<number>>;
};

const CreatingCvProcess = ({
  jobListing,
  applicationSteps,
  setApplicationSteps,
}: CreatingCvProcessProps) => {
  /**
   * useEffect to trigger the job listing analysis when the component mounts
   * This is only done when applicationSteps is 1, indicating the first step of the process
   */
  useEffect(() => {
    if (applicationSteps === 1) {
      analyzeJobListingMutation.mutate(jobListing);
    }
  }, []);

  const handleCVDownload = () => {
    console.log("Download CV clicked");
  };

  /**
   * Mutations for the CV creation process
   * - analyzeJobListingMutation: Analyzes the job listing to extract relevant information
   * - generateCvMutation: Generates a CV based on the analyzed job listing
   * - uploadCvMutation: Uploads the generated CV to Google Drive
   */
  const analyzeJobListingMutation = useMutation({
    mutationFn: (jobListing: string) =>
      cvCreationApi.analyzeJobListing(jobListing),
    onSuccess: (data) => {
      generateCvMutation.mutate(data);
      // console.log("Job listing analyzed:", data);
      setApplicationSteps(2);
    },
    onError: (error) => {
      console.error("Error analyzing job listing:", error);
    },
  });

  const generateCvMutation = useMutation({
    mutationFn: (jobListing: string) => cvCreationApi.generateCv(jobListing),
    onSuccess: (data) => {
      console.log("CV generated:", data);
      uploadCvMutation.mutate(data);
      setApplicationSteps(3);
    },
    onError: (error) => {
      console.error("Error generating CV:", error);
    },
  });

  const uploadCvMutation = useMutation({
    mutationFn: (cvData: string) => cvCreationApi.uploadCv(cvData),
    onSuccess: () => {
      console.log("CV uploaded successfully");
      setApplicationSteps(4);
    },
    onError: (error) => {
      console.error("Error uploading CV:", error);
    },
  });

  /**
   * Pending states for each mutation
   * - analyzeJobListingMutation: Analyzing the job listing
   * - generateCvMutation: Generating the CV based on the analyzed job listing
   * - uploadCvMutation: Uploading the generated CV to Google Drive
   */

  if (analyzeJobListingMutation.isPending) {
    return (
      <LoadingCVProcess image="/cv-icon.svg" text="Analyzing job listing" />
    );
  }

  if (generateCvMutation.isPending) {
    return (
      <LoadingCVProcess image="/cv-creation.svg" text="Generating your CV" />
    );
  }

  if (uploadCvMutation.isPending) {
    return (
      <LoadingCVProcess
        image="/cv-upload.svg"
        text="Uploading CV to Google Drive"
      />
    );
  }

  /**
   * Error states for each mutation
   * - analyzeJobListingMutation: Error analyzing the job listing
   * - generateCvMutation: Error generating the CV
   * - uploadCvMutation: Error uploading the CV to Google Drive
   */

  if (analyzeJobListingMutation.isError) {
    return (
      <ErrorMessage
        text="Error analyzing job listing"
        errorMessage={analyzeJobListingMutation.error.message}
      />
    );
  }

  if (generateCvMutation.isError) {
    return (
      <ErrorMessage
        text="Error generating CV"
        errorMessage={generateCvMutation.error.message}
      />
    );
  }

  if (uploadCvMutation.isError) {
    return (
      <ErrorMessage
        text="Error uploading CV"
        errorMessage={uploadCvMutation.error.message}
      />
    );
  }

  /**
   * Success state for the final mutation
   * - uploadCvMutation: CV uploaded successfully
   */

  if (uploadCvMutation.isSuccess) {
    return (
      <div className="flex flex-col min-w-72 items-center gap-2 border p-4 rounded-lg shadow-md">
        <h2>CV uploaded successfully</h2>
        <p className="text-sm text-gray-500">
          You can find your CV in your Google Drive.
        </p>
        <a
          href={import.meta.env.VITE_GOOGLE_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2"
        >
          Open Google Drive
        </a>
        <button
          onClick={handleCVDownload}
          className="bg-green-700 text-white p-2 rounded cursor-pointer"
        >
          Download CV
        </button>
      </div>
    );
  }
};

export default CreatingCvProcess;
