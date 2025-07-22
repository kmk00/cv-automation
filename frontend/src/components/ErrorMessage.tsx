const ErrorMessage = ({
  text,
  errorMessage,
}: {
  text: string;
  errorMessage: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>
        {text}: {errorMessage}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer mt-4"
        onClick={() => window.location.reload()}
      >
        Refresh page
      </button>
    </div>
  );
};

export default ErrorMessage;
