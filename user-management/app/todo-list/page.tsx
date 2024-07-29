import React from "react";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

async function TodoList() {
  return (
    <>
      <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
        <div>
          <h2 className="font-bold text-2xl">title</h2>
          <div>description</div>
        </div>

        <div className="flex gap-2">
          <RemoveBtn />
          <Link href={`/edit/1`}>
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default TodoList;
