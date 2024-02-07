// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialize user state with data from localStorage or null
        const storedUser = localStorage.getItem('user');

        // Check if storedUser is a valid JSON string
        if (storedUser && storedUser !== 'undefined') {
            try {
                // Try parsing storedUser as JSON
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }

        return null; // Return null if storedUser is not a valid JSON string
    });
    const [token, setToken] = useState(null);
    const apikey = 'boekenworm:byfOaBewbNje38gcGoHw';

    // Use effect to set the token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        console.log('Stored Token:', storedToken);

        if (storedToken) {
            setToken(storedToken);
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/boekenworm/users/authenticate',
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': apikey,
                    },
                }
            );

            const { jwt: serverToken } = response.data;

            console.log('Server Token:', serverToken);

            setUser((prevUser) => {
                // Ensure prevUser is an object
                if (prevUser && typeof prevUser === 'object') {
                    return { ...prevUser, loggedIn: true }; // Add loggedIn property or other user properties
                }
                return { loggedIn: true }; // Create a new user object if prevUser is not defined or not an object
            });

            // Save the user data and token to localStorage
            localStorage.setItem('user', JSON.stringify({ loggedIn: true }));

            // Set the authorization header for axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${serverToken}`;

            // Set the token state
            setToken(serverToken);

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