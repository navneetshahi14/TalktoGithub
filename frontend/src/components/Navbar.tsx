'use client'
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserAvatar,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import React from "react";
import { StepForward } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
   const navigate = useRouter()
  return (
    <nav className="w-[80%] h-12 rounded-xl bg-white text-black px-4 flex items-center justify-between shadow-sm absolute top-0 mt-5">
      <span className="text-sm uppercase font-semibold font-poppins">
        Talk2Github
      </span>

      <div className="flex items-center gap-3">
        <SignedIn>
          <UserButton />
          <button onClick={()=>navigate.push("/dashboard")} className="px-3 py-1 rounded-lg text-black cursor-pointer font-semibold flex justify-center gap-2 items-center font-poppins border-[1] text-sm border-gray-300 shadow-lg">
            Dashboard <StepForward size={"15px"} />
          </button>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="redirect">
            <button className="px-4 py-1 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
