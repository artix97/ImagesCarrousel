import { useContext } from "react";
import BackgroundCarrousel from "./components/Form/BackgroundCarrousel";
import LogoText from "./components/Form/LogoText";
import SearchInput from "./components/Form/SearchInput";
import Result from "./Result";
import ResultStateContext from "./GlobalState";


function App() {
  const {resultData, isLoading} = useContext(ResultStateContext)
  return (
    <div className="h-full max-h-full w-full fixed font-poppins ">
      <BackgroundCarrousel>
        <div
          id="staticModal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className=" bg-cover bg-no-repeat fixed flex items-center top-0 left-0 righ t-0 z-50  w-full h-full    overflow-hidden md:inset-0 "
        >
          <LogoText/>

          <div className="relative w-full h-full flex mb-[20rem] md:mb-0 items-end md:items-center md:max-w-4xl max-h-full mx-auto">
            <div className="relative bg-white rounded-lg w-full h-fit dark:bg-gray-700 drop-shadow-2xl border-none z-30">
              <div className="p-6 space-y-6 text-[2rem]">
                <p>What's You Looking For?</p>
                <SearchInput/>
              </div>
            </div>
          </div>
        </div>
        {resultData && !isLoading?<Result/> : <></> }
      </BackgroundCarrousel>
    </div>
  );
}

export default App;
