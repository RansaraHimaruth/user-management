import React from "react";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";

async function TodoList() {
  const getTopics = async () => {
    try {
      const response = await axios.get(`/api/topics`);
      console.log("response: ", response.data);

      if (response.status !== 200) {
        throw new Error("Failed to fetch topics");
      }

      return response.data;
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

  const { topics } = await getTopics();
  return (
    <>
      {topics.map((topic: any, index: number) => (
        <div
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          key={index}
        >
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>

          <div className="flex gap-2">
            {/* <RemoveBtn id={topic._id} /> */}
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default TodoList;
