'use client'
import { useLoginStore } from "@/store/loginStore";
import { DashboardClientView } from "@/views/client/Dashboard";

export default function Dashboard() {
  const loginStore = useLoginStore()

  return (
    <>
      { loginStore.userType=="owner" && <DashboardClientView /> }
    </>    
  );
}

