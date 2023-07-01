import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "../lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

export default function Register() {
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { user, register } = useAuth();

  const onSubmit: SubmitHandler<registerSchemaType> = async (
    data: registerSchemaType
  ) => {
    console.table(data);
    toast
      .promise(register(data.email, data.password), {
        loading: "Loading ...",
        success: (data) =>
          `Registered with : ${data.user.email} Successfully !`,
        error: (error) => `Error : ${error.code}`,
      })
      .then(() => {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      });
  };

  useEffect(() => {
    if(user) navigate("/")
  }, [user, navigate]);

  return (
    <div className='relative flex flex-col justify-center h-screen'>
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        <Toaster />
        <h1 className='text-3xl font-semibold text-center'>Register</h1>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
