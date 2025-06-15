import { useAppSelector } from "@/hooks/redux-hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";
import SessionExpired from "./modal/SessionExpired";
import {
  Play,
  Palette,
  Type,
  ChevronDown,
  Check,
  Terminal,
  MoreHorizontal,
  Circle,
} from "lucide-react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import XTerminal from "./Terminal";

function WorkSpaceLibs() {
  const containerId = useAppSelector((state) => state.container.containerId);
  const selectedOption = useAppSelector((state) => state.selectedOption.lang);
  const fileId = useAppSelector((state) => state.file.fileId);
  const [code, setCode] = useState<string>("print('hello')");
  const [terminalOutput, setTerminalOutput] = useState<string>(`
      "Terminal initialized..."`);
  const [terminalInput, setTerminalInput] = useState("");
  const [theme, setTheme] = useState("dracula");
  const [fontSize, setFontSize] = useState(16);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [idleContainer, setIdleContainer] = useState<boolean>(false);

  if (!containerId) console.log("no container id");
  else console.log(containerId);

  const themeOptions = [
    { value: "dracula", label: "Dracula" },
    { value: "monokai", label: "Monokai" },
    { value: "nord_dark", label: "Nord Dark" },
    { value: "one_dark", label: "One Dark" },
  ];

  const fontSizeOptions = [
    { value: 12, label: "12" },
    { value: 14, label: "14" },
    { value: 16, label: "16" },
    { value: 18, label: "18" },
    { value: 20, label: "20" },
    { value: 22, label: "22" },
  ];

  return (
    <>
      <div className="flex">
        <div className="w-100 border-white-2">File Tree</div>
        <div className="flex flex-col h-screen w-full bg-[#0a0a0a] text-[#e4e4e7]">
          {/* Minimal Header */}
          <div className="border-b border-[#1a1a1a] bg-[#0f0f0f] px-6 py-3">
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                <span className="text-[#fafafa] font-medium tracking-tight">
                  Workspace
                </span>
                <span className="text-[#71717a] text-sm">main.py</span>
              </div>
            </div> */}

              {/* Minimal Theme Dropdown */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-1.5 text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#1a1a1a] transition-colors text-sm border-0 bg-transparent">
                  <Palette size={14} />
                  <span>Theme</span>
                  <ChevronDown size={12} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 bg-[#0f0f0f] border border-[#1a1a1a] shadow-2xl">
                  <DropdownMenuLabel className="text-[#71717a] text-xs font-normal px-2 py-1.5">
                    Appearance
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#1a1a1a]" />
                  {themeOptions.map((themeOption) => (
                    <DropdownMenuItem
                      key={themeOption.value}
                      onSelect={() => setTheme(themeOption.value)}
                      className="flex items-center justify-between px-2 py-1.5 text-sm text-[#e4e4e7] hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      <span>{themeOption.label}</span>
                      {theme === themeOption.value && (
                        <Check size={12} className="text-[#10b981]" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}

              {/* Minimal Font Size Dropdown */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-1.5 text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#1a1a1a] transition-colors text-sm border-0 bg-transparent">
                  <Type size={14} />
                  <span>{fontSize}</span>
                  <ChevronDown size={12} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24 bg-[#0f0f0f] border border-[#1a1a1a] shadow-2xl">
                  <DropdownMenuLabel className="text-[#71717a] text-xs font-normal px-2 py-1.5">
                    Size
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#1a1a1a]" />
                  {fontSizeOptions.map((sizeOption) => (
                    <DropdownMenuItem
                      key={sizeOption.value}
                      onSelect={() => setFontSize(sizeOption.value)}
                      className="flex items-center justify-between px-2 py-1.5 text-sm text-[#e4e4e7] hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      <span>{sizeOption.label}</span>
                      {fontSize === sizeOption.value && (
                        <Check size={12} className="text-[#10b981]" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}

              {/* <div className="w-px h-4 bg-[#1a1a1a]"></div> */}

              {/* <button className="p-1.5 text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#1a1a1a] transition-colors">
                <MoreHorizontal size={14} />
              </button> */}
            </div>
          </div>

          {idleContainer && <SessionExpired isIdle={true} />}

          {/* Clean Main Content */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col border-r border-[#1a1a1a]">
              {/* Editor Tab */}
              <div className="border-b border-[#1a1a1a] bg-[#0f0f0f] px-4 py-2">
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Circle size={6} className="text-[#10b981] fill-current" />
                    <span className="text-[#fafafa] text-sm font-medium">
                      main.py
                    </span>
                    <span className="text-[#71717a] text-xs">Python</span>
                  </div>
                </div> */}
                  {/* <button className="flex items-center space-x-2 px-3 py-1 bg-[#1a1a1a] hover:bg-[#262626] text-[#fafafa] text-xs transition-colors">
                  <Play size={12} />
                  <span>Run</span>
                </button> */}
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 bg-[#0a0a0a]">
                <AceEditor
                  mode="python"
                  theme={theme}
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
                    cursorStyle: "smooth",
                    behavioursEnabled: true,
                    wrapBehavioursEnabled: true,
                  }}
                  editorProps={{
                    $blockScrolling: true,
                    $fontFamily:
                      "'Berkeley Mono', 'JetBrains Mono', 'SF Mono', monospace",
                  }}
                  style={{
                    backgroundColor: "#0a0a0a",
                  }}
                />
              </div>
            </div>

            {/* Terminal Panel */}
            {/* <div className="w-80 flex flex-col bg-[#0f0f0f]">
            <div className="border-b border-[#1a1a1a] px-4 py-2">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-[#71717a]" />
                <span className="text-[#fafafa] text-sm font-medium">
                  Terminal
                </span>
              </div>
            </div>
            <div className="flex-1 p-4 font-mono text-sm bg-[#0a0a0a]">
              <div className="text-[#71717a] whitespace-pre-wrap">
                {terminalOutput}
              </div>
            </div>
          </div> */}
          </div>

          {/* Minimal Status Bar */}
          {/* <div className="border-t border-[#1a1a1a] bg-[#0f0f0f] px-4 py-1.5">
          <div className="flex items-center justify-between text-xs text-[#71717a]">
            <div className="flex items-center space-x-4">
              <span>Ln 1, Col 1</span>
              <span>UTF-8</span>
              <span>Python 3.11</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Ready</span>
            </div>
          </div>
        </div> */}

          <XTerminal />
        </div>
      </div>
    </>
  );
}

export default WorkSpaceLibs;
