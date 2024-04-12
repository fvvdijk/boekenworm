import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApiContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const apikey = 'boekenworm:byfOaBewbNje38gcGoHw';
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
            console.error('login error:', error.message);
            throw new Error('Invalid credentials');
        }
    };

    const register = async (username, password, email) => {
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/boekenworm/users',
                {
                    username: username,
                    password: password,
                    email: email,
                    info: null,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': apikey,
                    },
                }
            );

            return response;
        } catch (error) {
            console.error('register error:', error.message);
            throw new Error('Invalid credentials');
        }
    };

    const fetchBookDetails = async (id) => {
        try {
            const response = await axios.get(
                `https://cors-anywhere.herokuapp.com/https://openlibrary.org/books/${id}.json`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response;
        } catch (error) {
            console.error('register error:', error.message);
            throw new Error('Invalid credentials');
        }
    };

    const fetchBooks = async (query) => {
        try {
            const response = await axios.get(
                `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,author_key,cover_i`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response;
        } catch (error) {
            console.error('register error:', error.message);
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
        <ApiContext.Provider value={{ user, token, login, logout, register, fetchBookDetails, fetchBooks }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(ApiContext);
};