"use client";

import { ReactNode } from "react";
import { toast } from "sonner";

import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useSubscribeMutation } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { TPost } from "@/src/types";
import { useGetUserPostsQuery } from "@/src/redux/features/post/postApi";
import { TError } from "@/src/types/global";

const Subscribe = ({
  title,
  className,
}: {
  title: ReactNode;
  className?: string;
}) => {
  const [makePayment] = useSubscribeMutation();
  const user = useAppSelector(selectCurrentUser) as unknown as TUser;

  // Check if the user is available before making the query
  const { data: userPosts } = useGetUserPostsQuery(user?.email, {
    skip: !user, // Skips query if user is not available
  });

  // Safely access user posts and calculate totalUpVotes
  const userAllPosts = userPosts?.data || [];
  const totalUpVotes = userAllPosts.reduce(
    (acc: number, post: TPost) => acc + post.upVotes.length,
    0
  );

  const handleSubscribe = async () => {
    // Check if user or their posts are unavailable before proceeding
    if (!user) {
      toast.error("User not found. Please log in to subscribe.");

      return;
    }

    if (totalUpVotes <= 0) {
      toast.warning("Minimum one upvote needed to subscribe.");

      return;
    }

    const toastId = toast.loading("Payment process is starting...");
    const data = {
      amount: 20,
    };

    try {
      const res = await makePayment(data).unwrap();

      if (res?.message === "Booking successful" && res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        toast.error("Payment URL not found", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const err = error as TError;

      toast.error(err.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <button className={className} onClick={handleSubscribe}>
        {title}
      </button>
    </div>
  );
};

export default Subscribe;
