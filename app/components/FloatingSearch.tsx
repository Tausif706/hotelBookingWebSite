// // components/FloatingIcon.tsx
'use client'
import Image from "next/image";
import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { ChatForm } from "./chatFacility/ChatForm";

// const FloatingIcon: React.FC = () => {
//   const router = useRouter();
//   const [isRotated, setIsRotated] = useState(false);
//   const imageRef = useRef<HTMLImageElement>(null);
//   // const [isChatOpen, setIsChatOpen] = useState(false);

//   const handleClick = () => {
//     setIsRotated(!isRotated);
//     // router.push('/'); // Assuming you want to navigate on click
//   };

//   return (
//     <div className="fixed hidden md:block bottom-7 right-10 z-50 cursor-pointer">
//       <Image
//         ref={imageRef} // Assign ref to the Image component
//         className={`rounded-full transition duration-3000 ease-in-out transform ${isRotated ? '-rotate-360' : ''}`} // Apply conditional transform
//         height="40"
//         width="40"
//         alt="Avatar"
//         src="/images/Chat_GPT_logo.png"
//         onClick={handleClick}
//       />
//       {isRotated && <ChatForm isOpen={isRotated} setIsOpen={setIsRotated}/>}
//     </div>
//   );
// };

// export default FloatingIcon;

const FloatingIcon: React.FC = () => {
  const router = useRouter();
  const [isRotated, setIsRotated] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // New state variable

  const handleClick = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat form state
    setIsRotated(!isRotated); // Optional: Toggle rotation if needed
  };

  return (
    <div className="fixed hidden md:block bottom-7 right-10 z-50 cursor-pointer">
      <Image
        ref={imageRef}
        className={`rounded-full transition duration-3000 ease-in-out transform ${isRotated ? '-rotate-360' : ''}`}
        height="40"
        width="40"
        alt="Avatar"
        src="/images/Chat_GPT_logo.png"
        onClick={handleClick}
      />
      <ChatForm isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default FloatingIcon;

