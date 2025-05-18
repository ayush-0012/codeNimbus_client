import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SessionExpired({ isIdle }: { isIdle: boolean }) {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isIdle) {
      setOpen(true);
    }
  }, [isIdle]);

  function handleReturn() {
    setOpen(false);
    navigate("/dashboard");
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Session Expired
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              You've been inactive for a while. Please return to the Dashboard
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleReturn}
              className="bg-white text-black hover:bg-gray-200 cursor-pointer"
            >
              Return to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SessionExpired;
