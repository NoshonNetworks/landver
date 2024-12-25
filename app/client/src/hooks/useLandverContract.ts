import { useContract } from "@starknet-react/core";
import { ABI as LandRegistryABI } from "@/abis/LandRegistryAbi";

import type { UseLandverContractParams } from "@/types/interfaces"; 

const contracts = {
  landRegister: { address:"0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5", abi: LandRegistryABI }
}



export function useLandverContract({ name }: UseLandverContractParams) { 
  const { contract } = useContract({
    abi: contracts[name].abi,
    address: contracts[name].address as `0x${string}`,
  });

  return {
    contract:contract,
    abi: LandRegistryABI
  }
}