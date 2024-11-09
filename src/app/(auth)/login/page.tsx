import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-950 p-8 m-5 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Login Header */}
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Log in to your account
        </h1>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email */}
              <FormikInput name="email" label="Email" type="email" />

              {/* Password */}
              <FormikInput name="password" label="Password" type="password" />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/registration" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-5">
          Forget your password?{" "}
          <Link href="/recover" className="text-blue-500 hover:underline">
            Recover now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
