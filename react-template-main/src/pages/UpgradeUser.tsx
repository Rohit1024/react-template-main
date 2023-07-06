import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "../lib/validations/auth";
import { ChangeEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

type providers = "Email" | "Google" | "GitHub";

export default function UpgradeUser() {
  const { UpgradeUser, updateUserProfile, setUser } = useAuth();
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [selectedOption, setSelectedOption] = useState<providers>("Email");

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as providers);
  };

  const onSubmit: SubmitHandler<registerSchemaType> = async (
    data: registerSchemaType
  ) => {
    console.table(data);
    toast.promise(
      UpgradeUser({
        provider: "Email",
        data: {
          email: data.email,
          password: data.password,
        },
      }),
      {
        loading: "Loading ...",
        success: (data) =>
          `Your Account Successfully linked with ${data.user.email}`,
        error: (error) => `Error : ${error.code}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    ).then((result) => {
      setUser(result.user);
    })
  };

  const upgradeWithGitHub = async () => {
    toast.promise(
      UpgradeUser({
        provider: "Github",
      }),
      {
        loading: "Loading ...",
        success: (data) =>
          `Your Account Successfully linked with ${data.providerId}`,
        error: (error) => `Error : ${error.code}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    ).then(async (result) => {
      await updateUserProfile({
        displayName: result.user.displayName!,
        profileUrl: result.user.photoURL!
      })
    })
  };

  const upgradeWithGoogle = async () => {
    toast.promise(
      UpgradeUser({
        provider: "Google",
      }),
      {
        loading: "Loading ...",
        success: (data) =>
          `Your Account Successfully linked with ${data.providerId}`,
        error: (error) => `Error : ${error.code}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    ).then(async (result) => {
      await updateUserProfile({
        displayName: result.user.displayName!,
        profileUrl: result.user.photoURL!
      })
    })
  };

  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden '>
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        <Toaster />
        <h1 className='text-3xl font-semibold text-center'>
          Convert to Permanent Account
        </h1>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Select you Provider</span>
          </label>
          <select
            className='select select-primary w-full mb-4'
            onChange={handleOptionChange}
          >
            <option>Select</option>
            <option selected value='Email'>
              Email
            </option>
            <option value='Google'>Google Sign In</option>
            <option value='GitHub'>GitHub Sign In</option>
          </select>
        </div>
        {selectedOption === "Email" && (
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Enter your email address'
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
                placeholder='Password'
                className='w-full input input-bordered'
                {...form("password")}
              />
              {errors.password && (
                <p className='text-xs italic text-red-500 mt-2'>
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div>
              <label className='label'>
                <span className='label-text'>Confirm Password</span>
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                className='w-full input input-bordered'
                {...form("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className='text-xs italic text-red-500 mt-2'>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <div>
              <button className='btn btn-primary btn-block my-4' type='submit'>
                Submit
              </button>
            </div>
          </form>
        )}
        {selectedOption === "Google" && (
          <div>
            <button
              className='btn btn-primary btn-block my-4'
              onClick={upgradeWithGoogle}
              type='button'
            >
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                loading='lazy'
                alt='google logo'
              />
              <span>Continue with Google</span>
            </button>
          </div>
        )}
        {selectedOption === "GitHub" && (
          <div>
            <button
              className='btn btn-primary btn-block my-4'
              onClick={upgradeWithGitHub}
              type='button'
            >
              <img
                className='w-6 h-6'
                src='https://www.svgrepo.com/show/340601/logo-github.svg'
                loading='lazy'
                alt='github logo'
              />
              <span>Continue with GitHub</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
