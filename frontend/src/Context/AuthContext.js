
import { createContext, useState, useEffect, useContext } from "react";
import {toast} from 'react-toastify'
const AuthContext = createContext();

const defaultUser = JSON.parse(localStorage.getItem("user")) || {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  address: "",
};
// const defaultUsers = JSON.parse(localStorage.getItem("users")) || [];

const AuthProvider = ({ children }) => {
  // const [users, setUsers] = useState(defaultUsers);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const login = (email, password) => {
    const LoggedUser = {email: email, password: password}
    // const userData = Object.values(users)
    // const indexOfUser = users.map((item) => item.email).indexOf(email)
    // if (indexOfUser && userData[indexOfUser].password === password) {
    //   const finalUser = userData[indexOfUser]
    //   setCurrentUser(finalUser)
    //   setLoggedIn(true)
    //   localStorage.setItem("user", JSON.stringify(finalUser))
    // }
    setCurrentUser(LoggedUser);
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(LoggedUser));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem('cardDetails')
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
    });
    setLoggedIn(false);
    toast(" User signed out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const isEmpty = Object.values(currentUser).every((value) =>
      value ? true : false
    );
    if (Object.keys(errors).length > 0) {
      setLoggedIn(false);
    } else if (!isEmpty) {
      setLoggedIn(false);
    } else {
      // const userData = [...users, currentUser];
      // setUsers(userData);
      // localStorage.setItem("users", JSON.stringify(userData));
      localStorage.setItem("user", JSON.stringify(currentUser));
      setLoggedIn(true);
    }
  }, [errors]);

  const value = {
    currentUser,
    setCurrentUser,
    // users,
    loggedIn,
    errors,
    loggedIn,
    setErrors,
    setIsSubmitting,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
