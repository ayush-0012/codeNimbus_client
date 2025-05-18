import { useRef } from "react";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TerminalIcon, Code, Play } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstace";
import { markIdle } from "@/utils/markIdle";
import SessionExpired from "./modal/SessionExpired";

function WorkSpace() {
  const selectedOption = useAppSelector((state) => state.selectedOption.lang);
  const containerId = useAppSelector((state) => state.container.containerId);
  const [code, setCode] = useState<string>();
  const [terminalOutput, setTerminalOutput] = useState<string>(`
    "Terminal initialized...",
    "Python 3.9.2",
    "> ",`);
  const [terminalInput, setTerminalInput] = useState("");
  const [theme, setTheme] = useState("dracula");
  const [fontSize, setFontSize] = useState(16);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [idleContainer, setIdleContainer] = useState<boolean>(false);

  const userId: string | null = localStorage.getItem("userId");
  const IDLE_TIMEOUT: number = 60 * 1000;

  useEffect(() => {
    resetIdleTime();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     //creating a resize event
  //     window.dispatchEvent(new Event("resize"));
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  function onChange(newValue: string): void {
    setCode(newValue);

    console.log(code);
  }

  // function handleTerminalSubmit(e: React.KeyboardEvent) {
  //   if (e.key === "Enter") {
  //     const newOutput = [...terminalOutput];
  //     newOutput[newOutput.length - 1] = "> " + terminalInput;
  //     newOutput.push("> ");
  //     setTerminalOutput(newOutput);
  //     setTerminalInput("");
  //   }
  // }

  if (!containerId) console.log("no container id");
  else console.log(containerId);

  // async function markIdle() {
  //   try {
  //     const response = await axiosInstance.patch("/api/container/status", {
  //       containerId,
  //       userId,
  //     });

  //     console.log(response);
  //   } catch (error) {
  //     console.log("Error occured while marking the container Idle");
  //   }
  // }

  function resetIdleTime() {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(async () => {
      console.log("user is inactive, making api call");
      const status = await markIdle(containerId, userId);
      setIdleContainer(true);
      console.log(status);
    }, IDLE_TIMEOUT);

    return IDLE_TIMEOUT;
  }

  async function executeCode() {
    console.log(resetIdleTime());
    console.log(selectedOption);
    try {
      const response: any = await axiosInstance.post("/api/container/exec", {
        containerId,
        userId,
        language: selectedOption,
        code,
      });

      console.log(response);
      setTerminalOutput(response.data.output);
    } catch (error) {
      console.log("error running code", error);
    }
  }

  // if (idleContainer) {
  //   return <SessionExpired isIdle={true} />;
  // }

  return (
    <div className="flex flex-col h-screen bg-[#0d1117]">
      {/* Header with controls */}
      <div className="border-b border-[#30363d] p-3 bg-[#161b22] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-medium text-[#e6edf3] text-lg">Workspace</h1>
          <div className="flex space-x-1">
            {/* <button className="p-1.5 rounded hover:bg-[#30363d] text-[#58a6ff]">
              <Settings size={16} />
            </button> */}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Themes Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 bg-[#21262d] border border-[#30363d] rounded text-[#c9d1d9] text-sm hover:bg-[#30363d] transition-colors">
              Themes
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#21262d] border border-[#30363d] rounded text-[#c9d1d9]">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setTheme("dracula")}
                className={
                  theme === "dracula" ? "bg-[#30363d] font-medium" : ""
                }
              >
                {theme === "dracula" && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                Dracula
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setTheme("monokai")}
                className={
                  theme === "monokai" ? "bg-[#30363d] font-medium" : ""
                }
              >
                {theme === "monokai" && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                Monokai
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setTheme("nord_dark")}
                className={
                  theme === "nord_dark" ? "bg-[#30363d] font-medium" : ""
                }
              >
                {theme === "nord_dark" && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                Nord Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setTheme("one_dark")}
                className={
                  theme === "one_dark" ? "bg-[#30363d] font-medium" : ""
                }
              >
                {theme === "one_dark" && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                One Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size Dropdown*/}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 bg-[#21262d] border border-[#30363d] rounded text-[#c9d1d9] text-sm hover:bg-[#30363d] transition-colors">
              {fontSize}px
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#21262d] border border-[#30363d] rounded text-[#c9d1d9]">
              <DropdownMenuLabel>Font Size</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setFontSize(14)}
                className={fontSize === 14 ? "bg-[#30363d] font-medium" : ""}
              >
                {fontSize === 14 && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                14px
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setFontSize(16)}
                className={fontSize === 16 ? "bg-[#30363d] font-medium" : ""}
              >
                {fontSize === 16 && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                16px
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setFontSize(18)}
                className={fontSize === 18 ? "bg-[#30363d] font-medium" : ""}
              >
                {fontSize === 18 && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                18px
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setFontSize(20)}
                className={fontSize === 20 ? "bg-[#30363d] font-medium" : ""}
              >
                {fontSize === 20 && (
                  <span className="mr-2 text-[#58a6ff]">&#10003;</span>
                )}
                20px
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {idleContainer && <SessionExpired isIdle={true} />}

      {/* Main content area */}
      <div className="flex-grow p-4 bg-[#0d1117] flex">
        {/* Code Editor Section */}
        <div className="flex-1 mr-2 flex flex-col rounded-md overflow-hidden border border-[#30363d]">
          <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] flex items-center">
            <Code size={18} className="text-[#58a6ff] mr-2" />
            <div className="flex justify-between w-full items-center">
              <span className="text-[#c9d1d9] font-medium text-lg">
                main.py
              </span>
              {/* button to run code */}
              <button
                className="p-1.5 rounded hover:bg-[#30363d] text-[#58a6ff] cursor-pointer"
                onClick={executeCode}
              >
                <Play size={18} />
              </button>
            </div>
          </div>
          <div className="flex-grow">
            <AceEditor
              mode="python"
              theme={theme}
              onChange={onChange}
              name="code_editor"
              fontSize={fontSize}
              width="100%"
              height="100%"
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
                useSoftTabs: true,
                fadeFoldWidgets: true,
                showFoldWidgets: true,
                highlightSelectedWord: true,
                animatedScroll: true,
                scrollPastEnd: false,
                displayIndentGuides: true,
              }}
              editorProps={{
                $blockScrolling: true,
                $fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
              style={{
                borderRadius: "0",
                backgroundColor: "#0d1117",
              }}
            />
          </div>
        </div>

        {/* Terminal Section */}
        <div className="flex-1 ml-2 flex flex-col rounded-md overflow-hidden border border-[#30363d]">
          <div className="bg-[#161b22] px-3 py-2 border-b border-[#30363d] flex items-center">
            <TerminalIcon size={16} className="text-[#58a6ff] mr-2" />
            <span className="text-[#c9d1d9] font-medium">Terminal</span>
          </div>
          <div className="grid mr-14 p-3 bg-[#0d1117] text-[#c9d1d9] font-mono overflow-y-auto">
            {terminalOutput}
            <span className="mt-10 text-gray-500">
              === executed the code ===
            </span>
          </div>
        </div>
      </div>

      {/* Status bar */}
      {/* <div className="border-t border-[#30363d] p-2 bg-[#161b22] text-[#8b949e] text-xs flex justify-between">
        <div>Python 3.9.2</div>
        <div>
          {containerId
            ? `Container: ${containerId.substring(0, 5)}`
            : "No container"}
        </div>
      </div> */}
    </div>
  );
}

export default WorkSpace;
