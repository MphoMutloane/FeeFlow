import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

// 1. Creates the storage room
export const AppContext = createContext()

// 2. Creates the provider component that guards the storage room
export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const value = {
        // This is WHERE you'll put shared data
        // Example: user, fees, theme, etc.

        currency,
        navigate

    }
    return (
        // 3. Makes the storage room available to all children
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}