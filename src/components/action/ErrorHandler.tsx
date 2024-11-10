"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAppDispatch } from "@/src/redux/hooks";
import { logout } from "@/src/redux/features/auth/authSlice";
import { TError } from "@/src/types/global";

interface ErrorHandlerProps {
  error: TError | null;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
      const err = error as TError;

      toast.warning(err?.data?.message || "An error occurred");

      if (err?.status === 401) {
        // Handle unauthorized error by logging out and redirecting to login
        dispatch(logout());
        router.push("/login");
      }
    }
  }, [error, dispatch, router]);

  return null; // This component doesn’t render anything
};

export default ErrorHandler;
