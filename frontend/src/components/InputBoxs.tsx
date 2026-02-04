import React from 'react'

const InputBoxs = () => {
  return (
    <div className='w-[80%] m-auto min-h-10 p-2 bg-white ring-2 ring-[#1030bd] rounded flex justify-center items-center text-black gap-8'>
        <input type="text" placeholder='Enter Repo Url'  className='text-xl text-violet-900 placeholder:text-[#26015aaf] w-[70%] p-2 outline-none '/>
        <button className=" font-semibold text-lg cursor-pointer bg-violet-950 p-8  py-3 rounded text-violet-50">
            Analyse
        </button>
    </div>
  )
}

export default InputBoxs