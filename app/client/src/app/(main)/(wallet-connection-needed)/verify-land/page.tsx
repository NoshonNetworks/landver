'use client'
import { useLoginStore } from "@/store/loginStore";
import { VerifyLandInspectorView } from "@/views/inspector/VerifyLand";

export default function Dashboard() {
  const loginStore = useLoginStore()

  return (
    <div className="">
      { loginStore.userType=="inspector" && <VerifyLandInspectorView /> }
    </div>
  );
}
