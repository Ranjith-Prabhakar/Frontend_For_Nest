# 💬 Real-Time Chat Frontend – React with Vite & Socket.IO

This frontend application provides the user interface for a real-time, client-to-client chat system. It allows users to interact with either **Client A** or **Client B** backend services, sending and receiving messages instantly via WebSockets.

> 🧠 This project is the user-facing component of a real-time chat system. It communicates directly with the [Client A Service](https://github.com/Ranjith-Prabhakar/Nest_Client_A) Service and [Client B Service](https://github.com/Ranjith-Prabhakar/Nest_Client_B) (backend repositories).

---

## 🔄 System Workflow (Frontend Perspective)

The user interaction and data flow from the frontend are as follows:

1.  **Client Selection:** Upon loading, the application presents a landing page where the user can choose to interact as either "Client A" or "Client B".
2.  **Message Sending:**

    - If the user is on the **Client A** interface, typing a message and clicking "Send" dispatches a `POST` request to the **Client A backend's** `/message-to-b` endpoint.
    - If the user is on the **Client B** interface, typing a message and clicking "Send" dispatches a `POST` request to the **Client A backend's** `/message-to-a` endpoint.
    - The respective backend then publishes the message to the appropriate RabbitMQ queue for the other client to consume.

3.  **Real-Time Message Reception:**

    - The **Client A** interface establishes a WebSocket connection to the **Client A backend** and listens for `message-to-client-a` events, displaying messages originating from Client B.
    - The **Client B** interface establishes a WebSocket connection to the **Client B backend** and listens for `message-to-client-b` events, displaying messages originating from Client B.
    - Messages are displayed in real-time as they are received.

---

## 🛠️ Tech Stack

The frontend application is built using modern web technologies:

- **React (Functional Components & Hooks):** For building the user interface.
- **Vite:** A fast build tool for modern web projects.
- **React Router DOM:** For client-side routing between the landing page and client-specific chat interfaces.
- **Socket.IO Client:** For establishing and managing real-time WebSocket connections with the backend services.
- **Axios:** A promise-based HTTP client for making API requests to the backend.

## 🚀 Running Locally

To get the Client B Service up and running on your local machine, follow these steps:

> **Prerequisites:**
>
> - **Node.js** (v18 or higher recommended)
> - The **Client A Service and Client B** Service must be running and accessible. Ensure their respective ports (e.g., 3000 for Client A, 3001 for Client B) are correctly configured in src/app/constants.js.

### 🔧 Install & Run

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ranjith-Prabhakar/Frontend_For_Nest.git
    cd Frontend_For_Nest
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the application:**

    ```bash
    npm run dev
    ```

    The application will typically be accessible at: `http://localhost:5173`

### 🌐 Communication Details

The frontend communicates with the backend services as follows:

- Backend Service URLs: Defined in src/app/constants.js.

  > - `CLIENT_A_SERVICE:` URL for the Client A backend (e.g.,` http://localhost:3000`).
  > - `CLIENT_B_SERVICE:` URL for the Client B backend (e.g.,` http://localhost:3001`).

- REST API Calls (Axios):

  > - **From Client A UI:** `POST` request to `${CLIENT_A_SERVICE}/message-to-b`
  > - **From Client B UI:** `POST` request to `${CLIENT_B_SERVICE}/message-to-a`

- WebSocket Events (Socket.IO):

  > - **Client A UI listens for:** `message-to-client-a` event from `CLIENT_A_SERVICE`
  > - **Client B UI listens for:** `message-to-client-b` event from `CLIENT_B_SERVICE`

### 🌍 Deployment

This frontend application is currently deployed on [Vercel.](https://frontend-for-nest.vercel.app/)
