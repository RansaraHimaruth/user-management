'use client'
import { set } from 'mongoose';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function AddTopic() {


  return (
    <>
      <form className='flex flex-col gap-3'>
        <input type="text" className='border border-slate-500 px-8 py-2' placeholder='Topic Title' />

        <input type="text" className='border border-slate-500 px-8 py-2' placeholder='Topic Description' />

        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit' type="submit">
            Add Topic
        </button>
      </form>
    </>
  )
}

export default AddTopic