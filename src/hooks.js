import { useState } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid";

/* Toggle boolean flip state for a card. */
function useFlip(initialFlipState = true) {
  const [isFlipped, setIsFlipped] = useState(initialFlipState);
  const flip = () => setIsFlipped(isUp => !isUp);
  return [isFlipped, flip];
}

/* Reusable axios hook. Accepts a base url and optional formatter
 * to shape response data before storing it. */
function useAxios(baseUrl, formatData = data => data) {
  const [data, setData] = useState([]);

  const addData = async (urlSuffix = "") => {
    const response = await axios.get(
      `${baseUrl}${typeof urlSuffix === "string" ? urlSuffix : ""}`
    );
    setData(data => [...data, { ...formatData(response.data), id: uuid() }]);
  };

  const clearData = () => setData([]);

  return [data, addData, clearData];
}

export { useFlip, useAxios };
