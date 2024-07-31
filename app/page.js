// pages/index.js
import { useEffect, useState } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { database } from "../firebase";

export default function Home() {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // 방 정보 가져오기 및 자동 배정
    const roomsRef = ref(database, "rooms/");
    onValue(roomsRef, (snapshot) => {
      let roomKey;
      snapshot.forEach((roomSnapshot) => {
        const roomData = roomSnapshot.val();
        if (roomData && roomData.members && Object.keys(roomData.members).length < 100) {
          roomKey = roomSnapshot.key;
        }
      });

      if (!roomKey) {
        roomKey = push(roomsRef).key;
        set(ref(database, `rooms/${roomKey}`), { members: {} });
      }

      setRoom(roomKey);

      // 메시지 수신
      const messagesRef = ref(database, `rooms/${roomKey}/messages`);
      onValue(messagesRef, (snapshot) => {
        const msgs = [];
        snapshot.forEach((msgSnapshot) => {
          msgs.push(msgSnapshot.val());
        });
        setMessages(msgs);
      });
    });
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, `rooms/${room}/messages`);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      content: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  return (
      <div>
        <h1>Welcome to Chat Room {room}</h1>
        <div>
          {messages.map((message, index) => (
              <p key={index}>{message.content}</p>
          ))}
        </div>
        <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
  );
}
