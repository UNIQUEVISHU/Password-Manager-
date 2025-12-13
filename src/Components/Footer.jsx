import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full py-4'>
         <div className="logo font-bold text-white text-2xl ">
        <span className='text-green-500'> &lt;</span>
        Pass 
        <span className='text-green-500'>Op/&gt;</span>
        </div>

        <div className=' flex  justify-center items-center font-bold'>
            Created with <img className='w-7 mx-2' src="icon/heart.png" alt="" />  BY VISHU
        </div>
    </div>
  )
}

export default Footer