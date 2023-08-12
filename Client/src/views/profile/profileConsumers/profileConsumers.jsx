import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../../redux/Actions/actions'

const ProfileConsumers = () => {
    const consumer = useSelector((state) => state.loggedUser)
    const [newImage, setNewImage] = useState(null)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const handleImageChange = (elem) => {
        const file = elem.target.files[0]
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setNewImage(file)
            setError(null)
        } else {
            setError('Por favor, selecciona un archivo PNG o JPG.')
        }
    }

    const handleUpdateProfile = () => {
        const formData = new FormData()
        formData.append('image', newImage)
        dispatch(updateProfile({ image: newImage },'consumers'))
    }

    return (
        <div>
            <div>
                <img src={consumer.image.secure_url} alt="imagen de perfil" />
                <input
                    type="file"
                    accept=".jpg, .png"
                    onChange={handleImageChange}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h1>{consumer.firstName} {consumer.lastName}</h1>
                <h4>
                    {consumer.isAdmin && (
                        <div>
                            <h4>Admin</h4>
                        </div>
                    )}
                </h4>
                <h4>Genero: {consumer.gender}</h4>
                <h3>
                    Email: {consumer.email}{' '}
                    <button>Cambiar la contraseña</button>
                </h3>
                <h6>Te uniste: {consumer.registerDate}</h6>
                <div>
                    <h5>Auxies favoritos: {consumer.favoritesProviders}</h5>
                    <h5>Servicios contratados: {consumer.requiredServices}</h5>
                    <h5>Servicios requeridos: {consumer.requiredServices}</h5>
                    <h5>Average Rating: {consumer.averageRating}</h5>
                    <h5>Ratings: {consumer.ratings}</h5>
                </div>
                <button onClick={handleUpdateProfile}>Guardar Cambios</button>
            </div>
        </div>
    )
}

export default ProfileConsumers
