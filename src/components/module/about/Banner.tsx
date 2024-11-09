import { Button } from "@nextui-org/button";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-y-10 lg:py-10 py-5 items-center">
      <div className="lg:w-[50%] space-y-5">
        <h1 className="text-5xl font-bold">
          Travel the world like never before and get better taste
        </h1>
        <h2 className="text-xl font-semibold">
          Discover hidden gems, unforgettable experiences, and insider tips from
          around the globe.
        </h2>
        <Button className="custom-btn" radius="sm">
          Explore Articles
        </Button>
        <h3 className="font-medium">
          Connect with active travelers and gain real-time tips, advice, and
          insights from a global community.
        </h3>
      </div>
      <div className="lg:w-[50%]">
        <div className="space-y-5">
          <div className="flex justify-end">
            <Image
              alt="banner"
              className="rounded-2xl lg:w-[350px] w-full h-full object-cover"
              height={400}
              src="https://i.postimg.cc/pVn7mBzy/b1.png"
              width={400}
            />
          </div>
          <div className="">
            <Image
              alt="banner"
              className="rounded-2xl lg:w-[350px] w-full h-full object-cover"
              height={300}
              src="https://i.postimg.cc/7ZqQQ8cT/b3.webp"
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
