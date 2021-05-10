import Image from "next/image";
import Link from "next/link";

// Param: image: the image of the post
// Param: href: the link to the individual profile
// Param: name: the display name on the post
// Param: caption: the caption on the post
// These four params will replace all dummy inputs when loading from api

export default function Post({ image, href, name, caption }) {
  return (
    <figure
      className="bg-white flex flex-col items-center flex-1 p-6 sm:min-w-1/2 md:min-w-1/3 m-2 shadow-lg hover:shadow-xl
      transition duration-300 ease-in-out rounded-lg"
    >
      <div className="h-80 w-80 relative ring-2">
        <Image
          src="/dummy.jpg"
          alt="Dummy Image"
          layout="fill" // required
          objectFit="contain" // change to suit your needs
        />
      </div>
      <div className="flex flex-col w-full text-left items-left mt-6">
        <p className="font-bold text-xl">Lightning McQueen</p>
        <p>I am speed.</p>
      </div>
    </figure>
  );
}
