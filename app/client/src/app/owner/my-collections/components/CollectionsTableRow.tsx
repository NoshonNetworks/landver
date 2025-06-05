import { Land } from "@/app/utils/types";

function CollectionsTableRow({ land }: { land: Land }) {
  let statusBadgeClasses = () => {
    switch (land.status) {
      case "approved":
        return "bg-[#E8FFF3] text-[#50CD89]";
      case "unapproved":
        return "bg-[#F9F9F9] text-[#7E8299]";
      case "bought":
        return "bg-[#F1FAFF] text-[#00A3FF]";
      default:
        return "";
    }
  };
  return (
    <div className="grid grid-cols-[auto_1.9fr_3.4fr_2.1fr_1.3fr_1.2fr_auto] gap-x-3 text-sm font-bold text-[#3F4254] pb-4 border-b-[#7E82994D] border-b-[1px] border-dashed items-center">
      <div>{land.num}</div>
      <div>{land.id}</div>
      <div className="flex gap-x-2 items-center">
        <img src="/images/avatar.svg" className="w-6 rounded-full h-6" alt="" />
        {land.name}
      </div>
      <div className="flex gap-x-2 items-center">
        <img src="/icons/ethIcon.svg" className="w-6 rounded-full h-6" alt="" />
        {land.price}
      </div>
      <div className="text-[#B5B5C3]">{land.date}</div>
      <div>
        <div
          className={`${statusBadgeClasses()} w-[89px] py-[7px] px-[6px] rounded-lg text-center text-[13px] capitalize`}
        >
          {land.status}
        </div>
      </div>
      <div>
        <button className="w-[39px] bg-[#F9F9F9] py-2 flex justify-center rounded-lg">
          <img src="/icons/moreVertIcon.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default CollectionsTableRow;
