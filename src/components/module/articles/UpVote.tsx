"use client";

import { toast } from "sonner";
import { FaAnglesUp } from "react-icons/fa6";

import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useUpVotesPostMutation } from "@/src/redux/features/vote/voteApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TError } from "@/src/types/global";

export type TVoteProps = {
  votes: string[];
  id: string;
};
const UpVote = ({ votes, id }: TVoteProps) => {
  const user = useAppSelector(selectCurrentUser) as unknown as TUser;
  const [createVote] = useUpVotesPostMutation();

  // Check if the current user has already upvoted
  const hasVoted = user ? votes?.includes(user?.id) : false;

  const handleUpVote = async (id: string) => {
    if (!user) {
      toast.error("You need to log in first!");

      return;
    }
    const toastId = toast.loading("UpVote  posting");

    try {
      const res = await createVote(id).unwrap();

      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <button
      className="flex items-center justify-center gap-2 p-2 w-full"
      onClick={() => handleUpVote(id)}
    >
      <FaAnglesUp className={`${hasVoted ? "text-primary" : ""}`} />{" "}
      {votes?.length}
    </button>
  );
};

export default UpVote;
