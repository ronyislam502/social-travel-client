"use client";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useFollowUserMutation } from "@/src/redux/features/follower/followerApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TPostAuthor } from "@/src/types";
import { TError } from "@/src/types/global";

type TProps = {
  author: TPostAuthor;
  className?: string;
};

const Follow = ({ author, className }: TProps) => {
  const user = useAppSelector(selectCurrentUser) as TUser | null;
  const isFollowing = user ? author?.followers?.includes(user.id) : false;
  const [followNow] = useFollowUserMutation();

  const handleFollow = async () => {
    if (!user) {
      toast.error("You need to log in to follow this author.");

      return;
    }
    const toastId = toast.loading("Processing follow...");
    const data = {
      userId: user.id,
      targetedId: author._id,
    };

    try {
      const res = await followNow(data).unwrap();

      toast.success(res.data, { id: toastId, duration: 2000 });
    } catch (error) {
      console.error("error:", error);
      const err = error as TError;

      toast.error(err.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      {user && user.id !== author._id && (
        <Button className={className} onClick={handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default Follow;
