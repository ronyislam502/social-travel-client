"use client";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import FormikInput from "@/src/components/formik/FormikInput";
import { useLogInMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { TError } from "@/src/types/global";
import { setUser } from "@/src/redux/features/auth/authSlice";

type TLogin = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [logIn] = useLogInMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (data: TLogin) => {
    const toastId = toast.loading("Login processing");

    try {
      const LoginInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await logIn(LoginInfo).unwrap();
      console.log("data", res);

      dispatch(setUser({ user: res?.data?.user, token: res.accessToken }));
      localStorage.setItem("token", res.token);
      toast.success("Logged in", { id: toastId, duration: 2000 });
      router.push("/");
    } catch (error) {
      console.log(error);
      const err = error as TError;

      toast.error(err?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-950 p-8 m-5 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Login Header */}
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Please Log In !
        </h1>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email */}
              <FormikInput label="Email" name="email" type="email" />

              {/* Password */}
              <FormikInput label="Password" name="password" type="password" />

              {/* Submit Button */}
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                type="submit"
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/signUp">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-5">
          Forget your password?{" "}
          <Link className="text-blue-500 hover:underline" href="/recover">
            Recover now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
