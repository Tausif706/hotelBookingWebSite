// "use client"
// import React, { useContext } from 'react'
// import style from './DarkModeToggle.module.css'
// import { ThemeContext } from '../context/ThemeContext'
// const DarkModeToggle = () =>{

//     const { toggle ,mode} = useContext(ThemeContext)
//   return (
//     <div className={style.container} onClick={toggle}>
//         <div className={style.icon}>🌙</div>
//         <div className={style.icon}>☼</div>
//         <div className={style.ball} 
//         style={mode === "light"? { left:"2px" ,  background:'black'}:{right:"2px" , background:'white'}}/>    
//     </div>
//   )
// }

// export default DarkModeToggle

"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";


const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }


  return (
    <button
      className={`w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};
export default DarkModeToggle