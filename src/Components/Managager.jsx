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
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
            <span className="text-green-500">&lt;</span>
            PassOp
            <span className="text-green-500">/&gt;</span>
          </h1>
          <p className="text-green-700 mt-2 text-lg">Your own password manager</p>
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
            className="bg-green-400 hover:bg-green-300 px-6 py-2 rounded-full flex gap-2 items-center"
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
          <table className="table-auto w-full border-collapse border-spacing-0 rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-green-100 [&>tr]:border-b [&>tr:last-child]:border-b-0">
              {passwordArray.map(item => (
                <tr key={item.id}>
                  <td className="text-center py-2 border border-white">
                    <a href={item.site} target="_blank">{item.site}</a>
                    <div onClick={() => copyText(item.site)} className="cursor-pointer">
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: 25, height: 25 }}
                      />
                    </div>
                  </td>

                  <td className="text-center py-2 border border-white">
                    {item.username}
                    <div onClick={() => copyText(item.username)} className="cursor-pointer">
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: 25, height: 25 }}
                      />
                    </div>
                  </td>

                  <td className="text-center py-2 border border-white">
                    {item.password}
                    <div onClick={() => copyText(item.password)} className="cursor-pointer">
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: 25, height: 25 }}
                      />
                    </div>
                  </td>

                  <td className="text-center py-1 border border-white">
                    <button onClick={() => editpassword(item.id)} className="mx-1 cursor-pointer p-1 rounded hover:bg-green-600 hover:text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300" aria-label={'Edit ' + item.site}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ width: 25, height: 25 }}
                      />
                    </button>

                    <button onClick={() => deletepassword(item.id)} className="mx-1 cursor-pointer p-1 rounded hover:bg-red-600 hover:text-white transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300" aria-label={'Delete ' + item.site}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: 25, height: 25 }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Managager
