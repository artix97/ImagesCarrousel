import React, { useContext, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import ColorPicker from "./ColorPickerIcon";
import ResetColorIcon from "./ResetColorIcon";
import ResultStateContext from "../../GlobalState";
import { useFormik } from "formik";
import * as Yup from "yup";
const quoteSchema = Yup.object({
  quote: Yup.string().required("Fill this area"),
});

const backgroundLogicInitState = {
  value: "",
  hide: false,
  partPlaceholder: "",
  placeholder: "",
  index: 0,
};

const placeholderSuggestions = [
  { title: "Tropical Forest" },
  { title: "Everest Mountains" },
  { title: "Blue Frog" },
];
const useAnimatedPlaceholder = (value, options) => {
  const [state, setState] = useState(backgroundLogicInitState);
  useEffect(() => {
    let timeout;

    if (value) {
      setState(backgroundLogicInitState);
    } else {
      if (state.placeholder === state.partPlaceholder) {
        timeout = setTimeout(() => {
          let nextIndex = state.index + 1;
          if (nextIndex >= placeholderSuggestions.length) {
            nextIndex = 0;
          }
          const option = options[state.index];
          setState((state) => ({
            ...state,
            index: nextIndex,
            placeholder: option.title,
            hide: true,
          }));
        }, 2000);
      } else {
        timeout = setTimeout(
          () => {
            setState((state) => ({
              ...state,
              partPlaceholder: state.hide
                ? state.placeholder[0]
                : state.partPlaceholder +
                  state.placeholder[state.partPlaceholder.length],
              hide: false,
            }));
          },
          state.hide ? 500 : 200
        );
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [value, state, options]);

  return [state.partPlaceholder];
};

export default function SearchInput() {
  // const [color, setColor] = useState("unset");
  const { setResultVisible, isLoading, setIsLoading, setResultData, resultData , client, color, setColor } =
    useContext(ResultStateContext);

  const [picker, setPicker] = useState(false);

  const formik = useFormik({

    initialValues: {
      quote: "",
    },
    validationSchema: quoteSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      client.photos
        .search({
          query: values.quote,
          per_page: 50,
          color: color.replace("#",""),
          size: "large2x",
          page: 1,
        })
        .then((photos) => {
          console.log(photos)
          setResultData({
            quote: values.quote,
            color: color,
            page: photos.page,
            imagesArray: photos.photos,
            nextPage: photos.next_page,
            total_results: photos.total_results,
          });
          console.log({resultData})
        });
      setResultVisible(true);
      setIsLoading(false);
      resetForm();
    },
  });
  const [placeholder] = useAnimatedPlaceholder(
    formik.values.quote,
    placeholderSuggestions
  );

  const handleColorChange = (e) => {
    setPicker(!picker);
    setColor(e.hex);
  };
  const handleColorReset = () => {
    setPicker(!picker);
    setColor("unset");
  };

  return (
    <form  onSubmit={formik.handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          disabled={isLoading ? true : false}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values.quote}
          name="quote"
          type="search"
          className={`${
            formik.errors.quote ? "border-red-500" : "border-blue-300"
          } block w-full p-4 pl-10 text-[1.5rem] text-gray-900 border  border-blue-300 rounded-lg bg-gray-50 focus:border-blue-500 focus:outline-none`}
        />
        <div className="right-2.5 bottom-2.5 absolute flex items-center gap-2">
          <ColorPicker
            style={{ color: color }}
            onClick={() => setPicker(!picker)}
          />

          <button
            type="submit"
            className="text-white   bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-[1.5rem] px-4 py-2 "
          >
            {isLoading ? "Wait..." : "Explore"}
          </button>
        </div>
      </div>
      <div
        className="mt-1 flex row "
        style={{
          opacity: `${picker ? 1 : 0}`,
          transition: "opacity 1s linear",
        }}
      >
        <TwitterPicker
          triangle="hide"
          id="color"
          onChange={(event) => handleColorChange(event)}
          width="100%"
        />

        <div className="relative">
          <ResetColorIcon
            onClick={handleColorReset}
            className="flex items-center absolute  right-[25px] top-[10px]"
          />
        </div>
      </div>
    </form>
  );
}
