import React from "react";
import CollectionsTableRow from "./CollectionsTableRow";
import { Land } from "@/app/utils/types";

const dummyLands: Land[] = [
  {
    num: 1,
    id: "56037-XDER",
    name: "Banana Island",
    price: "0.2345",
    date: "20/11/24",
    status: "bought",
  },
  {
    num: 2,
    id: "56037-XDER",
    name: "Banana Island",
    price: "12.0145",
    date: "12/10/24",
    status: "unapproved",
  },
  {
    num: 3,
    id: "56037-XDER",
    name: "Banana Island",
    price: "1.8925",
    date: "23/09/24",
    status: "approved",
  },
];

function CollectionsTable() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="grid grid-cols-[auto_1.9fr_3.4fr_2.1fr_1.3fr_1.2fr_auto] gap-x-3 uppercase text-xs font-bold text-[#7E8299] pb-4 border-b-[#7E82994D] border-b-[1px] border-dashed">
        <div>No</div>
        <div>Land ID</div>
        <div>Land Name</div>
        <div>Price</div>
        <div>Date</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      {dummyLands.map((land, id) => (
        <CollectionsTableRow land={land} />
      ))}
    </div>
  );
}

export default CollectionsTable;
