import { useEffect } from "react";
import FormCard from "./ui/FormCard";
import FormField from "./ui/FormField";

interface DynamicTechnicalSkillsProps {
  technicalSkillsFields: any[];
  register: any;
  addTechnicalSkill: () => void;
  handleRemoveTechnicalSkill: (index: number) => void;
  validation?: any;
  errors?: any;
}

const DynamicTechnicalSkills = ({
  technicalSkillsFields,
  register,
  addTechnicalSkill,
  handleRemoveTechnicalSkill,
  validation,
  errors,
}: DynamicTechnicalSkillsProps) => {
  const lastFieldIndex = technicalSkillsFields.length - 1;
  const lastFieldId = `technical_skills.${lastFieldIndex}`;

  useEffect(() => {
    // Add a small delay to ensure the DOM element is rendered
    const timer = setTimeout(() => {
      const lastField = document.getElementById(lastFieldId);
      if (lastField) {
        lastField.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [technicalSkillsFields.length, lastFieldId]);

  return (
    <FormCard cardLabel="Technical Skills">
      <div className="space-y-4 flex flex-col">
        {technicalSkillsFields.map((field, index) => (
          <div key={field.id} className="flex items-start">
            <div className="flex-1">
              <FormField
                register={register}
                fieldName={`technical_skills.${index}`}
                fieldLabel={`Technical Skill ${index + 1}`}
                fieldType="textarea"
                error={errors?.technical_skills?.[index]?.message}
                validation={validation}
              />
            </div>
            {technicalSkillsFields.length > 1 && (
              <button
                type="button"
                className="mt-6 mb-1 self-stretch text-red-500 hover:text-red-700 text-sm px-2 py-1 cursor-pointer border border-red-300 hover:border-red-500 hover:bg-red-300 rounded-r-md"
                onClick={() => handleRemoveTechnicalSkill(index)}
                title="Remove this technical skill"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={addTechnicalSkill}
      >
        Add Technical Skill
      </button>
    </FormCard>
  );
};

export default DynamicTechnicalSkills;
