import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
        <div className="mycontainer text-white flex justify-between items-center py-3">

      <div className="logo font-bold text-white text-2xl">
        <span className='text-green-500'> &lt;</span>
        Pass 
        <span className='text-green-500'>Op/&gt;</span>
        </div>

      {/* <ul>
        <li className="flex gap-4">
          <a className='hover:font-bold' href="/">Home</a>
          <a className='hover:font-bold' href="/">About</a>
          <a className='hover:font-bold' href="/">Contact</a>
        </li>
      </ul> */}
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className='text-white rounded-full bg-green-700 cursor-pointer flex items-center gap-2 px-2 py-1 ring-white ring-1 hover:bg-green-600 transition'>
        <img className='invert w-5' src="/icon/github.svg" alt="github logo" />
        <span className='font-bold text-sm'>Github</span>
      </a>

        </div>
    </nav>
  )
}

export default Navbar