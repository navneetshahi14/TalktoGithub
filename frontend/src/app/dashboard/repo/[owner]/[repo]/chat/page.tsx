'use client'
import ChatWindow from "@/components/chats/ChatWindow";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  return (
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 flex flex-col h-[calc(100vh-8vh)]">
      <ChatWindow owner={params.owner as string} repo={params.repo as string} />
    </div>
  );
};

export default page;
