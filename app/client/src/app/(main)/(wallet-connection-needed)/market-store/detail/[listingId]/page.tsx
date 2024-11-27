'use client'
import { useLoginStore } from "@/store/loginStore";
import { MarketStoreDetailClientView } from "@/views/client/MarketStoreDetail";

export default function Detail() {
  const loginStore = useLoginStore()

  return (
    <>
      { loginStore.userType=="owner" && <MarketStoreDetailClientView /> }
    </>    
  );
}

