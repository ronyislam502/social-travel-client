"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

import CustomModal from "./CustomModal";

import { useDeletePostMutation } from "@/src/redux/features/post/postApi";
import { TError } from "@/src/types/global";

const DeletePost = ({ id }: { id: string }) => {
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);

  const [deleteNow] = useDeletePostMutation();

  const handleSubmit = async () => {
    const toastId = toast.loading("Post deleting please wait!");

    try {
      const res = await deleteNow(id).unwrap();

      setIsDeletePostModalOpen(true);
      toast.success(res.message, { id: toastId, duration: 2000 });
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
    <div>
      <Button
        isIconOnly
        className=""
        onClick={() => {
          setIsDeletePostModalOpen(true);
        }}
      >
        <MdDeleteOutline className="text-lg" />
      </Button>
      <CustomModal
        footer={false}
        isOpen={isDeletePostModalOpen}
        title="Delete Post"
        onClose={() => setIsDeletePostModalOpen(false)}
      >
        <div className="flex flex-col justify-center items-center pb-4 space-y-4">
          <p>Are you sure?</p>
          <Button
            className=""
            onClick={() => {
              handleSubmit();
            }}
          >
            Deelete
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default DeletePost;
