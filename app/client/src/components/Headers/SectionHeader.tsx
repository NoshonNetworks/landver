'use client'

export const SectionHeader = ({ title, titleSize, buttonMessage,  }:{ title:string, titleSize?:"xs"|"sm"|"base"|"lg"|"xl"|"2xl"|"3xl", buttonMessage?:string }) => {

  return (
    <>
    <div className="flex justify-between">
      <p className={`text-${titleSize??"2xl"} font-semibold`}>{ title }</p>
      <p className="font-normal text-gray-400">{ buttonMessage }</p>
    </div>
    </>
  );
}
