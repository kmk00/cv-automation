import { useEffect } from "react";
import FormField from "./ui/FormField";

interface DynamicExperienceResponsibilityProps {
  index: number;
  experience: any;
  register: any;
  handleAddResponsibility: (index: number) => void;
  handleRemoveResponsibility: (index: number, rIndex: number) => void;
  errors: any;
}

const DynamicExperienceResponsibility = ({
  index,
  experience,
  register,
  handleAddResponsibility,
  handleRemoveResponsibility,
  errors,
}: DynamicExperienceResponsibilityProps) => {
  const lastResponsibilityIndex = experience.responsibilities.length - 1;
  const lastResponsibilityId = `work_experience.${index}.responsibilities.${lastResponsibilityIndex}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      const lastResponsibility = document.getElementById(lastResponsibilityId);
      if (lastResponsibility) {
        lastResponsibility.focus();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {experience.responsibilities.map(
        (_responsibility: string, rIndex: number) => (
          <div key={rIndex} className="flex items-start mb-2">
            <div className="flex-1">
              <FormField
                register={register}
                fieldName={`work_experience.${index}.responsibilities.${rIndex}`}
                fieldLabel={`Responsibility ${rIndex + 1}`}
                fieldType="textarea"
                rows={2}
                validation={{ required: "This responsibility is required" }}
                error={
                  errors?.work_experience?.[index]?.responsibilities?.[rIndex]
                    ?.message
                }
              />
            </div>
            {experience.responsibilities.length > 1 && (
              <button
                type="button"
                className="mt-6 mb-1 self-stretch text-red-500 hover:text-red-700 text-sm px-2 py-1 cursor-pointer border border-red-300 hover:border-red-500 hover:bg-red-300 rounded-r-md"
                onClick={() => handleRemoveResponsibility(index, rIndex)}
                title="Remove this responsibility"
              >
                ✕
              </button>
            )}
          </div>
        )
      )}
      <button
        type="button"
        className="text-blue-500 hover:text-blue-700 w-full cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 rounded px-2 py-2 text-sm border border-blue-300 hover:border-blue-500 transition-colors"
        onClick={() => handleAddResponsibility(index)}
      >
        + Add Responsibility
      </button>
    </div>
  );
};

export default DynamicExperienceResponsibility;
