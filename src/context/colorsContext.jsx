import { createContext, useContext, useState } from "react";

const colorsContext = createContext();

export const useColors = () => useContext(colorsContext);

const ColorsProvider = ({ children }) => {
  const [edited, setEdited] = useState(null);
  return (
    <colorsContext.Provider value={{ edited, setEdited }}>
      {children}
    </colorsContext.Provider>
  );
};

export default ColorsProvider;
