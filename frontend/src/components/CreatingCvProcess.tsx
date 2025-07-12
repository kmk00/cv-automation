import { useMutation } from "@tanstack/react-query";
import { cvCreationApi } from "../api/cvCreation";
import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import LoadingCVProcess from "./LoadingCVProcess";
import CvToEdit from "./CvToEdit";
import type { CV } from "../../types/CV";
import useCVToPDF from "../store/cvToEdit";
import UploadedSuccess from "./UploadedSuccess";

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

  const { cvToPDF } = useCVToPDF();

  useEffect(() => {
    if (applicationSteps === 1) {
      analyzeJobListingMutation.mutate(jobListing);
    }

    if (applicationSteps === 2 && cvToPDF) {
      console.log("CV to PDF:", cvToPDF);
      generateCvMutation.mutate(cvToPDF);
    }
  }, [applicationSteps, cvToPDF]);

  /**
   * Mutations for the CV creation process
   * - analyzeJobListingMutation: Analyzes the job listing to extract relevant information
   * - generateCvMutation: Generates a CV based on the analyzed job listing
   * - uploadCvMutation: Uploads the generated CV to Google Drive
   */
  const analyzeJobListingMutation = useMutation({
    mutationFn: (jobListing: string) =>
      cvCreationApi.analyzeJobListing(jobListing),
    onError: (error) => {
      console.error("Error analyzing job listing:", error);
    },
  });

  const generateCvMutation = useMutation({
    mutationFn: (jobListing: CV) => cvCreationApi.generateCv(jobListing),
    onSuccess: (data) => {
      console.log("CV generated:", data.fileName);
      setApplicationSteps(3);

      if (!data.fileName) {
        throw new Error("Generated CV does not have a filename");
      }

      uploadCvMutation.mutate(data.fileName);
    },
    onError: (error) => {
      console.error("Error generating CV:", error);
    },
  });

  const uploadCvMutation = useMutation({
    mutationFn: (fileName: string) => cvCreationApi.uploadCv(fileName),
    onSuccess: (data) => {
      console.log("SuccessData:", data);
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

  if (analyzeJobListingMutation.isSuccess && applicationSteps === 1) {
    return (
      <CvToEdit
        personalizedCv={analyzeJobListingMutation.data.data}
        setApplicationSteps={setApplicationSteps}
      />
    );
  }

  if (uploadCvMutation.isSuccess && applicationSteps === 3) {
    return (
      <UploadedSuccess
        uploadedCVDetails={uploadCvMutation.data}
        setApplicationSteps={setApplicationSteps}
      />
    );
  }
};

export default CreatingCvProcess;
