'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ChatFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const ChatForm: React.FC<ChatFormProps> = ({
  isOpen,
  setIsOpen
}) => {
  const [content, setContent] = useState('');
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Navigate to search results page with search terms as query parameter
    router.push(`/searchFromGPT?searchTerms=${content}`);
    
  };



  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className={`bg-white border-2 border-gray-300 rounded-lg shadow-lg fixed  p-4 z-10 transition-all duration-3000 ${isOpen ? 'bottom-20 right-10 opacity-100 scale-100' : 'bottom-0 right-0 opacity-0 scale-0'}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Chat</h1>

        <label htmlFor="msg" className="block mb-2 text-black"><b>Content</b></label>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Type message.."
          name="msg"
          className="w-full p-2 border-2 border-gray-300 rounded-md"
          required
        />

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer w-full">Send</button>
        {/* <button type="button" className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer w-full" onClick={() => setIsOpen(false)}>Close</button> */}
      </form>
    </div>
  );
};
