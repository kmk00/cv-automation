interface FormFieldProps {
  register: any;
  fieldName?: string;
  fieldLabel?: string;
  fieldType?: string;
  rows?: number;
}

const FormField = ({
  register,
  fieldName,
  fieldLabel,
  fieldType = "text",
  rows = 3,
}: FormFieldProps) => {
  if (fieldType === "textarea") {
    return (
      <>
        <label
          htmlFor={fieldName}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {fieldLabel}
        </label>
        <textarea
          id={fieldName}
          className="border border-gray-300 p-2 rounded-l-md w-full"
          {...register(fieldName)}
          placeholder={fieldLabel}
          rows={rows}
        ></textarea>
      </>
    );
  }

  return (
    <>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {fieldLabel}
      </label>
      <input
        id={fieldName}
        className="border border-gray-300 p-2 rounded-l-md w-full"
        {...register(fieldName)}
        placeholder={fieldLabel}
        type={fieldType}
      />
    </>
  );
};

export default FormField;
