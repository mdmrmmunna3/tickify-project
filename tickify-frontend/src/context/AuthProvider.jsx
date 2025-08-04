import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // loading state

    // Check auth on first load
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(parsedUser);
            } catch (error) {
                console.error('Invalid userInfo in localStorage:', error);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (newToken) => {
        const userData = JSON.parse(newToken);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setToken(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
