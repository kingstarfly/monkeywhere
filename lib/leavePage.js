import { useEffect } from "react";
import { useRouter } from "next/router";

export const useLeavePageConfirm = (message = "Reload the page?") => {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      router.reload();
    };

    router.events.on("beforeHistoryChange", handler);

    return () => {
      console.log("Leaving map...");
      router.events.off("beforeHistoryChange", handler);
    };
  }, []);
};
