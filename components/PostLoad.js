export default function PostLoad() {
  return (
    <figure
      className="bg-white flex flex-col md:items-center flex-1 p-6 w-full m-2 shadow-lg hover:shadow-xl
      transition duration-300 ease-in-out rounded-lg animate-pulse"
    >
      <div className="min-w-full h-80 bg-gray-300 rounded-md"></div>
      <div className="flex flex-col w-full mt-4">
        <div className="bg-gray-300 my-1 h-6 w-1/2 rounded-md"></div>
        <div className="bg-gray-300 my-1 h-6 w-5/6 rounded-md"></div>
      </div>
    </figure>
  );
}
