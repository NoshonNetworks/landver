import Image from "next/image";

export function Searchbar () {
    return (
    <div className="relative w-full flex">
        <div className="flex justify-center items-center absolute top-0 bottom-0 left-1 w-[30px]">
          <Image width={22} height={22} alt="search" src={"/icons/common/search.svg"} className="" />
        </div>
        <input value={""} onChange={()=>{}} placeholder="Search..."  className="bg-gray-100 border border-none outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 " />
    </div>
    )
}