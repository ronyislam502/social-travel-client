import { FaAnglesDown } from "react-icons/fa6";
import { toast } from "sonner";

import { TVoteProps } from "./UpVote";

import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { TUserDetails } from "@/src/types";
import { useDownVotesPostMutation } from "@/src/redux/features/vote/voteApi";
import { TError } from "@/src/types/global";

const DownVote = ({ votes, id }: TVoteProps) => {
  const user = useAppSelector(selectCurrentUser) as unknown as TUserDetails;
  const [createVote] = useDownVotesPostMutation();

  const hasVoted = user ? votes?.includes(user?._id) : false;

  const handleDownVote = async (id: string) => {
    if (!user) {
      toast.error("You need to log in first!");

      return;
    }
    const toastId = toast.loading("Down vote  posting");

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
      className="flex items-center justify-center w-full gap-2 p-2"
      onClick={() => handleDownVote(id)}
    >
      <FaAnglesDown className={`${hasVoted ? "text-primary" : ""}`} />{" "}
      {votes?.length}
    </button>
  );
};

export default DownVote;
