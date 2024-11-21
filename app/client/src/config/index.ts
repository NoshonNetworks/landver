const CONFIG = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
  CONTRACT_ADDRESS:
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
    "0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5",
  NETWORK: process.env.NEXT_PUBLIC_NETWORK || "testnet",
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
};

export default CONFIG;
