import { useForm, useFieldArray } from "react-hook-form";
import type { CV } from "../../types/CV";
import FormCard from "./ui/FormCard";
import FormField from "./ui/FormField";
import DynamicExperienceResponsibility from "./DynamicExperienceResponsibility";
import DynamicSoftSkills from "./DynamicSoftSkills";
import DynamicTechnicalSkills from "./DynamicTechnicalSkills";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { validationSchema } from "../lib/cvEditValidationSchema";

interface CvToEditProps {
  personalizedCv: CV;
  setApplicationSteps: React.Dispatch<React.SetStateAction<number>>;
}

const CvToEdit = ({ personalizedCv, setApplicationSteps }: CvToEditProps) => {
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useForm<CV>({
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

  const handleGenerateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger();

    if (!isValid) {
      const firstError = document.querySelector(".error-field");

      if (firstError) {
        const offsetTop =
          firstError.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offsetTop - 50,
          behavior: "smooth",
        });
      }
      return;
    }

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
            <FormField
              register={register}
              fieldName="name"
              fieldLabel="Name"
              error={errors.name?.message}
              validation={validationSchema.name}
            />
            <FormField
              register={register}
              fieldName="surname"
              fieldLabel="Surname"
              error={errors.surname?.message}
              validation={validationSchema.surname}
            />
            <FormField
              register={register}
              fieldName="email"
              fieldLabel="Email"
              error={errors.email?.message}
              validation={validationSchema.email}
            />
            <FormField
              register={register}
              fieldName="phone_number"
              fieldLabel="Phone Number"
              error={errors.phone_number?.message}
              validation={validationSchema.phone_number}
            />
            <FormField
              register={register}
              fieldName="linkedin"
              fieldLabel="LinkedIn Profile"
              error={errors.linkedin?.message}
              validation={validationSchema.linkedin}
            />
            <FormField
              register={register}
              fieldName="github"
              fieldLabel="GitHub Profile"
              error={errors.github?.message}
              validation={validationSchema.github}
            />
            <FormField
              register={register}
              fieldName="portfolio"
              fieldLabel="Portfolio Website"
              error={errors.portfolio?.message}
              validation={validationSchema.portfolio}
            />
            <FormField
              register={register}
              fieldName="work_profile"
              fieldLabel="Work Profile"
              fieldType="textarea"
              rows={10}
              error={errors.work_profile?.message}
              validation={validationSchema.work_profile}
            />
            <FormField
              register={register}
              fieldName="interests"
              fieldLabel="Interests"
              fieldType="textarea"
              rows={5}
              error={errors.interests?.message}
              validation={validationSchema.interests}
            />
          </FormCard>

          <DynamicSoftSkills
            softSkillsFields={softSkillsFields}
            register={register}
            addSoftSkill={addSoftSkillField}
            handleRemoveSoftSkill={handleRemoveSoftSkill}
            validation={validationSchema.soft_skills}
            errors={errors}
          />

          <DynamicTechnicalSkills
            technicalSkillsFields={technicalSkillsFields}
            register={register}
            addTechnicalSkill={addTechnicalSkillField}
            handleRemoveTechnicalSkill={handleRemoveTechnicalSkill}
            validation={validationSchema.technical_skills}
            errors={errors}
          />

          <FormCard cardLabel="Languages">
            <div className="space-y-4 flex flex-col">
              {personalizedCv.languages.map((_language, index) => (
                <div className="space-y-2" key={index}>
                  <FormField
                    register={register}
                    fieldName={`languages.${index}.name`}
                    fieldLabel={`Language ${index + 1} Name`}
                    error={errors.languages?.[index]?.name?.message}
                    validation={validationSchema.languages}
                  />
                  <FormField
                    register={register}
                    fieldName={`languages.${index}.level`}
                    fieldLabel={`Language ${index + 1} Level`}
                    error={errors.languages?.[index]?.level?.message}
                    validation={validationSchema.languages}
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
                    error={
                      errors.work_experience?.[index]?.position_name?.message
                    }
                    validation={validationSchema.work_experience}
                  />
                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.company_name`}
                    fieldLabel="Company Name"
                    error={
                      errors.work_experience?.[index]?.company_name?.message
                    }
                    validation={validationSchema.work_experience}
                  />
                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.work_start`}
                    fieldLabel="Work Start Date"
                    error={errors.work_experience?.[index]?.work_start?.message}
                    validation={validationSchema.work_experience}
                  />
                  <FormField
                    register={register}
                    fieldName={`work_experience.${index}.work_end`}
                    fieldLabel="Work End Date"
                    error={
                      index === 0
                        ? undefined
                        : errors.work_experience?.[index]?.work_end?.message
                    }
                  />
                  <DynamicExperienceResponsibility
                    index={index}
                    experience={experience}
                    register={register}
                    handleAddResponsibility={handleAddResponsibility}
                    handleRemoveResponsibility={handleRemoveResponsibility}
                    errors={errors}
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
                    error={errors.education?.[index]?.subject?.message}
                    validation={validationSchema.education}
                  />
                  <FormField
                    register={register}
                    fieldName={`education.${index}.date_start`}
                    fieldLabel="Start Date"
                    error={errors.education?.[index]?.date_start?.message}
                    validation={validationSchema.education}
                  />
                  <FormField
                    register={register}
                    fieldName={`education.${index}.date_end`}
                    fieldLabel="End Date - Optional"
                    error={errors.education?.[index]?.date_end?.message}
                  />
                  <FormField
                    register={register}
                    fieldName={`education.${index}.school_name`}
                    fieldLabel="School Name"
                    error={errors.education?.[index]?.school_name?.message}
                    validation={validationSchema.education}
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
                    error={errors.projects?.[index]?.name?.message}
                    validation={validationSchema.projects}
                  />
                  <FormField
                    register={register}
                    fieldName={`projects.${index}.description`}
                    fieldLabel="Project Description"
                    fieldType="textarea"
                    rows={4}
                    validation={validationSchema.projects}
                    error={errors.projects?.[index]?.description?.message}
                  />

                  <FormField
                    register={register}
                    fieldName={`projects.${index}.technologies`}
                    fieldLabel="Technologies Used"
                    error={errors.projects?.[index]?.technologies?.message}
                    validation={validationSchema.projects}
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
          setApplicationSteps={setApplicationSteps}
        />
      )}
    </div>
  );
};

export default CvToEdit;
