import React, { useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = ({ chats, setActiveChat }) => {
  const [extend, setExtended] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((e) => !e)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extend && <p>New chat</p>}
        </div>

        {extend && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className="recent-entry"
                  onClick={() => setActiveChat(chat)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{chat.prompt.slice(0, 25)}...</p>
                </div>
              ))
            ) : (
              <p className="no-chat">No chats yet</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
