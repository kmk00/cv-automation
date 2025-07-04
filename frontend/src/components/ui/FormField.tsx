interface FormFieldProps {
  register: any;
  fieldName?: string;
  fieldLabel?: string;
  fieldType?: string;
  rows?: number;
  validation?: any;
  error?: string;
}

const FormField = ({
  register,
  fieldName,
  fieldLabel,
  fieldType = "text",
  rows = 3,
  validation,
  error,
}: FormFieldProps) => {
  const hasError = !!error;

  if (fieldType === "textarea") {
    return (
      <div className={`${hasError ? "error-field" : ""}`}>
        <label
          htmlFor={fieldName}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {fieldLabel}
        </label>
        <textarea
          id={fieldName}
          className={
            `border border-gray-300 p-2 rounded-l-md w-full` +
            (hasError ? " border-red-500" : "")
          }
          {...register(fieldName, validation)}
          placeholder={fieldLabel}
          rows={rows}
        ></textarea>
        {hasError && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className={`${hasError ? "error-field" : ""}`}>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {fieldLabel}
      </label>
      <input
        id={fieldName}
        className={
          `border p-2 rounded-l-md w-full` +
          (hasError ? " border-red-500" : " border-gray-300")
        }
        {...register(fieldName, validation)}
        placeholder={fieldLabel}
        type={fieldType}
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
