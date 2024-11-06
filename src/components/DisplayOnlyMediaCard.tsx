import Image from "next/image";
import { FaClockRotateLeft, FaRegHeart } from "react-icons/fa6";

export default function DisplayOnlyMediaCard({
  posterPath,
}: {
  posterPath: string;
}) {
  return (
    <>
      <div className="relative w-[180px] rounded-lg">
        <div className="absolute left-0 top-0 rounded-br-lg rounded-tl-lg bg-black text-white opacity-70 hover:opacity-100">
          <span className="mx-2 mb-2 mt-2 block">
            <FaClockRotateLeft size={20} />
          </span>
        </div>
        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-black text-white opacity-70 hover:opacity-100">
          <span className="m-2 mx-2 mb-2 block">
            <FaRegHeart size={20} />
          </span>
        </div>
        <div className="flex h-[270px] w-[180px] items-center overflow-hidden rounded-lg border-2 border-black bg-black">
          <Image
            src={posterPath}
            alt=""
            width={180}
            height={270}
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
