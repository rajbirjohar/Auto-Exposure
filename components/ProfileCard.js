export default function ProfileCarD() {
  return (
    <figure
      className="bg-white flex flex-col flex-initial p-6 m-2 shadow-lg hover:shadow-xl
        transition duration-300 ease-in-out rounded-lg w-full lg:w-96 h-full"
    >
      <img
        className="w-36 h-36 rounded-full ring-2 mb-4"
        src="/dummy.jpg"
        alt="dummy image"
      />
      <h1>Lightning McQueen</h1>
      <p>
        Montgomery McQueen, more commonly known as Lightning McQueen, is an
        anthropomorphic stock car in the animated Pixar film Cars (2006), its
        sequels Cars 2 (2011), Cars 3 (2017), and TV shorts known as Cars Toons.
        The character is not named after actor and race driver Steve McQueen,
        but after Pixar animator Glenn McQueen who died in 2002.
      </p>
    </figure>
  );
}
