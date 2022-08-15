import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ currentAccount, setCurrentAccount ] = useState("");
    const [ currentPriKey, setCurrentPriKey ] = useState("");
    const [ client, setClient ] = useState();
    const [ currentNetwork, setCurrentNetwork ] = useState();

    const value = {
        currentAccount, setCurrentAccount,
        currentNetwork, setCurrentNetwork,
        currentPriKey, setCurrentPriKey,
        client, setClient,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
