import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/icons/icons";

export default function Footer() {
  

  return (
    <footer className="mx-auto w-full max-w-screen-2xl">
      <div
        className="flex md:flex-row flex-col justify-between
      text-gray-500 dark:text-gray-400 border-t-2 border-gray-200 dark:border-gray-800 py-16 mx-6"
      >
        <p>
          Built with ❤️ by the Auto Exposure Team. <br /> By car enthusiasts,
          for car enthusiasts.
        </p>

        
      </div>
    </footer>
  );
}
