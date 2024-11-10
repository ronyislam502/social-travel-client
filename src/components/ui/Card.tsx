import Image from "next/image";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegCommentAlt } from "react-icons/fa";

import UpVote from "../module/articles/UpVote";
import DownVote from "../module/articles/DownVote";
import Follow from "../action/Follow";

import { formatDateTime } from "@/src/utils/date";
import { TPost } from "@/src/types";

type TProps = {
  blog: TPost;
  profile?: boolean;
};

const Card = ({ blog, profile }: TProps) => {
  return (
    <div key={blog._id} className=" bg-slate-100 dark:bg-dark rounded-xl h-fit">
      {!profile && (
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              alt="author"
              className="size-[50px] object-cover rounded-full"
              height={80}
              src={blog?.author?.avatar}
              width={80}
            />
            <div className="flex flex-col justify-between">
              <p className="text-lg font-semibold">{blog.author.name}</p>
              <p>{formatDateTime(blog.createdAt)}</p>
            </div>
          </div>
          <Follow author={blog.author} />
        </div>
      )}
      <Link className="relative" href={`/articles/${blog._id}`}>
        <Image
          alt="banner"
          className="object-cover w-full h-[260px]"
          height={300}
          src={blog.images[0]}
          width={400}
        />
        {blog.tags === "premium" && (
          <p className="absolute top-1 right-2">
            <RiVerifiedBadgeFill className="text-primary-400" />
          </p>
        )}
      </Link>
      <div className="p-4">
        <Link className="text-lg font-semibold" href={`/articles/${blog._id}`}>
          {blog.title}
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content.slice(0, 80) + "...",
          }}
        />
        {/* <p>{item.content.slice(0, 80)}...</p> */}
      </div>
      <div className="flex items-center justify-between border-t h-[50px]">
        <div className="w-full flex justify-center">
          <UpVote id={blog._id} votes={blog.upVotes} />
        </div>
        <div className="w-full flex justify-center">
          <DownVote id={blog._id} votes={blog.downVotes} />
        </div>
        <p className="flex items-center gap-2 w-full p-2 justify-center">
          <FaRegCommentAlt /> {blog.commentsCount}
        </p>
      </div>
    </div>
  );
};

export default Card;