'use client'
import { useLoginStore } from "@/store/loginStore";
import { DashboardClientView } from "@/views/client/Dashboard";
import { DashboardInspectorView } from "@/views/inspector/Dashboard";

export default function Dashboard() {
  const loginStore = useLoginStore()

  return (
    <>
      { loginStore.userType=="owner" && <DashboardClientView /> }
      { loginStore.userType=="inspector" && <DashboardInspectorView /> }
    </>    
  );
}

