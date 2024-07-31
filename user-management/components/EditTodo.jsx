"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function EditTodo({ id, title, description }) {
  const router = useRouter();

  const [values, setValues] = useState({
    title: title,
    description: description,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title || !values.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.put(`/api/topics/${id}`, values);
      if (response.status !== 200) {
        throw new Error("Failed to update topic");
      }
      location.replace("/");
    } catch (error) {
      console.log("Error updating topic: ", error);
    }
  };

  return (
    <>
      <div>
        {values.description}
        {values.title}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          type="text"
          className="border border-slate-500 px-8 py-2"
          placeholder="Topic Title"
        />

        <input
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          value={values.description}
          type="text"
          className="border border-slate-500 px-8 py-2"
          placeholder="Topic Description"
        />

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Update Topic
        </button>
      </form>
    </>
  );
}

export default EditTodo;