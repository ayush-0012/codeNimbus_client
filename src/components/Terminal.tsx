import { useEffect, useRef, useState } from "react";
import "@xterm/xterm/css/xterm.css";
import "../terminal.css";

// Importing addons
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { SearchAddon } from "@xterm/addon-search";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { ImageAddon } from "@xterm/addon-image";
import socket from "@/utils/socket";

const XTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null); // Changed to HTMLDivElement
  const [height, setHeight] = useState<number>(400);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);
  const termRef = useRef<Terminal | null>(null); // Store terminal instance

  //Terminal
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
      },
    });
    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    term.focus(); // Add focus immediately

    // Store terminal reference
    termRef.current = term;

    // Add click handler to the terminal div
    terminalRef.current.addEventListener("click", () => {
      term.focus();
    });

    term.onData((data) => {
      console.log("Terminal input:", data);
      socket.emit("terminal:write", data);
    });

    socket.on("terminal:data", (data) => {
      console.log("Terminal output:", data);
      term.write(data);
    });

    // Initial prompt to test
    term.writeln("Welcome to terminal!");
    term.write("$ ");

    socket.emit("terminal:write", "");

    // Cleanup function
    return () => {
      socket.off("terminal:data");
      term.dispose();
      termRef.current = null;
    };
  }, []);

  // Resize terminal when height changes
  useEffect(() => {
    if (termRef.current) {
      const fitAddon = new FitAddon();
      termRef.current.loadAddon(fitAddon);
      setTimeout(() => fitAddon.fit(), 100);
    }
  }, [height]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsResizing(true);
    startYRef.current = e.clientY;
    startHeightRef.current = height;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isResizing) return;

      const deltaY: number = startYRef.current - e.clientY;
      const newHeight: number = Math.max(
        200,
        Math.min(window.innerHeight * 0.8, startHeightRef.current + deltaY)
      );
      setHeight(newHeight);
    };

    const handleMouseUp = (): void => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, height]);

  return (
    <div
      ref={containerRef}
      className="terminal-container"
      style={{ height: `${height}px` }}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div
          className="resize-handle"
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            top: "-3px",
            left: 0,
            right: 0,
            height: "6px",
            cursor: "n-resize",
            zIndex: 10,
          }}
        />
        <div className="terminal-title">Terminal</div>
      </div>

      {/* This is where the actual xterm.js terminal will render */}
      <div
        ref={terminalRef}
        className="xterm-container"
        style={{
          flex: 1,
          padding: "8px",
          overflow: "hidden",
        }}
        onClick={() => termRef.current?.focus()}
      />
    </div>
  );
};

export default XTerminal;
