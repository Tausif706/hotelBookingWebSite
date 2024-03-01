"use client"
import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useContext, useEffect, useRef } from 'react'
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {


  const navbarRef = useRef<HTMLDivElement>(null); 
  let theEnd = 0;
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        const navbar = navbarRef.current!;
  
        if (scrollTop > theEnd) {
          navbar.style.top = '-70px'; 
        //   '-'+scrollTop+'px';
        } else {
          navbar.style.top = '0';
        }
        // navbar.style.tra = ''
        theEnd = scrollTop;
        
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


  return ( 
    
    <div
      ref={navbarRef}
      className={`fixed w-full z-10 shadow-sm transition-all ease-linear duration-500 
        dark:bg-black dark:text-cyan-100`}
    >
      <div
        className="
          py-3 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
    <Categories />
  </div>
  );
}


export default Navbar;