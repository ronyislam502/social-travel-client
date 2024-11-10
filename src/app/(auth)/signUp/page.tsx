"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import FormikInput from "@/src/components/formik/FormikInput";
import { useSignUpMutation } from "@/src/redux/features/auth/authApi";
import { TError } from "@/src/types/global";

type TSignUp = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  image?: File | null;
};

const initialValues: TSignUp = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  image: null,
};

const SignUpPage = () => {
  const router = useRouter();
  const [signUp] = useSignUpMutation();
  const handleSubmit = async (data: TSignUp) => {
    const toastId = toast.loading("User creating");

    try {
      const signUpInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        image: data.image,
      };

      const formData = new FormData();
      console.log(formData);

      formData.append("data", JSON.stringify(signUpInfo));
      if (data.image) {
        formData.append("image", data.image);
      }
      const res = await signUp(formData).unwrap();

      if (await res.success) {
        router.push("/logIn");
        toast.success("Please sign in", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      const err = error as TError;

      console.log(err);

      toast.error(err.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-950 p-8 m-5 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Registration Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h1>

        {/* Formik Form */}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              {/* Name */}
              <FormikInput label="Name" name="name" />

              {/* Email */}
              <FormikInput label="Email" name="email" type="email" />

              {/* Password */}
              <FormikInput label="Password" name="password" type="password" />

              {/* Phone */}
              <FormikInput label="Phone" name="phone" type="tel" />

              {/* Address */}
              <FormikInput label="Address" name="address" />

              {/* File Input for Avatar */}
              <div className="space-y-1">
                <label
                  className="block font-medium text-gray-700"
                  htmlFor="avatar"
                >
                  Profile Picture
                </label>
                <input
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="avatar"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;

                    setFieldValue("image", file);
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button className="w-full" type="submit">
                Sign up
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/logIn">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
