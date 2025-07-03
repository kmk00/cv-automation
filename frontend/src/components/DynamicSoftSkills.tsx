import { useEffect } from "react";
import FormCard from "./ui/FormCard";
import FormField from "./ui/FormField";

interface DynamicSoftSkillsProps {
  register: any;
  addSoftSkill: () => void;
  handleRemoveSoftSkill: (index: number) => void;
  softSkillsFields: any[];
}

const DynamicSoftSkills = ({
  softSkillsFields,
  register,
  addSoftSkill,
  handleRemoveSoftSkill,
}: DynamicSoftSkillsProps) => {
  const lastFieldIndex = softSkillsFields.length - 1;
  const lastFieldId = `soft_skills.${lastFieldIndex}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      const lastField = document.getElementById(lastFieldId);
      if (lastField) {
        lastField.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [softSkillsFields.length, lastFieldId]);

  return (
    <FormCard cardLabel="Soft Skills">
      <div className="space-y-4 flex flex-col">
        {softSkillsFields.map((field, index) => (
          <div key={field.id} className="flex items-start">
            <div className="flex-1">
              <FormField
                register={register}
                fieldName={`soft_skills.${index}`}
                fieldLabel={`Soft Skill ${index + 1}`}
                fieldType="textarea"
              />
            </div>
            {softSkillsFields.length > 1 && (
              <button
                type="button"
                className="mt-6 mb-1 self-stretch text-red-500 hover:text-red-700 text-sm px-2 py-1 cursor-pointer border border-red-300 hover:border-red-500 hover:bg-red-300 rounded-r-md"
                onClick={() => handleRemoveSoftSkill(index)}
                title="Remove this soft skill"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={addSoftSkill}
      >
        Add Soft Skill
      </button>
    </FormCard>
  );
};

export default DynamicSoftSkills;
