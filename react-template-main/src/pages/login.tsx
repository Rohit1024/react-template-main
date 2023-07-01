import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchemaType, loginSchema } from "../lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function Login() {
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { user, login, googleSignIn, gitHubSignIn, anonymousSignIn } = useAuth();

  const onSubmit: SubmitHandler<loginSchemaType> = async (
    data: loginSchemaType
  ) => {
    console.table(data);
    toast.promise(login(data.email, data.password), {
      loading: "Loading",
      success: (data) => `Logged In as : ${data.user.email}`,
      error: (error) => `Error : ${error.code}`,
    }).then(() => {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    });
  };

  const handelLoginWithGoogle = async () => {
    toast.promise(googleSignIn(), {
      loading: "Loading ...",
      success: (data) => `Logged In as : ${data.user.displayName}`,
      error: (error) => `Error : ${error.code}`,
    }).then(() => {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    });
  };

  const handelLoginWithGithub = async () => {
    toast.promise(gitHubSignIn(), {
      loading: "Loading ...",
      success: (data) => `Logged In as : ${data.user.email}`,
      error: (error) => `Error : ${error.code}`,
    }).then(() => {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    });
  };

  const handelAnonymous = async () => {
    toast.promise(anonymousSignIn(), {
      loading: "Loading ...",
      success: (data) => `Logged In as : ${data.user.providerId}`,
      error: (error) => `Error : ${error.code}`,
    }).then(() => {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    });
  };

  useEffect(() => {
    if(user) navigate("/")
  }, [user, navigate]);

  return (
    <div className='flex flex-col justify-center h-screen overflow-hidden'>
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        <Toaster />
        <h1 className='text-3xl font-semibold text-center'>Login</h1>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='text'
              placeholder='Email Address'
              className='input input-bordered w-full'
              {...form("email")}
            />
            {errors.email && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered'
              {...form("password")}
            />
            {errors.password && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.password?.message}
              </p>
            )}
          </div>
          <Link to='/forgot-password' className='text-sm link'>
            Forgot Password ?
          </Link>
          <div>
            <button className='btn btn-primary btn-block' type='submit'>
              Login
            </button>
          </div>
        </form>
        <div className='divider'>OR Continue with</div>
          <div className='flex justify-around'>
            <button className='btn btn-outline' onClick={handelLoginWithGoogle}>
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                loading='lazy'
                alt='google logo'
              />
            </button>
            <button
              className='btn btn-outline btn-active'
              onClick={handelLoginWithGithub}
            >
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/340601/logo-github.svg'
                loading='lazy'
                alt='github logo'
              />
            </button>
            <button className='btn btn-primary' onClick={handelAnonymous}>
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/482673/anonymous.svg'
                loading='lazy'
                alt='Anonymous logo'
              />
            </button>
          </div>
      </div>
    </div>
  );
}
