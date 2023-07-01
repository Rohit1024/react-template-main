import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { profileSchema, profileSchemaType } from "../lib/validations/auth";
import { useAuth } from "../contexts/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const { user, resetPassword, updateUserProfile } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<profileSchemaType> = async (
    data: profileSchemaType
  ) => {
    console.table(data);
    toast.promise(updateUserProfile({ displayName: data.displayName }), {
      loading: "Loading ...",
      success: () => `Profile Details Updated Successfully`,
      error: (error) => `Error : ${error.code}`,
    },{
      success : {
        duration: 5000
      }
    });
  };

  const handelReset = async () => {
    toast.promise(resetPassword(user?.email || ""), {
      loading: "Loading ...",
      success: () => `We have Sent an Password Reset Link to your Email`,
      error: (error) => `Error : ${error.code}`,
    }, {
      success : {
        duration: 5000
      }
    });
  };
  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden '>
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        <Toaster />
        <h1 className='text-3xl font-semibold text-center'>User Profile</h1>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='label'>
              <span className='label-text'>Display Name</span>
              <button
                className='btn btn-xs'
                onClick={() => setDisabled(!disabled)}
                type="button"
              >
                {disabled ? <p>Enable Fields</p> : <p>Disable Fields</p>}
              </button>
            </label>
            <input
              type='text'
              placeholder={user?.displayName || ""}
              className='input input-bordered w-full'
              {...form("displayName")}
              disabled={disabled}
            />
            {errors.displayName && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.displayName?.message}
              </p>
            )}
          </div>
          <div>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder={user?.email || ""}
              className='w-full input input-bordered'
              {...form("email")}
              disabled={disabled}
            />
            {errors.email && (
              <p className='text-xs italic text-red-500 mt-2'>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <button className='btn btn-primary btn-block my-4' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <div className='divider'></div>
        <div className='flex justify-around'>
          <button className='btn btn-warning' onClick={handelReset}>
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/375092/reset-password.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Reset Password</span>
          </button>
          <Link to={"/upgrade-user"} className='btn btn-secondary'>
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/505013/tracker-control.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Upgrade User</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
