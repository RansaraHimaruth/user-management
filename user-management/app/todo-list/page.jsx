// import React from "react";
// import RemoveBtn from "@/components/RemoveBtn";
// import Link from "next/link";
// import { HiPencilAlt } from "react-icons/hi";
// import axios from "axios";

// const getTopics = async () => {
//   try {
//     const response = await axios.get(
//       `/api/topics?timestamp=${new Date().getTime()}`
//     );
//     console.log("response: ", response.data);

//     if (response.status !== 200) {
//       throw new Error("Failed to fetch topics");
//     }

//     return response.data;
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };
// async function TodoList() {
//   const { topics } = await getTopics();
//   return (
//     <>
//       {topics.map((topic, index) => (
//         <div
//           className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//           key={index}
//         >
//           <div>
//             <h2 className="font-bold text-2xl">{topic.title}</h2>
//             <div>{topic.description}</div>
//           </div>

//           <div className="flex gap-2">
//             {/* <RemoveBtn id={topic._id} /> */}
//             <Link href={`/editTopic/${topic._id}`}>
//               <HiPencilAlt size={24} />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export default TodoList;
'use client'

import React, { useEffect, useState } from "react";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";

const TodoList = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  const getTopics = async () => {
    try {
      const response = await axios.get(`/api/topics`, { cache: "no-store" });
      console.log("response: ", response.data);

      if (response.status !== 200) {
        throw new Error("Failed to fetch topics");
      }

      return response.data;
    } catch (error) {
      console.log("Error loading topics: ", error);
      setError("Failed to load topics");
      return null;
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      if (data) {
        setTopics(data.topics || []);
      }
    };

    fetchTopics();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {topics.map((topic, index) => (
        <div
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          key={index}
        >
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTodo/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;