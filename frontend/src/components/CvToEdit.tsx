import { useForm, useFieldArray } from "react-hook-form";
import type { CV } from "../../types/CV";
import FormCard from "./ui/FormCard";
import FormField from "./ui/FormField";

// TODO: CHANGE STYLES FOR THE BUTTONS
// TODO: ADD VALIDATION FOR THE FORM FIELDS
// TODO: ADD SUBMIT FUNCTIONALITY TO THE FORM
// TODO: IMPROVE UX OF THE FORM
// TODO: ADD A CONFIRMATION DIALOG BEFORE SUBMITTING THE FORM

interface CvToEditProps {
  personalizedCv: CV;
}

const CvToEdit = ({ personalizedCv }: CvToEditProps) => {
  console.log(
    "CvToEdit component rendered with personalizedCv:",
    personalizedCv
  );

  const { register, handleSubmit, control } = useForm<CV>({
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

          <FormCard cardLabel="Soft Skills">
            <div className="space-y-4 flex flex-col">
              {softSkillsFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
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
                      className="mt-6 text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded border border-red-300 hover:border-red-500"
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
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={addSoftSkillField}
            >
              Add Soft Skill
            </button>
          </FormCard>

          <FormCard cardLabel="Technical Skills">
            <div className="space-y-4 flex flex-col">
              {technicalSkillsFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <FormField
                      register={register}
                      fieldName={`technical_skills.${index}`}
                      fieldLabel={`Technical Skill ${index + 1}`}
                      fieldType="textarea"
                    />
                  </div>
                  {technicalSkillsFields.length > 1 && (
                    <button
                      type="button"
                      className="mt-6 text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded border border-red-300 hover:border-red-500"
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
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={addTechnicalSkillField}
            >
              Add Technical Skill
            </button>
          </FormCard>

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
        </div>
        <div>
          <FormCard cardLabel="Work Experience">
            <div className="space-y-4">
              {workExperienceFields.map((experience, index) => (
                <div
                  className="space-y-4 flex flex-col pb-4 mb-4"
                  key={experience.id}
                >
                  <h4 className="text-sm font-semibold">
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

                  <div>
                    {experience.responsibilities.map(
                      (_responsibility, rIndex) => (
                        <div
                          key={rIndex}
                          className="flex items-start gap-2 mb-2"
                        >
                          <div className="flex-1">
                            <FormField
                              register={register}
                              fieldName={`work_experience.${index}.responsibilities.${rIndex}`}
                              fieldLabel={`Responsibility ${rIndex + 1}`}
                              fieldType="textarea"
                              rows={2}
                            />
                          </div>
                          {experience.responsibilities.length > 1 && (
                            <button
                              type="button"
                              className="mt-6 text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded border border-red-300 hover:border-red-500"
                              onClick={() =>
                                handleRemoveResponsibility(index, rIndex)
                              }
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
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit((data) => {
              console.log("Form submitted with data:", data);
            })}
          >
            Save CV
          </button>
        </div>
      </form>
    </div>
  );
};

export default CvToEdit;
