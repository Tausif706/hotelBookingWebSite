// "use client";

// import { createContext, useState } from "react"

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children,
// })=>{
//     const [mode,setmode] = useState("dark")

//     const toggle = () => {
//         setmode((prev) => (prev === "dark" ? "light":"dark"));
//     };
//     return (
//     <ThemeContext.Provider value={{ toggle, mode }}>
//         <div className={`theme ${mode}`}>{children}</div>
//     </ThemeContext.Provider>
    
//     );
// }

"use client"
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}