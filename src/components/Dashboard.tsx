import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import { Button } from "./ui/button";
import { Github, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { ModeToggle } from "./ui/mode-toggle";
import CreateDialog from "./CreateDialog";
import { Bounce, ToastContainer } from "react-toastify";
import { axiosInstance } from "@/utils/axiosInstace";

interface userObj {
  userId: string;
  userName: string | null;
  email: string | undefined;
  profilePic: string;
}

function Dashboard() {
  const [CurrUser, setCurrUser] = useState<userObj>();
  const [createDialog, setCreateDialog] = useState<boolean>(false);

  const { user, isSignedIn, isLoaded } = useUser();

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

      <div className="flex w-full">
        <div className="">
          <SidebarProvider>
            <AppSidebar />
            {/* <SidebarTrigger className="p-2 rounded-lg transition" /> */}
          </SidebarProvider>
        </div>

        <div className="mt-10 ml-10 w-full-100">
          <h1 className="text-4xl font-semibold">Recent</h1>
          <p className=" text-xl mt-8">Pick up where you left off</p>

          <div className="mt-20 text-3xl">render workspace later</div>

          {createDialog ? (
            <CreateDialog open={createDialog} onOpenChange={setCreateDialog} />
          ) : (
            ""
          )}
        </div>
      </div>
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
