import { useMemo } from "react";
import * as blockies from "blockies-ts";

import type { UseBlockiesParams } from "@/types/interfaces";

export function useBlockies({ address }: UseBlockiesParams) {
  const blockiesImageSrc = useMemo(() => {
    if (!address) return "";
    return blockies.create({ seed: address, scale: 16 }).toDataURL();
  }, [address]);

  return { blockiesImageSrc };
}