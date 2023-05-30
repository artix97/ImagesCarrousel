import React, { useContext } from "react";
import ResultSwiper from "./ResultSwiper";
import ResultStateContext from "./GlobalState";
import ResultSkeleton from "./components/Form/ResultSkeleton";

function Result() {
  const { resultVisible, setResultVisible,setResultData, resultData, isLoading } = useContext(ResultStateContext);
  const handleResultsClose = () =>{
    setResultVisible(false)
    setResultData(null)
  }
  return (
    // relative w-full h-full flex mb-[20rem] md:mb-0 items-end md:items-center  max-h-full mx-auto
    <div className={`${resultVisible? "block":"hidden"}`}>
      <div
        className="fixed h-[70vh] z-50 bottom-0 rounded-t-3xl md:mx-auto md:max-w-4xl left-0 right-0  w-full p-3 overflow-hidden transition-transform bg-white dark:bg-gray-800 transform-none"
        tabIndex="-1"
        aria-labelledby="drawer-bottom-label"
      > 
      <div className="h-16 flex justify-between items-center text-gray-500">
        <div className="text-lg">There are {resultData.total_results === 0 ? "no": resultData.total_results} results for: {resultData.quote} {resultData.color !== "unset" ? "with specify Color: " + resultData.color:""}</div>
        <button
          onClick={()=> {handleResultsClose()}}
          type="button"
          data-drawer-hide="drawer-bottom-example"
          aria-controls="drawer-bottom-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="md:w-10 md:h-10 w-10 h-10"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        </div>
       
            {resultData && !isLoading? <ResultSwiper/>:<ResultSkeleton/> }
          
        
      </div>
    </div>
  );
}

export default Result;
