import { useForm, useFieldArray } from "react-hook-form";
import type { CV } from "../../types/CV";
import FormCard from "./ui/FormCard";
import FormField from "./ui/FormField";
import DynamicExperienceResponsibility from "./DynamicExperienceResponsibility";
import DynamicSoftSkills from "./DynamicSoftSkills";
import DynamicTechnicalSkills from "./DynamicTechnicalSkills";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

// TODO: ADD VALIDATION FOR THE FORM FIELDS

interface CvToEditProps {
  personalizedCv: CV;
}

const CvToEdit = ({ personalizedCv }: CvToEditProps) => {
  const { register, control } = useForm<CV>({
    defaultValues: {
      ...personalizedCv,
      projects: personalizedCv.projects.map((project) => ({
        ...project,
        technologies: Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies,
      })),
    },
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { fields: workExperienceFields, update: updateWorkExperience } =
    useFieldArray({
      control,
      name: "work_experience",
    });

  const {
    fields: softSkillsFields,
    append: appendSoftSkill,
    remove: removeSoftSkill,
  } = useFieldArray({
    control,
    name: "soft_skills" as any,
  });

  const {
    fields: technicalSkillsFields,
    append: appendTechnicalSkill,
    remove: removeTechnicalSkill,
  } = useFieldArray({
    control,
    name: "technical_skills" as any,
  });

  const handleGenerateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true);
  };
  const addSoftSkillField = () => {
    appendSoftSkill("");
  };

  const addTechnicalSkillField = () => {
    appendTechnicalSkill("");
  };

  const handleRemoveSoftSkill = (index: number) => {
    removeSoftSkill(index);
  };

  const handleRemoveTechnicalSkill = (index: number) => {
    removeTechnicalSkill(index);
  };

  const handleAddResponsibility = (workExperienceIndex: number) => {
    const currentWorkExperience = workExperienceFields[workExperienceIndex];

    const updatedWorkExperience = {
      ...currentWorkExperience,
      responsibilities: [...currentWorkExperience.responsibilities, ""],
    };

    updateWorkExperience(workExperienceIndex, updatedWorkExperience);
  };

  const handleRemoveResponsibility = (
    workExperienceIndex: number,
    responsibilityIndex: number
  ) => {
    const currentWorkExperience = workExperienceFields[workExperienceIndex];

    const updatedResponsibilities =
      currentWorkExperience.responsibilities.filter(
        (_, index) => index !== responsibilityIndex
      );

    const updatedWorkExperience = {
      ...currentWorkExperience,
      responsibilities: updatedResponsibilities,
    };

    updateWorkExperience(workExperienceIndex, updatedWorkExperience);
  };

  return (
    <div className="xl:min-w-[1300px] lg:min-w-[900px]  ">
      <h2 className="text-2xl font-bold mb-4">Your CV information</h2>
      <form className="grid md:grid-cols-[1fr_2fr] gap-x-6">
        <div>
          <FormCard cardLabel="General Information">
            <FormField register={register} fieldName="name" fieldLabel="Name" />
            <FormField
              register={register}
              fieldName="surname"
              fieldLabel="Surname"
            />
            <FormField
              register={register}
              fieldName="email"
              fieldLabel="Email"
            />
            <FormField
              register={register}
              fieldName="phone_number"
              fieldLabel="Phone Number"
            />
            <FormField
              register={register}
              fieldName="linkedin"
              fieldLabel="LinkedIn Profile"
            />
            <FormField
              register={register}
              fieldName="github"
              fieldLabel="GitHub Profile"
            />
            <FormField
              register={register}
              fieldName="portfolio"
              fieldLabel="Portfolio Website"
            />
            <FormField
              register={register}
              fieldName="work_profile"
              fieldLabel="Work Profile"
              fieldType="textarea"
              rows={10}
            />
            <FormField
              register={register}
              fieldName="interests"
              fieldLabel="Interests"
              fieldType="textarea"
              rows={5}
            />
          </FormCard>

          <DynamicSoftSkills
            softSkillsFields={softSkillsFields}
            register={register}
            addSoftSkill={addSoftSkillField}
            handleRemoveSoftSkill={handleRemoveSoftSkill}
          />

          <DynamicTechnicalSkills
            technicalSkillsFields={technicalSkillsFields}
            register={register}
            addTechnicalSkill={addTechnicalSkillField}
            handleRemoveTechnicalSkill={handleRemoveTechnicalSkill}
          />

          <FormCard cardLabel="Languages">
            <div className="space-y-4 flex flex-col">
              {personalizedCv.languages.map((_language, index) => (
                <div className="space-y-2" key={index}>
                  <FormField
                    register={register}
                    fieldName={`languages.${index}.name`}
                    fieldLabel={`Language ${index + 1} Name`}
                  />
                  <FormField
                    register={register}
                    fieldName={`languages.${index}.level`}
                    fieldLabel={`Language ${index + 1} Level`}
                  />
                </div>
              ))}
            </div>
          </FormCard>

          <button
            type="submit"
            className="hidden md:block w-full cursor-pointer hover:bg-blue-600 bg-blue-500 transition text-white px-4 py-8 rounded font-bold text-2xl"
            onClick={handleGenerateTemplate}
          >
            Generate Template
          </button>
        </div>
        <div>
          <FormCard cardLabel="Work Experience">
            <div className="space-y-4">
              {workExperienceFields.map((experience, index) => (
                <div className="space-y-4 flex flex-col" key={experience.id}>
                  <h4 className="text-sm font-semibold pb-2 mt-4">
                    Work Experience {index + 1}
                  </h4>

                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.position_name`}
                    fieldLabel="Position Name"
                  />
                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.company_name`}
                    fieldLabel="Company Name"
                  />
                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.work_start`}
                    fieldLabel="Work Start Date"
                  />
                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.work_end`}
                    fieldLabel="Work End Date"
                  />
                  <DynamicExperienceResponsibility
                    index={index}
                    experience={experience}
                    register={register}
                    handleAddResponsibility={handleAddResponsibility}
                    handleRemoveResponsibility={handleRemoveResponsibility}
                  />
                </div>
              ))}
            </div>
          </FormCard>
          <FormCard cardLabel="Education">
            <div className="space-y-4">
              {personalizedCv.education.map((_education, index) => (
                <div className="space-y-2 flex flex-col mb-4" key={index}>
                  <FormField
                    register={register}
                    fieldName={`education.${index}.subject`}
                    fieldLabel="Subject"
                  />
                  <FormField
                    register={register}
                    fieldName={`education.${index}.date_start`}
                    fieldLabel="Start Date"
                  />
                  <FormField
                    register={register}
                    fieldName={`education.${index}.date_end`}
                    fieldLabel="End Date - Optional"
                  />
                  <FormField
                    register={register}
                    fieldName={`education.${index}.school_name`}
                    fieldLabel="School Name"
                  />
                </div>
              ))}
            </div>
          </FormCard>
          <FormCard cardLabel="Projects">
            <div className="space-y-4">
              {personalizedCv.projects.map((_project, index) => (
                <div className="space-y-2 flex flex-col" key={index}>
                  <FormField
                    register={register}
                    fieldName={`projects.${index}.name`}
                    fieldLabel="Project Name"
                  />
                  <FormField
                    register={register}
                    fieldName={`projects.${index}.description`}
                    fieldLabel="Project Description"
                    fieldType="textarea"
                    rows={4}
                  />

                  <FormField
                    register={register}
                    fieldName={`projects.${index}.technologies`}
                    fieldLabel="Technologies Used"
                  />
                </div>
              ))}
            </div>
          </FormCard>
        </div>
        <button
          type="submit"
          className="md:hidden w-full cursor-pointer hover:bg-blue-600 bg-blue-500 transition text-white px-4 py-8 rounded font-bold text-2xl"
          onClick={handleGenerateTemplate}
        >
          Generate Template
        </button>
      </form>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          personalizedCv={personalizedCv}
          onClose={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CvToEdit;
