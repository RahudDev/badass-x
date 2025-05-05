import React, { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { db, auth } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, getDocs, deleteDoc, where, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';

const ChatPanel = ({ isOpen, closeChat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

 
  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(newMessages);
      console.log('Messages updated successfully'); // Log updated messages
    }, (error) => {
      console.error('Error getting messages:', error);
    });

    return () => unsubscribeMessages();
  }, []);

  useEffect(() => {
    const onlineUsersRef = collection(db, 'users');
    const q = query(onlineUsersRef, where('status', '==', 'online'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => doc.id); // Assuming user IDs are stored in document IDs
      setOnlineUsers(users);
      console.log(`Current online users: ${users.length}`);
    }, (error) => {
      console.error('Error fetching online users: ', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    let user = auth.currentUser;

    if (!user) {
      const namefull = localStorage.getItem('name');
      const name = namefull.split(' ')[0];
      const uuid = localStorage.getItem('uuid');
      const email = localStorage.getItem('email');

      if (name && uuid && email) {
        user = { name, uuid, email };
      } else {
        console.error('User is not authenticated and no info found in localStorage');
        alert('User is not authenticated');
        return;
      }
    } else {
      console.log('Authenticated user:', user);
    }

    if (message) {
      try {
        const timestamp = new Date().toISOString(); // UTC timestamp
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // User's timezone

        await addDoc(collection(db, 'messages'), {
          uid: user.uuid,
          name: user.name,
          text: message,
          timestamp,  // Store UTC timestamp
          timezone    // Optionally store user's timezone
        });
        setMessage('');

        // Handle chat limit management
        const messagesQuery = query(
          collection(db, 'messages'),
          orderBy('timestamp', 'asc')
        );
        const snapshot = await getDocs(messagesQuery);
        if (snapshot.size > 20) {
          const docsToDelete = snapshot.docs.slice(0, snapshot.size - 20);
          docsToDelete.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
      } catch (error) {
        console.error('Error adding document:', {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
      }
    } else {
      console.warn('Message is empty');
      alert('Message is empty');
    }
  };

  const handleMention = (userName) => {
    setMessage((prevMessage) => `${prevMessage}@${userName} `);
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toLocaleTimeString(); // Display in user's local time
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid Date';
    }
  };

  const updateUserStatus = async (status) => {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      const userRef = doc(db, 'users', uuid);

      try {
        // Check if the user document exists
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
          // Document exists, update status
          await updateDoc(userRef, { status });
          console.log(`User status updated to ${status}`);
        } else {
          // Document does not exist, create it
          await setDoc(userRef, { uuid, status }, { merge: true });
          console.log(`User document created with status ${status}`);
        }
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    } else {
      console.error('UUID not found in localStorage');
    }
  };

  useEffect(() => {
    // Set online status on mount
    updateUserStatus('online');

    // Set offline status when the component unmounts
    const handleWindowClose = () => updateUserStatus('offline');

    // Listen for window/tab close events
    window.addEventListener('beforeunload', handleWindowClose);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      updateUserStatus('offline');
    };
  }, []);

  return (
    <CSSTransition
      in={isOpen}
      timeout={2000}
      classNames="chat-transition"
      unmountOnExit
    >
      <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
        <Button className="close-btn" onClick={closeChat}>✖️</Button>
        <h2 className="text-center">Chat ({onlineUsers.length} online)</h2>
        <div className="chat-messages" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <Card key={index} className="mb-2 chat-card">
              <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                <div>
                  <strong>{msg.name}</strong>
                  <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                  <br />
                  {msg.text}
                </div>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="mention-btn"
                  onClick={() => handleMention(msg.name)}
                >
                  <strong>@</strong>
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="input-container">
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Button className="emoji-close-btn" onClick={() => setShowEmojiPicker(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message"
          />
          <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FontAwesomeIcon icon={faSmile} />
          </Button>
          <Button onClick={handleSend}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ChatPanel;
