"use client";

import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import { ErrorMessage, Form, Formik } from "formik";

import { useCreatePostMutation } from "@/src/redux/features/post/postApi";
import FormikInput from "@/src/components/formik/FormikInput";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { TError } from "@/src/types/global";
import Dropdown from "@/src/components/formik/Dropdown";

export const tagOptions = [
  {
    value: "regular",
    name: "Regular",
  },
  {
    value: "premium",
    name: "Premium",
  },
];
export const categoryOptions = [
  { value: "adventure", name: "Adventure" },
  { value: "eco-tourism", name: "Eco-tourism" },
  { value: "luxury", name: "Luxury" },
  { value: "wellness", name: "Wellness" },
  { value: "cultural", name: "Cultural" },
  { value: "culinary", name: "Culinary" },
  { value: "historical", name: "Historical" },
  { value: "beach", name: "Beach" },
  { value: "mountain", name: "Mountain" },
  { value: "road trip", name: "Road Trip" },
  { value: "travel", name: "Travel" },
];
const initialValues: TFormValues = {
  title: "",
  content: "",
  tag: "regular", // Default tag
  category: "travel", // Default category
  image: null,
};

export const createPostValidationSchema = Yup.object<TFormValues>({
  title: Yup.string()
    .required("Title is required")
    .test("min-words", "Title must have at least 3 words", (value) => {
      return value ? value.trim().split(/\s+/).length >= 3 : false;
    }),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().required("You must upload cover image"),
});

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Custom toolbar configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"], // text formatting
    [{ list: "ordered" }, { list: "bullet" }], // lists
    ["link", "image"], // add link and image
    [{ align: [] }],
    ["clean"], // remove formatting
  ],
};

type TProps = {
  authorId: string;
  onClose: () => void;
};
type TFormValues = {
  title: string;
  content: string;
  tag: string;
  category: string;
  image: File | null;
};

// Main CustomEditor component
const CustomEditor = ({ authorId, onClose }: TProps) => {
  const [content, setContent] = useState("");
  const [createPost] = useCreatePostMutation();

  const user = useAppSelector(selectCurrentUser) as TUser;

  const handleCreatePost = async (values: TFormValues) => {
    const toastId = toast.loading("Post creating!");

    try {
      const formData = new FormData();
      const data = {
        title: values.title,
        content: values.content,
        tags: values.tag,
        category: values.category,
        author: authorId,
      };

      formData.append("data", JSON.stringify(data));
      if (values.image) {
        formData.append("image", values.image);
      }
      const res = await createPost(formData).unwrap();

      if (await res.success) {
        onClose();
        toast.success("Post created successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      onClose();
      const err = error as TError;

      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const filteredTagOptions =
    user?.status !== "premium"
      ? tagOptions.filter((option) => option.value !== "premium")
      : tagOptions;

  return (
    <div className="mb-5">
      <Formik
        initialValues={initialValues}
        validationSchema={createPostValidationSchema}
        onSubmit={handleCreatePost}
      >
        {({ setFieldValue }) => {
          return (
            <Form className="space-y-5">
              <FormikInput label="Title" name="title" />
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={(value) => {
                  setContent(value);
                  setFieldValue("content", value);
                }}
              />
              <ErrorMessage
                className="text-danger"
                component="p"
                name="content"
              />
              <Dropdown label="Tag" name="tag" options={filteredTagOptions} />
              <Dropdown
                label="Category"
                name="category"
                options={categoryOptions}
              />
              <div className="space-y-1">
                <label className="block font-medium" htmlFor="image">
                  Upload cover photo
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none"
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
  );
};

export default CustomEditor;
