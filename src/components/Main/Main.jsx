import React, { useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Main = ({
  prompt,
  setPrompt,
  response,
  setResponse,
  chats,
  setChats,
  activeChat,
  setActiveChat,
}) => {
  const [hide, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      setResponse(data.text);
    } catch (err) {
      console.error(err);
      setResponse("Error generating content.");
    } finally {
      setLoading(false);
      setHidden(true);
    }
  };

  useEffect(() => {
    if (activeChat) {
      const found = chats.find((c) => c.id === activeChat);
      if (found) {
        setPrompt(found.prompt);
        setResponse(found.response); // use 'response' instead of 'answer'
      }
    }
  }, [activeChat, chats, setPrompt, setResponse]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {/* Greeting */}
        {!loading && !hide && (
          <div className="greet">
            <p>
              <span>Hello, Dev,</span>
            </p>
            <p>How can I help you today?</p>
          </div>
        )}

        {/* Cards */}
        {!response && !loading && (
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Write a simple code example for React state</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        )}

        {/* Response area */}
        {(response || loading) && (
          <div className="response-box">
            {loading ? (
              <p className="loading">Thinking...</p>
            ) : (
              <p className="response-text">
                <ReactMarkdown>{response}</ReactMarkdown>
              </p>
            )}
          </div>
        )}

        {/* Bottom search bar */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <div>
              <img
                src={assets.send_icon}
                alt="send"
                onClick={handleGenerate}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <p className="bottom-info"></p>
        </div>
      </div>
    </div>
  );
};

export default Main;
