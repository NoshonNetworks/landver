import { useAccount, useBalance } from "@starknet-react/core";
export default function Balance() {
  // const { address } = useAccount();
  // const { data, error } = useBalance({ address });
  // console.log(data);

  return (
    <>
      <div className="flex gap-x-3 items-center text-[#6F6F6F] text-base leading-6">
       
        <div className="w-[1px] h-3 rounded bg-[#D9D9D9]"></div>
        <h4 className="font-semibold">hi</h4>
      </div>
    </>
  );
}
