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

  const socketClient = () => {
    const socket = io({
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected");
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
      //   await fetch("/api/socket");
    });
  };

  const handleEmitEvent = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  useEffect(() => {
    socketClient();
    // return () => {
    //   socketRef?.current?.disconnect();
    // };

    // Cleanup on component unmount
    return () => {
      if (eventHandlers) {
        Object.keys(eventHandlers).forEach((event) => {
          socketRef.current?.off(event);
        });
      }

      socketRef.current?.disconnect();
    };
  }, [url, eventHandlers]);

  return {
    socket: socketRef.current,
    isConnected: isConnected || socketRef.current?.connected,
    handleEmitEvent,
  };
};

export default useSocketIOConnection;
