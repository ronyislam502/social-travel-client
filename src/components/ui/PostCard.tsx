"use client";
import Image from "next/image";
import { FaRegCommentAlt } from "react-icons/fa";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useEffect } from "react";
import AOS from "aos";
import DownVote from "../module/articles/DownVote";
import UpVote from "../module/articles/UpVote";

import { formatDateTime } from "@/src/utils/date";
import { TPost } from "@/src/types";
import DeletePost from "./DeletePost";
import Follow from "../action/Follow";
import UpdatePost from "./updatePost";

type TPostCard = {
  data: TPost[];
  profile?: boolean;
  editingSystem?: boolean;
};

const PostCard = ({ data, editingSystem = false }: TPostCard) => {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: false, // Whether animation should happen only once
      mirror: true, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        {data?.length <= 0 && (
          <p className="text-xl font-medium text-center">No post available</p>
        )}
        {data?.map((item: TPost) => {
          return (
            <div
              key={item._id}
              className=" bg-white dark:bg-dark-100 rounded-xl h-fit"
              data-aos="fade-up"
            >
              {/* header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3 relative">
                  <Image
                    alt="author"
                    className="size-[50px] object-cover rounded-full"
                    height={80}
                    src={item?.author?.avatar}
                    width={80}
                  />
                  {item?.author?.status === "premium" && (
                    <RiVerifiedBadgeFill className="text-secondary text-xl absolute top-0" />
                  )}
                  <div className="flex flex-col justify-between">
                    <Link
                      className="text-lg font-semibold"
                      href={`/profile/${item.author._id}`}
                    >
                      {item.author.name}
                    </Link>
                    <p>{formatDateTime(item.createdAt)}</p>
                  </div>
                </div>
                {editingSystem ? (
                  <div className="flex items-center gap-3">
                    <DeletePost id={item._id} />
                    <UpdatePost postDetails={item} />
                  </div>
                ) : (
                  <Follow
                    author={item.author}
                    className="custom-btn-secondary"
                  />
                )}
              </div>
              <Link className="relative" href={`/articles/${item._id}`}>
                {item?.cover ? (
                  <Image
                    alt="cover"
                    className="object-cover w-full h-[400px]"
                    height={400}
                    src={item?.cover}
                    width={600}
                  />
                ) : (
                  item?.images && (
                    <Image
                      alt="cover"
                      className="object-cover w-full h-[260px]"
                      height={300}
                      src={item?.images[0]}
                      width={400}
                    />
                  )
                )}
                {item.tags === "premium" && (
                  <p className="absolute top-2 right-2">
                    <RiVerifiedBadgeFill className="text-primary-400 text-2xl" />
                  </p>
                )}
              </Link>
              <div className="p-4 space-y-2">
                <Link
                  className="text-lg font-semibold"
                  href={`/articles/${item._id}`}
                >
                  {item.title}
                </Link>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content.slice(0, 80) + "...",
                  }}
                />
                {/* <p>{item.content.slice(0, 80)}...</p> */}
              </div>
              <div className="flex items-center justify-between border-t h-[50px]">
                <div className="w-full flex justify-center">
                  <UpVote id={item._id} votes={item.upVotes} />
                </div>
                <div className="w-full flex justify-center">
                  <DownVote id={item._id} votes={item.downVotes} />
                </div>
                <p className="flex items-center gap-2 w-full p-2 justify-center">
                  <FaRegCommentAlt /> {item.commentsCount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostCard;
