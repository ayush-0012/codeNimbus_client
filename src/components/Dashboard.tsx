import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import { Button } from "./ui/button";
import { Github, Plus, UserRoundIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ModeToggle } from "./ui/mode-toggle";
import CreateDialog from "./CreateDialog";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "@/utils/axiosInstace";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setContainerId } from "@/redux/feature/container/containerSlice";
import { setFileId } from "@/redux/feature/file/fileSlice";
import { setLang } from "@/redux/feature/langs/langOptionsSlice";

interface userObj {
  userId: string;
  userName: string | null;
  email: string | undefined;
  profilePic: string;
}

interface userFile {
  fileId: string;
  fileName: string;
  language: string;
  compressedCode: string;
  createdAt: Date;
  userId: string;
}

function Dashboard() {
  const [CurrUser, setCurrUser] = useState<userObj>();
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  const [userFiles, setUserFiles] = useState<userFile[]>([]);

  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(user);

    if (isLoaded && isSignedIn && user) {
      setCurrUser({
        userId: user?.id,
        userName: user?.firstName,
        email: user?.primaryEmailAddress?.emailAddress,
        profilePic: user?.imageUrl,
      });
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    if (CurrUser) {
      storeUser();
      localStorage.setItem("userId", CurrUser.userId);

      //api call to fetch user files
      console.log("userid from state", CurrUser.userId);
      fetchUserFiles();
    }
  }, [CurrUser]);

  async function storeUser() {
    const { userId, userName, email, profilePic } = CurrUser || {};

    if (CurrUser) {
      return;
    } else {
      try {
        const response = await axiosInstance.post(
          "/api/user/signIn",
          {
            userId,
            userName,
            email,
            profilePic,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error, "error storing user");
      }
    }
  }

  async function fetchUserFiles() {
    const response = await axiosInstance.get(
      `/api/user/getFiles?userId=${CurrUser?.userId}`
    );

    console.log(response.data.files);
    setUserFiles(response.data.files);
  }

  // console.log("user files log", userFiles.files.fileId);

  async function createWorkSpace(fileId: string, language: string) {
    let resStatusCode: number = 0;

    try {
      const response = await axiosInstance.post("/api/container/create", {
        fileId,
        userId: CurrUser?.userId,
        language,
      });

      console.log(response);

      const containerId = response.data.containerId;
      // const file = response.data.file.fileId;

      dispatch(setContainerId(containerId));
      dispatch(setFileId(fileId));
      dispatch(setLang(language));

      sessionStorage.setItem("fileId", fileId);
      sessionStorage.setItem("containerId", containerId);
      sessionStorage.setItem("lang", language);
    } catch (error: any) {
      console.log(error);

      resStatusCode = error.response.status;

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
      if (resStatusCode === 429) {
        return;
      } else {
        navigate("/workspace");
      }
    }
  }

  return (
    <>
      <div className="flex justify-end h-10 pt-4 px-2">
        <div className="flex justify-between items-center gap-3">
          {/* <ModeToggle /> */}
          <Input
            type="text"
            placeholder="Seach in Workspace"
            className="border-none "
          />

          <div>
            <Button className="cursor-pointer">
              <Github />
              <span>Import</span>
            </Button>
          </div>
          <div>
            {/* <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger> */}
            <Button
              className="cursor-pointer"
              onClick={() => setCreateDialog(true)}
            >
              <Plus />
              <span>Create</span>
            </Button>
          </div>
          <div className=" w-10 h-10 flex justify-center items-center text-2xl">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      <div className="flex">
        <SidebarProvider className="w-70">
          <AppSidebar />
          <SidebarTrigger className="p-2 rounded-lg transition" />
        </SidebarProvider>

        <div className="mt-10 ml-10 w-full-100 h-70">
          <h1 className="text-4xl font-semibold">Recent</h1>
          <p className=" text-xl mt-8">Pick up where you left off</p>

          <div className="mt-20 text-3xl">render workspace later</div>

          {createDialog ? (
            <CreateDialog open={createDialog} onOpenChange={setCreateDialog} />
          ) : (
            ""
          )}

          <div className="text-white mt-10 cursor-pointer">
            {userFiles.map((file) => (
              <div
                key={file.fileId}
                className="border-b border-b-white mb-2"
                onClick={() => createWorkSpace(file.fileId, file.language)}
              >
                {file.fileName}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="w-full"> */}

      {/* </div> */}

      <ToastContainer
        position="top-center"
        autoClose={false}
        limit={1}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default Dashboard;
