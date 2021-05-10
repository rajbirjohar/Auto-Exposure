export default function PostLoad() {
  return (
    <figure
      className="bg-white flex flex-col flex-1 p-6 sm:min-w-1/2 md:min-w-1/3 m-2 shadow-lg hover:shadow-xl
      transition duration-300 ease-in-out rounded-lg animate-pulse"
    >
      <div
        className="relative h-80 w-80
       bg-gray-300 rounded-md"
      ></div>
      <div className="text-left">
        <div className="bg-gray-300 my-2 mt-6 h-6 w-1/2 rounded-md"></div>
        <div className="bg-gray-300 my-2 h-6 w-5/6 rounded-md"></div>
      </div>
    </figure>
  );
}
