import { SubmitHandler, useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  forgotPasswordSchemaType,
} from "../lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Toaster, toast } from "react-hot-toast";

export default function ForgetPassword() {
  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const onSubmit: SubmitHandler<forgotPasswordSchemaType> = async (
    data: forgotPasswordSchemaType
  ) => {
    console.table(data);
    toast
      .promise(resetPassword(data.email), {
        loading: "Loading ...",
        success: () => `We have Sent an Password Reset Link to your Email`,
        error: (error) => `Error : ${error.code}`,
      })
      .then(() => {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      });
  };

  return (
    <div className='relative flex flex-col justify-center h-screen'>
      <div className='w-1/3 p-6 m-auto card ring-2 shadow-xl bg-base-300'>
        <Toaster />
        <h1 className='text-3xl font-semibold text-center'>
          Forget Password ?
        </h1>
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
            <button className='btn btn-primary btn-block my-4' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
