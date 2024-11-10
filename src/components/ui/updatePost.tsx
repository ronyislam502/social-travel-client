"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import { ErrorMessage, Form, Formik } from "formik";

import FormikInput from "../formik/FormikInput";
import {
  categoryOptions,
  createPostValidationSchema,
  tagOptions,
} from "../module/articles/create-post/CustomEditor";
import Dropdown from "../formik/Dropdown";
import TextEditor from "../formik/TextEditor";

import CustomModal from "./CustomModal";

import { TPost } from "@/src/types";
import { useUpdatePostMutation } from "@/src/redux/features/post/postApi";
import { TError } from "@/src/types/global";

type TProps = {
  postDetails: TPost;
};

type TFormValues = {
  title: string;
  content: string;
  tag: string;
  category: string;
  image: File | string;
};

const UpdatePost = ({ postDetails }: TProps) => {
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [updatePost] = useUpdatePostMutation();

  const initialValues: TFormValues = {
    title: postDetails.title,
    content: postDetails.content,
    tag: postDetails.tags,
    category: postDetails.category,
    image: postDetails?.cover || postDetails?.images[0],
  };

  const handleSubmit = async (values: TFormValues) => {
    const toastId = toast.loading("Post creating!");

    setIsEditPostModalOpen(false);
    try {
      const formData = new FormData();
      const data = {
        title: values.title,
        content: values.content,
        tags: values.tag,
        category: values.category,
      };

      formData.append("data", JSON.stringify(data));
      if (values.image) {
        formData.append("image", values.image);
      }
      const res = await updatePost({
        id: postDetails._id,
        data: formData,
      }).unwrap();

      if (await res.success) {
        toast.success("Post created successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <Button
        isIconOnly
        className=""
        onClick={() => {
          setIsEditPostModalOpen(true);
        }}
      >
        <FiEdit3 className="text-lg" />
      </Button>
      <CustomModal
        footer={false}
        isOpen={isEditPostModalOpen}
        size="4xl"
        title="Update Post"
        onClose={() => setIsEditPostModalOpen(false)}
      >
        <div className="pb-4 space-y-4">
          <Formik
            initialValues={initialValues}
            validationSchema={createPostValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => {
              return (
                <Form className="space-y-5">
                  <FormikInput label="Title" name="title" />
                  <TextEditor setFieldValue={setFieldValue} />

                  <Dropdown label="Tag" name="tag" options={tagOptions} />
                  <Dropdown
                    label="Category"
                    name="category"
                    options={categoryOptions}
                  />
                  <div className="space-y-1">
                    <label className="block font-medium" htmlFor="image">
                      Upload cover photo <br />
                      <span className="text-sm">
                        (Leave this if you don&apos;t want to update cover)
                      </span>
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none mt-3"
                      id="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;

                        setFieldValue("image", file);
                      }}
                    />
                    <ErrorMessage
                      className="text-danger"
                      component="p"
                      name="image"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Post</Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </CustomModal>
    </div>
  );
};

export default UpdatePost;
