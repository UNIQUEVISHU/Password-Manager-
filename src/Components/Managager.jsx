import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const Managager = () => {
  const ref = useRef()
  const passwordref = useRef()

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const showpassword = () => {
    if (!ref.current || !passwordref.current) return

    if (ref.current.src.includes("eyecross")) {
      ref.current.src = "icon/eye.png"
      passwordref.current.type = "password"
    } else {
      ref.current.src = "icon/eyecross.png"
      passwordref.current.type = "text"
    }
  }

  const savepassword = () => {
    if (
      form.site.trim().length > 3 &&
      form.username.trim().length > 3 &&
      form.password.trim().length > 3
    ) {
      const newItem = { ...form, id: uuidv4() }
      const next = [...passwordArray, newItem]

      setpasswordArray(next)
      localStorage.setItem("passwords", JSON.stringify(next))
      setform({ site: "", username: "", password: "" })

      toast('Password saved!', {
        theme: "dark",
        transition: Bounce,
      })
    } else {
      toast('Fill all fields (min 4 chars)')
    }
  }

  const deletepassword = (id) => {
    if (confirm("Do you really want to delete this password?")) {
      const filtered = passwordArray.filter(item => item.id !== id)
      setpasswordArray(filtered)
      localStorage.setItem("passwords", JSON.stringify(filtered))

      toast('Password deleted!', {
        theme: "dark",
        transition: Bounce,
      })
    }
  }

  const editpassword = (id) => {
    const item = passwordArray.find(i => i.id === id)
    setform(item)
    setpasswordArray(passwordArray.filter(i => i.id !== id))
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied!', {
      theme: "dark",
      transition: Bounce,
    })
  }

  return (
    <>
      <ToastContainer />

      <div className="mycontainer my-9 p-2 min-h-[88.2vh]">

        {/* HERO */}
        <div className="w-full text-center mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800">
            <span className="text-green-500">&lt;</span>
            PassOp
            <span className="text-green-500">/&gt;</span>
          </h1>
          <p className="text-green-700 mt-2 text-base md:text-lg">Your own password manager</p>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-green-400 via-green-300 to-transparent" />
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-6 items-center p-4">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-2"
            name="site"
          />

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-2"
              name="username"
            />

            <div className="relative w-full">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handlechange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-2"
                type="password"
                name="password"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={showpassword}
              >
                <img ref={ref} width={22} src="icon/eye.png" />
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            className="bg-green-400 hover:bg-green-300 px-6 py-2 rounded-full flex gap-2 items-center w-full md:w-auto justify-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            />
            Save Password
          </button>
        </div>

        {/* TABLE */}
        <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

        {passwordArray.length === 0 && <div>No password to show</div>}

        {passwordArray.length !== 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm sm:text-base border-collapse rounded-md overflow-hidden">
              <colgroup>
                <col style={{ width: '40%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2 text-left pl-4">Site</th>
                <th className="py-2 text-left">Username</th>
                <th className="py-2 text-left">Password</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-green-100 [&>tr]:border-b [&>tr:last-child]:border-b-0">
              {passwordArray.map(item => (
                <tr key={item.id}>
                  <td className="text-left py-2 border border-white">
                    <div className="flex items-center gap-2">
                      <a href={item.site} target="_blank" rel="noopener noreferrer" className="truncate max-w-[160px]">{item.site}</a>
                      <button onClick={() => copyText(item.site)} className="p-1" aria-label={'Copy site ' + item.site}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{ width: 22, height: 22 }}
                        />
                      </button>
                    </div>
                  </td>

                  <td className="text-left py-2 border border-white">
                    <div className="flex items-center gap-2">
                      <div className="truncate max-w-[120px] sm:max-w-[160px]">{item.username}</div>
                      <button onClick={() => copyText(item.username)} className="p-1" aria-label={'Copy username ' + item.username}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{ width: 22, height: 22 }}
                        />
                      </button>
                    </div>
                  </td>

                  <td className="text-left py-2 border border-white">
                    <div className="flex items-center gap-2">
                      <div className="truncate max-w-[120px] sm:max-w-[160px]">{item.password}</div>
                      <button onClick={() => copyText(item.password)} className="p-1" aria-label={'Copy password for ' + item.site}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{ width: 22, height: 22 }}
                        />
                      </button>
                    </div>
                  </td>

                  <td className="text-center py-1 border border-white whitespace-nowrap">
                    <div className="inline-flex items-center justify-center gap-1">
                      <button onClick={(e) => { editpassword(item.id); e.currentTarget.blur(); }} className="cursor-pointer p-2 rounded-full hover:bg-green-600 hover:text-white transition transform hover:scale-110 active:scale-95 active:translate-y-0.5 active:bg-transparent focus:bg-transparent focus:text-current focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2" aria-label={'Edit ' + item.site}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: 22, height: 22 }}
                        />
                      </button>

                      <button onClick={(e) => { deletepassword(item.id); e.currentTarget.blur(); }} className="cursor-pointer p-2 rounded-full hover:bg-red-600 hover:text-white transition transform hover:scale-110 active:scale-95 active:translate-y-0.5 active:bg-transparent focus:bg-transparent focus:text-current focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2" aria-label={'Delete ' + item.site}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: 22, height: 22 }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        )}


      </div>
    </>
  )
}

export default Managager
