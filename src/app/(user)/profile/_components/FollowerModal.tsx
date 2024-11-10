import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import CustomModal from "@/src/components/ui/CustomModal";
import { TUserFollowing } from "@/src/types";

interface FollowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  followers: TUserFollowing[];
}

const FollowerModal = ({ isOpen, onClose, followers }: FollowerModalProps) => {
  return (
    <CustomModal
      footer={false}
      isOpen={isOpen}
      title="Followers"
      onClose={onClose}
    >
      <div>
        {followers.length >= 0 && (
          <p className="text-center mb-5">No Followers Available</p>
        )}
        {followers?.map((item) => (
          <div key={item?._id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                alt="avatar"
                className="size-[60px] object-cover rounded-full"
                height={60}
                src={item.avatar}
                width={60}
              />
              <Link href={`/profile/${item._id}`}> {item?.name}</Link>
            </div>
            <Button>Follow back</Button>
          </div>
        ))}
      </div>
    </CustomModal>
  );
};

export default FollowerModal;
