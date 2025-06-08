import { useEffect, useState } from "react";

const LoadingCVProcess = ({ image, text }: { image: string; text: string }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots: string) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-w-72 items-center gap-2 border p-4 rounded-lg shadow-md">
      <img src={image} alt="Loading" className="w-36 h-36" />
      <p className="text-lg font-semibold">{text}</p>
      <p className="text-sm text-gray-500">Please wait{dots}</p>
    </div>
  );
};

export default LoadingCVProcess;
