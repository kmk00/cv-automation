import { useState } from "react";
import JobDescriptionForm from "./components/JobDescriptionForm";
import CreatingCvProcess from "./components/CreatingCvProcess";

function App() {
  const [applicationSteps, setApplicationSteps] = useState<number>(0);
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
      <p className="text-2xl text-red-400">{applicationSteps}</p>
    </>
  );
}

export default App;
