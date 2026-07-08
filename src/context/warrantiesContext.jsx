import { createContext, useContext, useState } from "react";

const warrantiesContext = createContext();

export const useWarranties = () => useContext(warrantiesContext);

const WarrantiesProvider = ({ children }) => {
  const [edited, setEdited] = useState(null);
  return (
    <warrantiesContext.Provider value={{ edited, setEdited }}>
      {children}
    </warrantiesContext.Provider>
  );
};

export default WarrantiesProvider;
