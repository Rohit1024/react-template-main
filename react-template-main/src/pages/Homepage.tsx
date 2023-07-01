import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  return (
    <div className='relative flex flex-col justify-center h-screen'>
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        {user ? (
          <h1 className='text-3xl font-semibold text-center'>
            Hi {user.email}
          </h1>
        ) : (
          <h1 className='text-3xl font-semibold text-center'>
            You are not logged in
          </h1>
        )}
      </div>
    </div>
  );
}
