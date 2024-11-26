'use client'
import { useLoginStore } from "@/store/loginStore";
import DetailClientView from "@/views/client/Detail";

export default function Detail() {
  const loginStore = useLoginStore()

  return (
    <>
      { loginStore.userType=="owner" && <DetailClientView /> }
    </>    
  );
}

