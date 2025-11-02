import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";


const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [chats, setChats] = useState([]);


  useEffect(() => {
    const savedChats = localStorage.getItem("gemini_chats");
    if (savedChats) setChats(JSON.parse(savedChats));
  }, []);

  useEffect(() => {
    localStorage.setItem("gemini_chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (prompt && response && !chats.some((c) => c.prompt === prompt)) {
      setChats((prev) => [...prev, { id: Date.now(), prompt, response }]);
    }
  }, [response]);



  return (
    <div className="app">
      <Sidebar
        chats={chats}
        setActiveChat={(chat) => {
          setPrompt(chat.prompt);
          setResponse(chat.response);
        }}

        
      />
      <Main
        prompt={prompt}
        setPrompt={setPrompt}
        response={response}
        setResponse={setResponse}
      />
    </div>
  );
};

export default App;
