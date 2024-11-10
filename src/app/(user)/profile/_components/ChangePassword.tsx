import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import { toast } from "sonner";

import FormikInput from "@/src/components/formik/FormikInput";
import { TError } from "@/src/types/global";
const ChangePassword = () => {
  const [changePass] = useChangePasswordMutation();
  const handleSubmit = async (values: { password: string }) => {
    const toastId = toast.loading("Password Changing please wait!");

    try {
      const res = await changePass(values).unwrap();

      console.log("res:", res);
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      const err = error as TError;

      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <Formik initialValues={{ password: "" }} onSubmit={handleSubmit}>
        <Form className="">
          <div className="space-y-5 ">
            <FormikInput label="Password" name="password" />
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
