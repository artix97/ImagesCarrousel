import React, { useState } from "react";
import ResultSkeleton from "./components/Form/ResultSkeleton";

function ResultImages({src, alt}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
    {loaded? 
        null:
        <ResultSkeleton/>
    }
      <img
        style={loaded ? {} : { display: 'none' } }
        src={src}
        alt={alt}
        className="object-contain md:object-cover"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default ResultImages;
