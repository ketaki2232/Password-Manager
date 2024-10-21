import React from 'react'
import { useRef , useState, useEffect } from 'react'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({site:"", username:"", password:""})
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }
    

    useEffect(() => {
        getPasswords()

    }, [])

    const handleChange = (e) => {
      setform({...form, [e.target.name]: e.target.value})
    }
    
    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right", autoClose: 3000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: false, draggable: true,
            progress: undefined, theme: "dark",transition: Zoom, });
            navigator.clipboard.writeText(text)
        }
                   
        const showPassword = () => {
            passref.current.type= "text"
            if (ref.current.src.includes("hide.png")) {
                ref.current.src = "eye.png"
                passref.current.type= "password"
            }
            else{
                passref.current.type= "text"
                ref.current.src = "hide.png"
            } 
        }

        const savePassword = async() => {
            if (form.site.length >3 && form.password.length >3 && form.username.length >3) {

            await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"}, 
            body: JSON.stringify({id : form.id})})

                setpasswordArray([...passwordArray,{ ...form, id:uuidv4()}])
                await fetch("http://localhost:3000/", {method:"POST", headers:{"Content-Type":"application/json"}, 
                body: JSON.stringify({...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{ ...form, id:uuidv4()}]))
            // console.log([...passwordArray,{ ...form, id:uuidv4()}])
            setform({site:"", username:"", password:""})
            toast('Password saved successfully! ✔️', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: false, draggable: true,
                progress: undefined, theme: "dark",transition: Zoom, });
            }
            else {
                toast("Error : Invalid site/ password/ username, check length",
                    {
                        position: "top-right", autoClose: 3000, hideProgressBar: false,
                        closeOnClick: true, pauseOnHover: false, draggable: true,
                        progress: undefined, theme: "dark",transition: Zoom, }
                )
            }
        }
    
    const editPassword = (id) => {
        console.log(`Editing Pass word ${id}`)
        setform({...passwordArray.filter(i=>i.id===id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !=id))


        toast('Ready to edit ✏️', {
            position: "top-right", autoClose: 3000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark",transition: Zoom, });
    }
    const deletePassword = async(id) => {
        let c = confirm("Do you really want to delete this password?")
        if(c){
        setpasswordArray(passwordArray.filter(item => item.id !==id))
        let res = await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify({id})})
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !==id)))
        
        toast('Password deleted 🗑️', {
            position: "top-right", autoClose: 3000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: false, draggable: true,
            progress: undefined, theme: "dark",transition: Zoom, });
        }
        }
    
    
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover={false}
theme="dark"
transition= "Zoom"
/>

    <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
    {/* <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#1e40af_100%)]"></div> */}


    <div className="p-3 md:mycontainer min-h-[86vh]">
        <h1 className='text-4xl font-bold text-center'>
        <span className="text-blue-500">&lt;</span>
         Pass 
         <span className="text-blue-500">OP/&gt;</span>
        </h1>
        <p className='text-blue-600 text-lg text-center font-semibold'>Your Password Manager</p>

    <div className=' flex flex-col p-4 gap-8 text-black items-center'>
        <input value={form.site} onChange={handleChange} type="text" placeholder='Enter website URL' className='rounded-full border border-blue-400 w-full py-2 px-4' name='site' id='site'/>
        <div className="flex flex-col md:flex-row w-full justify-between gap-8">   
            <input value={form.username} onChange={handleChange} type="text" placeholder='Enter username' className='rounded-full border border-blue-400 w-full py-2 px-4' name='username' id='username'/>
            <div className="relative">
            <input ref={passref} value={form.password} onChange={handleChange} type="password" placeholder='Enter password' className='rounded-full border border-blue-400 w-full py-2 px-4' name='password' id='password'/>
            <span className='absolute right-[3px] top-[2px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-2' src="eye.png" alt="" width={40} />
            </span>
            </div>
        </div>
        <button onClick={savePassword} className='gap-3 flex justify-center items-center w-fit bg-blue-500 hover:bg-blue-300 rounded-full px-8 py-2 hover:border hover:font-semibold border-blue-600 '>
                <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                Save
            </button>
    </div>
    <div className="passwords">
        <h2 className='text-2xl text-blue-600 font-bold py-4'>Your Passwords</h2>
        {passwordArray.length ==0 && <div className='text-xl'> No passwords to show</div>}
        {passwordArray.length !=0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                <thead className='bg-blue-800 text-white'><tr>
                    <th className='border border-white py-2'>Site</th>
                    <th className='border border-white py-2'>Username</th>
                    <th className='border border-white py-2'>Password</th>
                    <th className='border border-white py-2'>Action</th>
                </tr></thead>
                
                <tbody className='bg-blue-100'>
                    {passwordArray.map((item, index) => {
                      return <tr key = {index}>
                    <td className='border border-white p-2 text-center'>
                       <div className='flex justify-center gap-2 items-center'> <a href={item.site} target='blank'> {item.site} </a> 
                       <div className="iconcopy size-7 cursor-pointer" onClick={() => {copyText(item.site)}} >
                       <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" colors="primary:#1663c7" style = {{"width":"25px" , "height": "25px" , "paddingTop":"3px", "paddingLeft":"3px"}}>
                        </lord-icon></div>
                        </div>
                    </td>
                    <td className='border border-white p-2  text-center ' onClick={() => {copyText(item.username)}}> 
                        <div className='flex justify-center gap-2 items-center'><span>{item.username}</span> 
                        <div className="iconcopy size-7 cursor-pointer">
                        <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" colors="primary:#1663c7" style = {{"width":"25px" , "height": "25px" , "paddingTop":"3px", "paddingLeft":"3px"}} >
                        </lord-icon></div>
                        </div>
                        </td>
                    <td className='border border-white p-2  text-center' onClick={() => {copyText(item.password )}}> 
                        <div className='flex justify-center gap-2 items-center'><span>{"*".repeat(item.password.length)}</span>
                        <div className="iconcopy size-7 cursor-pointer">
                            <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" colors="primary:#1663c7" style = {{"width":"25px" , "height": "25px" , "paddingTop":"3px", "paddingLeft":"3px"}} >
                        </lord-icon></div>
                        </div>
                        </td>
                    <td className='border border-white p-2 flex gap-4 justify-center'> 

                        
                        <span onClick={() => {editPassword(item.id)}}>
                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover" colors="primary:#1663c7" style = {{"width":"25px" , "height": "25px"}} className="m-2">
                        </lord-icon>
                        </span>
                        <span onClick={() => {deletePassword(item.id)}}>
                        <lord-icon src="https://cdn.lordicon.com/wpyrrmcq.json"
                        trigger="hover" colors="primary:#1663c7" style = {{"width":"25px" , "height": "25px"}} className=" m-2">
                        </lord-icon>
                        </span>
                        </td>
                </tr>
                }
            )}
            </tbody>
            </table>
            }
    </div>
    </div>
    </>
  )
}

export default Manager