import React, { useState } from 'react'
import style from './clientLogin.module.scss'
import { useValidations } from '../../utils/validationutils'
const ClientLogin = () => {
  const {errors, validate} = useValidations();
    const [input, setInput] = useState({
        email: '',
        password: '',
    })

   
    const handleChange = (event) => {
        console.log(event)
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
    const handleSubmit = (e) => {
        e.preventDefault()

        // dispatch(postPokemon(input))
        const form = document.getElementById('form')
        form.reset()
        //navigate home / search auxies ///
    }

   
    // const validate = (input, name) => {
    //     ///email validations///
    //     if (name === 'email') {
    //         if (input.email !== '') {
    //             // Use a regular expression to check if the input value is a valid email
    //             const emailPattern = new RegExp(
    //                 /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ //eslint-disable-line
    //             )
    //             if (emailPattern.test(input.email)) {
    //                 setErrors({ ...errors, email: '' })
    //             } else {
    //                 setErrors({ ...errors, email: 'Invalid email format' })
    //             }
    //         } else {
    //             setErrors({ ...errors, email: 'Email is required' })
    //         }
    //     }
    //     ///email validations///

    //     if (name === 'password') {
    //         //password length//
    //         if (input.password.includes(' ')) {
    //             setErrors({
    //                 ...errors,
    //                 password: 'password cannot have blank spaces',
    //             })
    //         } else if (
    //             input.password.length < 8 ||
    //             input.password.length > 12
    //         ) {
    //             setErrors({
    //                 ...errors,
    //                 password:
    //                     'password must be between 8 and 12 characters long',
    //             })
    //         } else if (
    //             input.password.length >= 8 &&
    //             input.password.length <= 12
    //         ) {
    //             setErrors({ ...errors, password: '' })
    //         } else {
    //             setErrors({ ...errors, password: 'password is required' })
    //         }
    //         //password length//
    //     }
    // }

    ///validations ///

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

    //////

    return (
        <div className={style.login}>
            <form form id="form" onSubmit={handleSubmit} className={style.form}>
                <div>
                    <div>
                        <h1>Inicia sesion para acceder a Auxie</h1>
                    </div>
                    <div className={style.logininput}>
                        <label>Email: </label>
                        <input
                            name="email"
                            type="email"
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
                </div>
            </form>
        </div>
    )
}

export default ClientLogin
