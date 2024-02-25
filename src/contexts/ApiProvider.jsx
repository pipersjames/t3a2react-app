import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const ApiContext = createContext();

export function ApiProvider(props) {
  let [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API_URL);

  const jwt = Cookies.get('jwt')

  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl, jwt }}>
      {props.children}
    </ApiContext.Provider>
  );
}