import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();

const ContextProvider = ({ children }) => {
  const [useradd, setUserAdd] = useState("");
  const [update, setUserUpdate] = useState("");
  const [deletee, setDelete] = useState("");
  return (
    <>
      <addData.Provider value={{ useradd, setUserAdd }}>
        <updateData.Provider value={{update, setUserUpdate }}>
        <deleteData.Provider value={{deletee, setDelete}}>

          {children}
        </deleteData.Provider>
          
        </updateData.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
