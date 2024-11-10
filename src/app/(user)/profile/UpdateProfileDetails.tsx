import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "sonner";

import FormikInput from "@/src/components/formik/FormikInput";
import { TError } from "@/src/types/global";
import { TUserDetails } from "@/src/types";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";

interface TFormValues {
  name: string;
  phone: string;
  address: string;
}
type TProps = {
  userData: TUserDetails;
};

const UpdateProfileDetails = ({ userData }: TProps) => {
  const [updateUser] = useUpdateUserMutation();

  const initialValues = {
    name: userData?.name || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
  };

  const handleSubmit = async (values: TFormValues) => {
    const toastId = toast.loading("Profile updating in progress!");
    const formData = new FormData();

    // Append stringified values to FormData
    formData.append(
      "data",
      JSON.stringify({
        name: values.name,
        phone: values.phone,
        address: values.address,
      })
    );
    try {
      const res = await updateUser({
        id: userData._id,
        data: formData,
      }).unwrap();

      console.log("res:", res);
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      const err = error as TError;

      toast.error(err.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="">
        <div className="space-y-5">
          <FormikInput label="Name" name="name" />
          <FormikInput label="Address" name="address" />
          <FormikInput label="Phone" name="phone" />
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default UpdateProfileDetails;
