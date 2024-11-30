import React from 'react'
import FadeLoader from "react-spinners/FadeLoader";

function Loading({height}:{height?:number}) {
  return (
    <div>
        <div className="flex justify-center items-center" style={{ height: height??"auto" }}>
            <FadeLoader
                color="#6E62E5"
                speedMultiplier={2}
                radius={10}
            />
        </div>
    </div>
  )
}

export default Loading