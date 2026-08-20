import { createContext, useContext, useState } from "react";

const categoriesContext = createContext();

export const useCategories = () => useContext(categoriesContext);

const CategoriesProvider = ({ children }) => {
  const [edited, setEdited] = useState(null);
  return (
    <categoriesContext.Provider value={{ edited, setEdited }}>
      {children}
    </categoriesContext.Provider>
  );
};

export default CategoriesProvider;
