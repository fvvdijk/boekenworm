import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const getUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
        return null;
    };

    const getTokenFromLocalStorage = () => {
        const storedToken = localStorage.getItem('token');
        return storedToken ? storedToken : null;
    };

    const saveUserToLocalStorage = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const [user, setUser] = useState(() => getUserFromLocalStorage());
    const [token, setToken] = useState(() => getTokenFromLocalStorage());
    const apiKey = 'boekenworm:byfOaBewbNje38gcGoHw';

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/boekenworm/users/authenticate',
                { username, password },
                { headers: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey } }
            );

            const serverToken = response.data.jwt;
            setUser({ loggedIn: true });
            saveUserToLocalStorage({ loggedIn: true });
            axios.defaults.headers.common['Authorization'] = `Bearer ${serverToken}`;
            setToken(serverToken);
            localStorage.setItem('token', serverToken);

            return serverToken;
        } catch (error) {
            console.error('Login error:', error.message);
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};