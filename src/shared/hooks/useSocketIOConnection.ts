import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface IUseSocketIOConnection {
  url: string;
  eventHandlers?: { [event: string]: (data: any) => void };
}

const useSocketIOConnection = ({
  url,
  eventHandlers,
}: IUseSocketIOConnection) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const socketClient = (socketUrl: string) => {
    const socket = io(socketUrl, {
      reconnection: true,
      autoConnect: true,
      transports: ["websocket"],
    });

    socket.connect();

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    
    // Register custom event handlers
    /* EXAMPLE
    const eventHandlers = {
      "chat:message": (message: any) => {
        console.log("message here from chat:message");
      },
      "chat:data": (message: any) => {
        console.log("data");
      },
    };
      
    Then, We got
    socket.on(chat:message, (message) => {
        console.log('message here from chat:message');
    }

    socket.on(chat:message, (message) => {
        console.log('data');
    }
    },
    */

    if (eventHandlers) {
      Object.keys(eventHandlers).forEach((event) => {
        socket.on(event, eventHandlers[event]);
      });
    }

    socket.on("connect_error", async (err) => {
      console.log(`connect_error : ${err.message}`);
    });
  };

  const handleEmitEvent = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  useEffect(() => {
    socketClient(url);
    // Cleanup on component unmount for every event
    return () => {
      if (eventHandlers) {
        Object.keys(eventHandlers).forEach((event) => {
          socketRef.current?.off(event);
        });
      }

      socketRef.current?.disconnect();
    };
  }, [url]);

  return {
    socket: socketRef.current,
    isConnected: isConnected || socketRef.current?.connected,
    handleEmitEvent,
  };
};

export default useSocketIOConnection;
