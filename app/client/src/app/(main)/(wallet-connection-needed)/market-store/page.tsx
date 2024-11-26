'use client'
import { useLoginStore } from "@/store/loginStore";
import MarketStoreClientView from "@/views/client/MarketStore";

export default function Dashboard() {
  const loginStore = useLoginStore()

  return (
    <>
      { loginStore.userType=="owner" && <MarketStoreClientView /> }
    </>    
  );
}

