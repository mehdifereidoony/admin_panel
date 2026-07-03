import { createContext, useContext, useState } from "react";

const brandsContext = createContext();

export const useBrands = () => useContext(brandsContext);

const BrandsProvider = ({ children }) => {
  const [edited, setEdited] = useState(null);
  return (
    <brandsContext.Provider value={{ edited, setEdited }}>
      {children}
    </brandsContext.Provider>
  );
};

export default BrandsProvider;
