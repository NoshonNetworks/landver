'use client'
import { useLoginStore } from "@/store/loginStore";
import MyCollectionsClientView from "@/views/client/MyCollections";

export default function Dashboard() {
  const loginStore = useLoginStore()

  return (
    <>
      { loginStore.userType=="owner" && <MyCollectionsClientView /> }
    </>    
  );
}

