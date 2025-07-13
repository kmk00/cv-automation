import { useForm } from "react-hook-form";

type Inputs = {
  jobListing: string;
};

type JobDescriptionFormProps = {
  setApplicationSteps: React.Dispatch<React.SetStateAction<number>>;
  setJobListing: React.Dispatch<React.SetStateAction<string>>;
};

const JobDescriptionForm = ({
  setApplicationSteps,
  setJobListing,
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
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        id="jobListing"
        rows={10}
        cols={50}
        placeholder="Paste your job listing here..."
        {...register("jobListing", { required: true })}
      ></textarea>
      <button
        className="bg-blue-700 text-white p-2 rounded hover:bg-blue-600 transition cursor-pointer"
        type="submit"
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
