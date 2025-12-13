import { useState } from 'react'
import Navbar from './Components/Navbar'

import './App.css'
import Managager from './Components/Managager'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-1 bg-gradient-to-b from-green-50 to-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
          <Managager/>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
