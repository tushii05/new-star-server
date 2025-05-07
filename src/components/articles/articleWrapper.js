"use client";
import { createContext } from "react";
import Article from "./article";
export const ArticleWrapperContext = createContext({
  params: {},
  data: {},
  session: {},
});
export default function ArticleWrapper({ params, data, session }) {
  return (
    <ArticleWrapperContext.Provider value={{ params, data, session }}>
      <Article params={params} data={data} session={session} />
    </ArticleWrapperContext.Provider>
  );
}
