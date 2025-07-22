import { useForm } from "react-hook-form";

type Inputs = {
  jobListing: string;
};

type JobDescriptionFormProps = {
  setApplicationSteps: React.Dispatch<React.SetStateAction<number>>;
  setJobListing: React.Dispatch<React.SetStateAction<string>>;
  authenticated: boolean;
};

const JobDescriptionForm = ({
  setApplicationSteps,
  setJobListing,
  authenticated,
}: JobDescriptionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setJobListing(data.jobListing);
    setApplicationSteps(1);
  };

  return (
    <form
      className="flex flex-col gap-4 p-2 mb-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <textarea
        className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
          authenticated ? "" : "cursor-not-allowed bg-gray-600/40"
        }`}
        id="jobListing"
        rows={10}
        cols={50}
        disabled={!authenticated}
        placeholder={
          authenticated
            ? "Paste job listing here..."
            : "Please log in to paste job listing"
        }
        {...register("jobListing", { required: true })}
      ></textarea>
      <button
        className={` text-white p-2 rounded transition  ${
          authenticated
            ? "bg-green-500 hover:bg-green-600 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        type="submit"
        disabled={!authenticated}
        onClick={handleSubmit(onSubmit)}
      >
        Generate CV
      </button>
      {errors.jobListing && (
        <span className="text-red-500"> Job listing is required </span>
      )}
    </form>
  );
};

export default JobDescriptionForm;
