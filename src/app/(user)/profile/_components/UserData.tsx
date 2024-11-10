"use client";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Suspense, useState } from "react";

import Loader from "@/src/components/ui/Loader";
import ErrorBoundary from "@/src/components/ErrorBoundary";

const UserData = () => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<Loader />}>
          <Cover userDetails={userDetails} />
        </Suspense>
      </ErrorBoundary>
      <div className="lg:mt-[125px] lg:px-10 lg:py-5 px-4 py-4 space-y-5">
        <div className="flex items-center gap-5">
          <p className="text-2xl font-bold">{userDetails?.name}</p>
          {userDetails?.status === "premium" ? (
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
        <p>{userDetails?.address}</p>
        <p>Joined {formatDateTime(userDetails?.createdAt)}</p>
        <div className="flex items-center gap-5">
          <button onClick={() => setIsFollowingModalOpen(true)}>
            {userDetails?.following.length} Following
          </button>
          <button onClick={() => setIsFollowerModalOpen(true)}>
            {userDetails?.followers.length} Followers
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
        following={userDetails?.following || []}
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
      />

      <FollowerModal
        followers={userDetails?.followers || []}
        isOpen={isFollowerModalOpen}
        onClose={() => setIsFollowerModalOpen(false)}
      />
    </div>
  );
};

export default UserData;
