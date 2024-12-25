'use client'
import { useLoginStore } from "@/store/loginStore";
import { LandsInspectorView } from "@/views/inspector/Lands";

export default function Dashboard() {
  const loginStore = useLoginStore()

  return (
    <div className="">
      { loginStore.userType=="inspector" && <LandsInspectorView /> }
    </div>
  );
}
