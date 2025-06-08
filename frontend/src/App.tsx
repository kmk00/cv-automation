import { useState } from "react";
import JobDescriptionForm from "./components/JobDescriptionForm";
import CreatingCvProcess from "./components/CreatingCvProcess";

function App() {
  const [applicationSteps, setApplicationSteps] = useState<number>(1);
  const [jobListing, setJobListing] = useState<string>("");

  return (
    <>
      {applicationSteps === 0 && (
        <JobDescriptionForm
          setApplicationSteps={setApplicationSteps}
          setJobListing={setJobListing}
        />
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
