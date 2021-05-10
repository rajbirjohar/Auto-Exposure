export default function PostLoad() {
  return (
    <figure
      className="bg-white flex flex-col items-center flex-1 p-6 sm:min-w-1/2 md:min-w-1/3 m-2 shadow-lg hover:shadow-xl
      transition duration-300 ease-in-out rounded-lg animate-pulse"
    >
      <div
        className="relative h-80 w-80
       bg-gray-300 rounded-md"
      ></div>
      <div className="flex flex-col w-full text-left items-left mt-6">
        <div className="bg-gray-300 my-1 h-6 w-1/2 rounded-md"></div>
        <div className="bg-gray-300 my-1 h-6 w-5/6 rounded-md"></div>
      </div>
    </figure>
  );
}
