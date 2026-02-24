"use client";
import { UserButton, UserAvatar, useAuth, useUser } from "@clerk/nextjs";
import React from "react";

const Headers = () => {
  const { user } = useUser();
  return (
    <>
      <div className="w-full h-[5vh] bg-gray-900 text-[#F6F6F7]  flex justify-between items-center px-5 ">
        {/* logo */}
        <span className="text-sm uppercase font-medium font-poppins">
          Talk2Github
        </span>

        <span className="flex justify-center items-center text=sm">
          <UserButton />
        </span>
      </div>
    </>
  );
};

export default Headers;
