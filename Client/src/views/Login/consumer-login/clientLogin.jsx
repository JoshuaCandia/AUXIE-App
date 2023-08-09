import React, { useEffect, useState } from 'react'
import style from './clientLogin.module.scss'
import { useValidations } from '../../../utils/validationutils'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {loggedUser, setToken} from '../../../redux/Actions/actions'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firebase-config'

const ClientLogin = () => {
    const apiBackUrl = import.meta.env.VITE_API_BACK_URL
    const urlApi = apiBackUrl || 'localhost:3001'

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { errors, validate } = useValidations()
    const [access, setAccess] = useState(false) //eslint-disable-line

    const [input, setInput] = useState({
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        })
        ///validations ///
        validate(
            {
                ...input,
                [event.target.name]: event.target.value,
            },
            event.target.name
        )
        ///validations ///
    }
    const handleLogin = async (token) => {
        try {
            const response = await axios.post(
                `http://${urlApi}/consumers/login`,
                input,{
                    headers:{
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            if (response) {
                setAccess(true)
                dispatch(loggedUser(response.data))
                dispatch(setToken(token))
            }
        } catch (error) {
            console.error('error: ' + error.response.data.error)
            alert(error.response.data.error)
        }
    }

    useEffect(() => {
        if (access === true) {
            navigate('/homeconsumer')
        }
    }, [access])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // dispatch(postPokemon(input))
        const form = document.getElementById('form')
        const email = form.email.value
        const password= form.password.value
        try{
           const credential = await signInWithEmailAndPassword(auth, email,password)
        if(credential){
            handleLogin(credential.user.accessToken)
        }
        form.reset() 
        }catch (error){
            alert(error.message)//o como lo maneje el front sweet alert?
          }
        //navigate home / search auxies ///
    }

    //////para desabilitar el boton si no esta lleno el formulario=>
    const buttonDisabled = () => {
        // Check if the "types" field is empty
        if (
            input.password.trim().length === 0 ||
            input.email.trim().length === 0
        ) {
            return true
        }

        // Check if any error message is not empty for other fields
        for (let error in errors) {
            if (errors[error] !== '') {
                return true
            }
        }

        return false
    }
    //google Login
    const signInGoogle = async ()=>{
        try{
        const provider = new GoogleAuthProvider ();    
        provider.setCustomParameters({ prompt: 'select_account' });
        const credential = await signInWithPopup(auth, provider)
         const token = credential.user.accessToken;
        if (token) {
            handleLogin(token)
        }
       
      }catch (error){
        alert(error.message)//o como lo maneje el front sweet alert?
      }
        }

    //////

    return (
        <div className={style.login}>
            <form id="form" onSubmit={handleSubmit} className={style.form}>
                <div>
                    <div>
                        <h1>Inicia sesion para acceder a Auxie</h1>
                    </div>
                    <div className={style.logininput}>
                        <label>Email: </label>
                        <input
                            name="email"
                            type="text"
                            className={style.textInput}
                            placeholder="Correo electronico"
                            onChange={handleChange}
                        ></input>
                        <div className={style.errors}>
                            <p>{errors.email}</p>
                        </div>
                    </div>

                    <div className={style.logininput}>
                        <label>Password: </label>
                        <input
                            name="password"
                            type="password"
                            className={style.textInput}
                            placeholder="Contraseña"
                            onChange={handleChange}
                        ></input>
                        <div className={style.errors}>
                            <p>{errors.password}</p>
                        </div>
                    </div>

                    <div className={style.submitbutton}>
                        <input
                            type="submit"
                            disabled={buttonDisabled()}
                        ></input>
                    </div>
                    <center>  <p>or</p></center>
                </div>
            </form>
            <center>
               
               <button onClick={signInGoogle}>
     <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"   width="10" height="10" >
     <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
     <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
     <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
     <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
   </svg>
       {''} Continue with Google
   </button>
               </center>
               
        </div>
    )
}

export default ClientLogin
