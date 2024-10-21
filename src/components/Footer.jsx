import React from 'react'

const Footer = () => {
  return (
    <div className=" bg-slate-800 text-white text-center flex flex-col justify-center items-center w-full">
      {/* fixed bottom-0 */}

    <div className='flex p-1 gap-1'>
        Created with 
        <lord-icon
        src="https://cdn.lordicon.com/xyboiuok.json" trigger="hover"
          colors="primary:#1663c7" style={{"width":"25px","height":"25px"}}>
        </lord-icon>by Ketaki
        {/* <img src="love.png" alt="" className='w-6 mx-2'/>  */}
        
    </div>

    
    <div className="logo font-bold text-2xl p-1">
            <span className="text-blue-500">&lt;</span>
             Pass 
            <span className="text-blue-500">OP/&gt;</span>
    </div>

    </div>
  )
}

export default Footer