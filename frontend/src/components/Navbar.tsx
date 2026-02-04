import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="w-[70%] min-h-[5vh] py-2 px-5 bg-gray-300 rounded-full justify-between items-center flex absolute left-1/2 -translate-x-1/2 top-10 z-10">
        {/* logo part */}
        <div className="flex text-black justify-center items-center gap-2 ">
          <div className="h-[30px] w-[30px] bg-black rounded-full p-2 flex justify-center items-center ">
            <Image
              className=""
              src={"/logo.png"}
              alt="logo"
              width={20}
              height={20}
            />
          </div>
          <span className="text-xl font-semibold">Talk-2-Github</span>
        </div>

        {/* nav links */}

        <ul className="flex text-background gap-10 uppercase font-semibold [&>li]:cursor-pointer [&>li]:text-shadow-lg [&>li]:hover:scale-[1.2] [&>li]:hover:-translate-y-1 [&>li]:hover:text-gray-800 [&>li]:duration-150 ">
          <li>Home</li>
          <li>Url-Repo</li>
          <li>About</li>
        </ul>

        {/* signup and logout btn */}
        <div className="flex justify-center items-center gap-5 ">
          <button className="cursor-pointer text-[0.88rem] bg-background py-1 px-5 rounded-xl uppercase hover:bg-gray-400 duration-150 border-2 border-background hover:text-black hover:text-shadow-lg font-semibold hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] hover:shadow-white  ">
            SignIn
          </button>

          <button className="cursor-pointer text-[0.88rem] bg-background py-1 px-5 rounded-xl uppercase hover:bg-gray-400 duration-150 border-2 border-background hover:text-black hover:text-shadow-lg font-semibold hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] hover:shadow-white  ">
            SignUp
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
