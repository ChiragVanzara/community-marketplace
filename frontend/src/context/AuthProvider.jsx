import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { useNotificationContext } from "./NotificationProvider";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const title = document.title;
    const { getAllNotificationByUser } = useNotificationContext();

    useEffect(() => {
        getUser();
    }, [])

    const signIn = async (userData) => {
        try {
            setLoading(true);
            // console.log(userData)
            // console.log(JSON.stringify(userData))
            const url = 'http://localhost:8000/api/v1/users/login';
            const response = await axios.post(url, userData, {withCredentials: true})

            if (response.status === 200) {
                setError(null);
                localStorage.setItem("accessToken", response.data.data.accessToken);
                toast("Cypher", {
                    description: "SignIn Successful."
                });
                await getUser();
                navigate('/home');
            }
            if (response.status === 401) {
                setError("Invailid Password.");
            }
            if (response.status === 404) {
                setError("User Not found, Create new Account.")
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const signUp = async (form) => {
        console.log(form)
        try {
            setLoading(true);
            const url = 'http://localhost:8000/api/v1/users/register';
            const response = await axios.post(url, form)
            switch (response.status) {
                case 200:
                    setError(null);
                    toast("Cypher", {
                        description: "Account Created. Sign in to continue."
                    });
                    navigate('/sign-in');
                    break;
                case 400:
                    setError("Required field is missing.");
                    break;
                case 409:
                    setError("User already exists!, Sign in with correct credentials.");
                    break;
                default:
                    setError("Internal Server error.");
                    break;
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async() => {
        try {
            const url = 'http://localhost:8000/api/v1/users/logout';
            const response = await axios.post(url, {}, { withCredentials: true })
            if(response.status === 200) {
                localStorage.removeItem("accessToken");
                setUser(null)
                await getAllNotificationByUser();
                toast("Cypher", {
                    description: "Logout Successfully."
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        const url = "http://localhost:8000/api/v1/users/get-current-user";
        try {
            const response = await axios.post(url, {}, { withCredentials: true });
            if (response.status === 200) {
                const data = response.data.data;
                setUser(data);
            } else {
                handleResponses(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async(id) => {
        const url = `http://localhost:8000/api/v1/users/${id}`;
        try {
            const response = await axios.get(url, { withCredentials: true });
            if (response.status === 200) {
                const data = response.data.data;
                return { success: true, user: data, message: 'User fetched successfully!' }
            } else {
                handleResponses(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (updatedData) => {
        setLoading(true);
        const url = "http://localhost:8000/api/v1/users/update-details";
        try {
            const response = await axios.post(url, updatedData, { withCredentials: true });
            if (response.status !== 200) {
                handleResponses(response.status);
            } else {
                toast("Cypher", {
                    description: "Profile Updated."
                });
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const updateImage = async (imageForm) => {
        setLoading(true);
        const url = "http://localhost:8000/api/v1/users/update-profile-image";
        try {
            const response = await axios.post(url, imageForm, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status !== 200) {
                handleResponses(response.status);
            } else {
                toast("Cypher", {
                    description: "Image Uploded"
                });
                await getUser();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleResponses = (status) => {
        switch (status) {
            case 401:
                toast(title, {
                    description: "Session timeout. SignIn to continue"
                });
                localStorage.removeItem('accessToken');
                navigate('/sign-in');
                break;
            case 404:
                toast(title, {
                    description: "User not found",
                });
                break;
            case 400:
                toast(title, {
                    description: "Server in not responding."
                });
                break;
            case 409:
                toast(title, {
                    description: "Server error. Bad reaquest."
                })
                break;
            case 500:
                toast(title, {
                    description: "Internal Server Error."
                })
                break;
            default:
                break;
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signUp,
            getUser,
            loading,
            setLoading,
            error,
            setError,
            user,
            setUser,
            updateUser,
            updateImage,
            logout,
            getUserById,
        }}>
            {children}
        </AuthContext.Provider>
    )
}