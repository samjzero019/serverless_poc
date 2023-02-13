import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from './styles.module.css'
import { LoginIcon } from '@heroicons/react/outline'
import axios from "axios";

const Signin = () => {

  const { currentUser, login, setCurrentUser, setIsSubmitting, loggedIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    axios
      .post(
        `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/users/login`,
        { email: email, password: password }
      )
      .then((res) => {
        console.log("Response in Login: ", res.data);
        localStorage.setItem("token", res.data.token);
        try {
          login(emailRef.current.value, passwordRef.current.value)
       } catch {
         alert("Error!")
       }
      })
      .catch((err) => console.log("Error in Login", err.message));

   
    setIsSubmitting(false)
  }

  const navigate = useNavigate()
  
  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Login</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignIn}
          className={styles.signInForm}
        >
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                className={styles.input}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={styles.input}
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Don't have an account? Sign up{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <LoginIcon className="my-auto h-5 w-6" aria1-hidden="true" />
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin