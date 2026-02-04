import Image from "next/image";
import Headers from './utils/Headers'

export default function Home() {
  return (
    <>
      <div className="h-screen w-full bg-black text-white flex justify-center items-center">
      <Headers title={`Hello world`} description={"heallow world"} keyword="Hellow worlds" />
        <h1 className="text-2xl">
          Hello world
        </h1>
      </div>
    </>
  );
}
