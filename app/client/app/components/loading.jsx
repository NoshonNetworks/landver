import { ClipLoader } from "react-spinners";

export default function Loading({ message }) {
  return (
    <div className="w-full flex flex-col items-center gap-y-2 h-[80vh] justify-center font-medium text-lg">
      <ClipLoader size={100} color="#5B9EF7" />
      <h3>{message}...</h3>
    </div>
  );
}
