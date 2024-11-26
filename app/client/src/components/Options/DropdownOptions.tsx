'use client'

export const DropdownOptions = ({ show, onClose, options }:{ show:boolean, onClose:()=>void, options: { label:string, action:()=>void }[] }) => {

  return (
    <>
      {
        show && (
          <div className="text-left origin-top-right transition-all absolute right-0 left-0 top-[110%] bg-white shadow-md shadow-gray-400 rounded-xl px-1 py-2" style={{ transform:`scale(${true?"1":"0"})`, zIndex:10000 }}>
            {
              options.map((opt, index) => {
                return (
                  <p key={"dropdownoptionsfdfads"+index} onClick={()=>{opt.action(); onClose()}} className="cursor-pointer font-normal text-gray-500">{ opt.label }</p>
                )
              })
            }
          </div>
        )
      }
    </>
  );
}
