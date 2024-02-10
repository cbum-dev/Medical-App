import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Trash3Fill,
  SendCheckFill,
  ArrowClockwise,
} from "react-bootstrap-icons";
const MessageDetail = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [stickerCode, setStickerCode] = useState("");
  const { chatroomId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (token) {
          const response = await axios.get(
            "https://medi-dep-bykw.vercel.app/current-user/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://medi-dep-bykw.vercel.app/apis/messages/${chatroomId}/`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      await axios.post(
        `https://medi-dep-bykw.vercel.app/apis/messages-create/${chatroomId}/`,
        { content: newMessage, sticker: stickerCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewMessage("");
      setStickerCode("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleSelectSticker = (selectedSticker) => {
    setStickerCode(selectedSticker);
    setShowStickerList(false);
  };
  const handleDeleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      await axios.delete(
        `https://medi-dep-bykw.vercel.app/apis/messages-del/${messageId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatroomId]);

  return (
    <div className="container mt-4">
      {localStorage.getItem("access_token") && (
        <div className="mb-4">
          <h3 className="text-white display-6 text-center my-3">Send a Message</h3>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button
              className="btn btn-primary ms-2"
              onClick={handleSendMessage}
            >
              <SendCheckFill />
            </button>
            <button className="btn btn-primary ms-2" onClick={fetchMessages}>
              <ArrowClockwise />
              Reload
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="card mb-3">
          <div className="card-body text-center">
            <p className="card-text">Loading Messages...</p>
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="card mb-3">
          <div className="card-body text-center">
            <p className="card-text">Empty Messages.</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`card  border-gradient-secondary border-2 mb-3 ${
              currentUser && currentUser.user_id === message.user.id
                ? "bg-light text-dark"
                : ""
            }`}
          >
            <div className="card-body d-flex justify-content-between pt-1 pb-1">
              <div>
                <p className="card-text pt-0 pb-0 mb-2">{message.content}</p>
                {message.sticker && (
                  <p className="card-text pt-0 pb-0 mb-2">{message.sticker}</p>
                )}
                <small className="text-muted mb-1 mx-0">
                  Sent by {message.user.username} at{" "}
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
              {currentUser && currentUser.user_id === message.user.id && (
                <button
                  className="btn btn-secondary rounded"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  <Trash3Fill color="white" size={20} />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageDetail;
