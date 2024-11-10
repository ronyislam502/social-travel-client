"use client";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Suspense, useState } from "react";

import Cover from "./Cover";
import FollowingModal from "./FollowingModal";
import FollowerModal from "./FollowerModal";

import Loader from "@/src/components/ui/Loader";
import ErrorBoundary from "@/src/components/ErrorBoundary";
import PostCard from "@/src/components/ui/PostCard";
import { formatDateTime } from "@/src/utils/date";
import Subscribe from "@/src/components/action/Subscribe";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { TUserDetails } from "@/src/types";
import { useGetUserPostsQuery } from "@/src/redux/features/post/postApi";

const UserData = () => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser) as unknown as TUserDetails;
  const { data: userPosts } = useGetUserPostsQuery(user?._id);
  const userAllPosts = userPosts?.data;

  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<Loader />}>
          <Cover userDetails={user} />
        </Suspense>
      </ErrorBoundary>
      <div className="lg:mt-[125px] lg:px-10 lg:py-5 px-4 py-4 space-y-5">
        <div className="flex items-center gap-5">
          <p className="text-2xl font-bold">{user?.name}</p>
          {user?.status === "premium" ? (
            <RiVerifiedBadgeFill className="text-secondary text-xl" />
          ) : (
            <Subscribe
              className="flex items-center gap-2 border rounded-xl px-3"
              title={
                <>
                  <RiVerifiedBadgeFill />
                  Get verified
                </>
              }
            />
          )}
        </div>
        <p>{user?.address}</p>
        <p>Joined {formatDateTime(user?.createdAt)}</p>
        <div className="flex items-center gap-5">
          <button onClick={() => setIsFollowingModalOpen(true)}>
            {user?.following.length} Following
          </button>
          <button onClick={() => setIsFollowerModalOpen(true)}>
            {user?.followers.length} Followers
          </button>
        </div>
        <hr />
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<Loader />}>
            <div className="lg:w-1/2 lg:mx-auto">
              <p className="text-xl font-bold mb-5">All posts</p>
              {userPosts?.data.length > 0 ? (
                <PostCard data={userAllPosts} editingSystem={true} />
              ) : (
                <p className="text-lg font-semibold text-center">
                  No posts available
                </p>
              )}
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
      <FollowingModal
        following={user?.following || []}
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
      />

      <FollowerModal
        followers={user?.followers || []}
        isOpen={isFollowerModalOpen}
        onClose={() => setIsFollowerModalOpen(false)}
      />
    </div>
  );
};

export default UserData;
