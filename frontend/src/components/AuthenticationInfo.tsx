interface AuthenticationInfoProps {
  authenticated: boolean;
}

const AuthenticationInfo = ({ authenticated }: AuthenticationInfoProps) => {
  console.log("Authentication status:", authenticated);

  if (authenticated) {
    return (
      <div className="fixed bottom-4 left-4 flex flex-col gap-4 px-8 py-4 mb-4 text-green-500 glassmorphism">
        <p className="text-lg font-semibold tracking-wider">Authenticated ✔</p>
      </div>
    );
  }

  return (
    <div className="fixed md:bottom-4 md:left-4 md:translate-x-0 bottom-0 left-[50%] translate-x-[-50%] flex flex-col gap-4 py-4 px-8 mb-4 text-center glassmorphism">
      <p>Please log in to your google account to continue.</p>
      <a
        className="bg-blue-500 hover:bg-blue-600 transition-colors  text-white px-4 py-2 rounded "
        href={import.meta.env.VITE_AUTH_URL}
      >
        Log in
      </a>
    </div>
  );
};

export default AuthenticationInfo;
