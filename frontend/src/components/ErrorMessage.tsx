const ErrorMessage = ({
  text,
  errorMessage,
}: {
  text: string;
  errorMessage: string;
}) => {
  return (
    <div>
      {text}: {errorMessage}
    </div>
  );
};

export default ErrorMessage;
