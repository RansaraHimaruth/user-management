"use client";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import axios from "axios";
import { useRouter } from "next/navigation";

function RemoveBtn({ id }) {
  const router = useRouter();

  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this topic?");

    if (confirmed) {
      try {
        const response = await axios.delete(`/api/topics?id=${id}`);
        // if (response.status === 200) {
          router.refresh();
        // }
      } catch (error) {
        console.log("Error deleting topic: ", error);
      }
    }
  };

  return (
    <button onClick={handleRemove} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}

export default RemoveBtn;
