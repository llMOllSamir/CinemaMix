import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

export let apisContext = createContext(0);

export default function ApisContext(props) {
  let [lang, setLang] = useState("en");
  let baseUrl = "https://api.themoviedb.org/3/";
  let api_key = "041e7a001c421d63403380851a359f87";
  let baseImgurl = "https://image.tmdb.org/t/p/w500";

  let trending = async (mtype, page) => {
    window.scrollTo(0, 0);
    return await axios
      .get(
        baseUrl +
          "trending/" +
          mtype +
          "/week?api_key=" +
          api_key +
          `&page=${page ? page : 1}` +
          `&language=${lang}`
      )
      .then((res) => res)
      .catch((err) => err);
  };

  let trendingId = async (mtype, id) => {
    return await axios
      .get(
        baseUrl +
          mtype +
          "/" +
          id +
          "?api_key=" +
          api_key +
          "&include_video=true" +
          `&language=${lang}`
      )
      .then((res) => res)
      .catch((err) => err);
  };

  return (
    <apisContext.Provider
      value={{ trending, baseImgurl, setLang, lang, trendingId }}
    >
      {props.children}
    </apisContext.Provider>
  );
}
