import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import UpdateProfileDetails from "../UpdateProfileDetails";
import ChangePassword from "../ChangePassword";

import { TUserDetails } from "@/src/types";
import CustomModal from "@/src/components/ui/CustomModal";
import CustomTab from "@/src/components/ui/CustomTab";

type TProps = {
  userData: TUserDetails;
};

const UpdateProfile = ({ userData }: TProps) => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const tabs = [
    {
      id: "details",
      label: "Edit details",
      content: <UpdateProfileDetails userData={userData} />,
    },
    {
      id: "password",
      label: "Change password",
      content: <ChangePassword />,
    },
  ];

  return (
    <div>
      <button
        className="absolute right-5 bottom-3 flex items-center gap-2 font-semibold border px-3 rounded-full dark:bg-slate-800 text-white"
        onClick={() => setIsEditProfileModalOpen(true)}
      >
        <FaRegEdit />
        Edit profile
      </button>
      <CustomModal
        footer={false}
        isOpen={isEditProfileModalOpen}
        title="Edit profile"
        onClose={() => setIsEditProfileModalOpen(false)}
      >
        <div className="">
          <CustomTab tabs={tabs} />
        </div>
      </CustomModal>
    </div>
  );
};

export default UpdateProfile;
