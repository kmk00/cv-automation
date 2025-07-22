import { useState } from "react";
import JobDescriptionForm from "./components/JobDescriptionForm";
import CreatingCvProcess from "./components/CreatingCvProcess";
import { useQuery } from "@tanstack/react-query";
import AuthenticationInfo from "./components/AuthenticationInfo";
import LoadingCVProcess from "./components/LoadingCVProcess";

function App() {
  const [applicationSteps, setApplicationSteps] = useState<number>(0);
  const [jobListing, setJobListing] = useState<string>("");

  const isAuthenticated = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const response = await fetch(import.meta.env.VITE_AUTH_STATUS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch authentication status");
      }
      return response.json();
    },
  });

  if (isAuthenticated.isError) {
    console.error(
      "Failed to fetch authentication status:",
      isAuthenticated.error
    );
  }

  if (isAuthenticated.isLoading) {
    return (
      <LoadingCVProcess
        image="/loading-spinner.svg"
        text="Checking authentication status"
      />
    );
  }

  if (!isAuthenticated.data) {
    return <div>Error fetching authentication status, please try again.</div>;
  }

  return (
    <>
      {applicationSteps === 0 && (
        <>
          <AuthenticationInfo
            authenticated={isAuthenticated.data.authenticated}
          />
          <JobDescriptionForm
            authenticated={isAuthenticated.data.authenticated}
            setApplicationSteps={setApplicationSteps}
            setJobListing={setJobListing}
          />
        </>
      )}

      {applicationSteps > 0 && (
        <CreatingCvProcess
          applicationSteps={applicationSteps}
          setApplicationSteps={setApplicationSteps}
          jobListing={jobListing}
        />
      )}
    </>
  );
}

export default App;
