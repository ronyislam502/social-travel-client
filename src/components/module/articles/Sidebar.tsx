"use client";
import Link from "next/link";
import { FaAnglesUp } from "react-icons/fa6";
import { LiaUserEditSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useGetPopularPostsQuery } from "@/src/redux/features/post/postApi";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { TUserDetails } from "@/src/types";

const Sidebar = () => {
  const { data, isLoading } = useGetPopularPostsQuery("");
  const user = useAppSelector(selectCurrentUser) as unknown as TUserDetails;

  const [isClient, setIsClient] = useState(false);

  // Ensure client-only rendering happens
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="sticky top-[84px]">
      <div>
        <div className="space-y-2 border rounded-xl p-4 bg-secondary-700 dark:bg-dark-100">
          {isClient && (user?.status === "basic" || !user) ? (
            <div className="">
              <p className="text-2xl font-bold text-secondary">
                Subscribe to Premium
              </p>
              <p className="font-medium mt-2 mb-3">
                Subscribe to unlock new features and if eligible, receive a
                share of ads revenue.
              </p>
              <Subscrib
                className="rounded-xl px-4 py-2 bg-primary text-white hover:bg-primary-100 font-semibold"
                title="Subscribe"
              />
            </div>
          ) : (
            isClient &&
            user?.status === "premium" && (
              <div className="bg-secondary-700 dark:bg-dark-100">
                <p className="text-2xl font-bold text-secondary">
                  Welcome Premium Member!
                </p>
                <p className="font-medium">
                  Enjoy all the exclusive features and maximize your experience
                  with ad revenue sharing!
                </p>
              </div>
            )
          )}
        </div>
        <div className="border p-4 rounded-xl mt-4 bg-secondary-700 dark:bg-dark-100">
          <p className="text-xl font-bold mb-2 text-secondary">
            Popular Posts:
          </p>
          <div className="space-y-3">
            {isLoading ? (
              <SidebarLoading />
            ) : (
              data?.data?.map((item: TPopularPost) => {
                return (
                  <div key={item?._id}>
                    <Link
                      className="font-semibold"
                      href={`/articles/${item._id}`}
                    >
                      {item?.title?.slice(0, 40)}...
                    </Link>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.content?.slice(0, 70) + "...",
                      }}
                    />
                    {/* <p>{item.content.slice(0, 70)}...</p> */}
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2">
                        <FaAnglesUp /> {item?.upVotes?.length}
                      </p>
                      <Link
                        className="flex items-center gap-2"
                        href={`/profile/${item?.author?._id}`}
                      >
                        <LiaUserEditSolid className="text-xl" />{" "}
                        {item?.author?.name}
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
