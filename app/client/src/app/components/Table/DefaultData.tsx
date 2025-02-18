export type Payment = {
  id: string;
  amount: number;
  status: "approved" | "unapproved" | "bought";
  name: string;
};

export const TableData: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "approved",
    name: "Banana Island",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "approved",
    name: "Badagry",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unapproved",
    name: "Gbagada",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "approved",
    name: "Lekki",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "bought",
    name: "Ikeja",
  },
  {
    id: "m5gr84i9",
    amount: 316,
    status: "approved",
    name: "Surulere",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "approved",
    name: "Badagry",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "unapproved",
    name: "Gbagada",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "approved",
    name: "Lekki",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "bought",
    name: "Ikeja",
  },
];
