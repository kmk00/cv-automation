import { useForm } from "react-hook-form";
import type { CV } from "../../types/CV";

interface CvToEditProps {
  personalizedCv: CV;
}

const CvToEdit = ({ personalizedCv }: CvToEditProps) => {
  console.log(
    "CvToEdit component rendered with personalizedCv:",
    personalizedCv
  );

  const { register } = useForm<CV>({
    defaultValues: personalizedCv,
  });

  return (
    <div>
      <h2>CvToEdit</h2>
      <form>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />
      </form>
    </div>
  );
};

export default CvToEdit;
