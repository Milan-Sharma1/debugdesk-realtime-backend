# Debug Desk WebSocket Backend

The **Debug Desk WebSocket Backend** is the real-time communication layer for the Debug Desk platform. It enables features like live chat, real-time code collaboration, and private messaging. Built with **Socket.IO**, it ensures efficient and secure communication between users.

---

## 🚀 Features

- **Real-Time Messaging**: Broadcast messages to specific rooms or users in real-time.  
- **Room Management**: Dynamic room creation for questions or private chats.  
- **Private Notifications**: Users can receive private message notifications in their own dedicated rooms.  
- **Database Integration**: Messages are validated and stored securely using Appwrite.  
- **CORS Support**: Ensures secure communication by allowing connections from trusted origins.  

---

## 🛠️ Tech Stack

- **Node.js**: Backend runtime environment.  
- **Express**: Lightweight server framework for handling HTTP requests.  
- **Socket.IO**: Real-time communication for WebSocket-based messaging.  
- **Appwrite**: Used for authentication and message storage.  
- **Zod**: For message validation and schema enforcement.  

---

## 📡 WebSocket Events

### **Client Events**
1. **`initialSetup`**
   - Purpose: Joins a user to their private room for notifications.  

2. **`joinRoom`**
   - Purpose: Joins a user to a specific room (question ID or another user's ID).  

3. **`message`**
   - Purpose: Sends a message to a room or a user and saves it in the database.  

### **Server Events**
1. **`message`**
   - Broadcasts the message to all connected clients in the specified room or to a private user.

---

## 🔐 Security

1. **CORS Enforcement**: Ensures only trusted origins can connect to the WebSocket server.  
2. **Validation**: All incoming messages are validated using Zod to prevent invalid or malicious data.  
3. **Database Authentication**: Secure integration with Appwrite for managing user data and messages.  

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:  
1. Fork the repository.  
2. Create a new branch for your feature or bug fix.  
3. Submit a pull request with a detailed description of your changes.  

---
## 📫 Contact

Email: [hello@milansharma.me](mailto:hello@milansharma.me)  
Portfolio: [milansharma.me](https://milansharma.me)
Milan Sharma: [@MilanSharma103](https://x.com/MilanSharma1034?s=09)
