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
      className="bg-white flex flex-col flex-1 p-6 m-2 shadow-lg hover:shadow-xl
      transition duration-300 ease-in-out rounded-lg w-full"
    >
      <img className="w-full h-80 object-contain ring-2 mb-4" src="/dummy.jpg" />
      <p className="font-bold text-xl">Lightning McQueen</p>
      <p>I am speed.</p>
    </figure>
  );
}
