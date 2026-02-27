import React, { createContext } from "react";

// 1. Creates the storage room
export const AppContext = createContext()

// 2. Creates the provider component that guards the storage room
export const AppContextProvider = (props) => {
    const value = {
        // This is WHERE you'll put shared data
        // Example: user, fees, theme, etc.
    }
    return (
        // 3. Makes the storage room available to all children
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}