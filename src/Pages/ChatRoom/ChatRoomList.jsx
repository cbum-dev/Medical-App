import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(
          "https://medi-dep-bykw.vercel.app/apis/chat-rooms/"
        );
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="container mt-4 ">
      <h1 className="text-white display-6 text-center">Chat Rooms</h1>
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {chatRooms.map((room) => (
          <Col key={room.id}>
            <Card
              className="mt-4 text-white bg-dark border-secondary border-2 "
              // style={{ width: "23.5rem", height: "10rem" }}
            >
              <Card.Body>
                <Card.Text>ChatRoom : {room.id}</Card.Text>
                <Card.Title>{room.name}</Card.Title>
                <button className="btn btn-primary mt-3 ">
                  <Link to={`/room/${room.id}`} className="text-white">
                    Join Chat Room
                  </Link>
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ChatRoomList;
