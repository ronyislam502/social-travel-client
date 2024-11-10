"use client";

import Image from "next/image";
import { useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import UpdateProfile from "./UpdateProfile";

import CustomModal from "@/src/components/ui/CustomModal";
import { TUserDetails } from "@/src/types";
import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";
import { TError } from "@/src/types/global";
type TFormValues = {
  avatar: File | null;
};
type TProps = {
  userDetails: TUserDetails;
};

const initialValues: TFormValues = {
  avatar: null,
};

const Cover = ({ userDetails }: TProps) => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);
  const [updateUserPhoto] = useUpdateUserMutation();
  const handleSubmit = async (values: TFormValues) => {
    const toastId = toast.loading("Photo Changing please wait!");
    const formData = new FormData();

    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    const userData = {
      name: userDetails.name,
    };

    formData.append("data", JSON.stringify(userData));
    setIsChangePhotoModalOpen(false);
    try {
      const res = await updateUserPhoto({
        id: userDetails._id,
        data: formData,
      }).unwrap();

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
    <div className="relative">
      <Image
        alt="cover"
        className="w-full h-[400px] object-cover"
        height={500}
        src={"/bg/bg-3.jpg"}
        width={1000}
      />
      <Image
        alt="profile"
        className="object-cover rounded-full size-[250px] border-2 absolute lg:-bottom-[125px] lg:left-10 left-20 bottom-20 cursor-pointer"
        height={300}
        src={userDetails?.avatar}
        title="Change photo"
        width={300}
        onClick={() => setIsChangePhotoModalOpen(true)}
      />
      {user?.id === userDetails?._id && (
        <UpdateProfile userData={userDetails} />
      )}
      <CustomModal
        footer={false}
        isOpen={isChangePhotoModalOpen}
        title="Change Profile Photo"
        onClose={() => setIsChangePhotoModalOpen(false)}
      >
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
              <Form className="">
                <div className="space-y-5 ">
                  <div className="space-y-1">
                    <label
                      className="block font-medium text-gray-700 dark:text-slate-100"
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

                        setFieldValue("avatar", file);
                      }}
                    />
                  </div>
                  <Button type="submit">Update</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default Cover;
