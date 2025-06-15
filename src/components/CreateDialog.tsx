import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setContainerId } from "@/redux/feature/container/containerSlice";
import { useNavigate } from "react-router-dom";
import { setLang } from "@/redux/feature/langs/langOptionsSlice";
import { Bounce, toast } from "react-toastify";
import { axiosInstance } from "@/utils/axiosInstace";
import { setFileId } from "@/redux/feature/file/fileSlice";

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateDialog({ open, onOpenChange }: CreateDialogProps) {
  const [activeTab, setActiveTab] = useState<"languages" | "frameworks">(
    "languages"
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null); //for language/framework
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  console.log(activeTab);

  const handleCreate = async () => {
    const type = activeTab === "languages" ? "Language" : "Framework";
    console.log("Type:", type);
    console.log("Selected:", selectedOption);
    console.log("File Name:", fileName);

    if (selectedOption) {
      dispatch(setLang(selectedOption));
      sessionStorage.setItem("lang", selectedOption);
    }

    setLoading(true);

    let resStatusCode: number = 0;

    try {
      const response = await axiosInstance.post(`/api/container/create`, {
        fileName,
        language: selectedOption,
        userId,
      });

      //storing response ids in vars
      const containerId = response.data.containerId;
      const fileId = response.data.file.fileId;

      if (containerId && fileId) {
        //dispatching ids in redux
        dispatch(setContainerId(containerId));
        dispatch(setFileId(fileId));

        //storing ids in session for rehydrating redux on page refresh
        sessionStorage.setItem("fileId", fileId);
        sessionStorage.setItem("containerId", containerId);
      } else {
        toast.error("unable to create workspace", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error: any) {
      console.log(error.response.data.clientMsg);
      // console.log(error.response.status);
      resStatusCode = error.response.status;

      //toast error
      toast.error(error.response.data.clientMsg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);

      if (resStatusCode === 429) {
        return;
      } else {
        if (activeTab == "languages") {
          navigate("/workspace");
        } else {
          navigate(`/workspace/${selectedOption}`);
        }
      }
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Choose a category and give your file a name to start.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="languages"
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "languages" | "frameworks")
            }
            className="w-full mt-4"
          >
            {/* Tabs List */}
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger value="languages" className="cursor-pointer">
                Programming Languages
              </TabsTrigger>
              <TabsTrigger value="frameworks" className="cursor-pointer">
                Frameworks
              </TabsTrigger>
            </TabsList>

            {/* TabsContent wraps around shared UI below */}
            <TabsContent value="languages">
              {/* File Name Input */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fileName" className="text-right">
                    File Name
                  </Label>
                  <Input
                    id="fileName"
                    className="col-span-3"
                    placeholder="e.g. xyz"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>

                {/* Language Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Language</Label>
                  <Select onValueChange={(value) => setSelectedOption(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javaScript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      {/* <SelectItem value="sql">Sql</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="frameworks">
              {/* File Name Input */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fileName" className="text-right">
                    File Name
                  </Label>
                  <Input
                    id="fileName"
                    className="col-span-3"
                    placeholder="e.g. xyz"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>

                {/* Framework Dropdown */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Framework</Label>
                  <Select onValueChange={(value) => setSelectedOption(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reactJs">React</SelectItem>
                      <SelectItem value="nextJs">Next.js</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="django">Django</SelectItem>
                      <SelectItem value="flask">Flask</SelectItem>
                      {/* <SelectItem value="express">Express</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              type="submit"
              onClick={handleCreate}
              className="cursor-pointer"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <ToastContainer /> */}
    </>
  );
}

export default CreateDialog;
