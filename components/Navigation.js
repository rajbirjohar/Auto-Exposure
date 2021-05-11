import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky-nav bg-black bg-opacity-80 text-gray-50 flex justify-end py-4 px-12 w-full">
      <ul className="flex space-x-10">
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/feed">Feed</Link>
        <Link href="/login">Log In</Link>
      </ul>
    </nav>
  );
}
