import React from "react"

type TModalContext = {
  skipTransiton: boolean
  setSkipTransiton: React.Dispatch<React.SetStateAction<boolean>>,
}

export const ModalContext = React.createContext({} as TModalContext);

export const ModalContextProvider: React.FC<any> = (props) => {

  const[skipTransiton, setSkipTransiton] = React.useState(false)

  const value = {
    skipTransiton,
    setSkipTransiton,
  }

  return (
    <ModalContext.Provider value={value}>
        {props.children}
    </ModalContext.Provider>
  );
};

