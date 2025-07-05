interface FormCardProps {
  cardLabel: string;
  children?: React.ReactNode;
}

const FormCard = ({ cardLabel, children }: FormCardProps) => {
  return (
    <div className="glassmorphism p-4 mb-6">
      <h3 className="mb-4 text-xl font-semibold">{cardLabel}</h3>
      <div className="  rounded-lg shadow-md flex flex-col space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormCard;
