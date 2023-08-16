// Styles
import './App.scss'
import { LocalizationProvider } from '@mui/x-date-pickers' //esto es para date and time picker (para citas)
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' //esto es para date and time picker (para citas)
import 'dayjs/locale/en-gb'
// Import Hooks
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Import Actions
import { getAllAuxies, getAllServices } from './redux/actions/actions'

// Import Views

//Landing Views
import Landing from './views/landing/Landing'
import AboutUs from './views/landingViews/aboutUs/AboutUs'
import Guarantee from './views/landingViews/guarantee/Guarantee'
import Help from './views/landingViews/help/Help'
import HowItWorks from './views/landingViews/howItWorks/HowItWorks'
import Offer from './views/landingViews/offer/Offer'

// Home
import HomeAuxie from './views/home/home-auxie/HomeAuxie'
import HomeConsumer from './views/home/home-consumer/HomeConsumer'

//Home  Views
import AuxieInbox from './views/home-views/auxie-views/auxie-inbox/AuxieInbox'
import AuxieServices from './views/home-views/auxie-views/auxie-services/AuxieServices'
import AuxieStatistics from './views/home-views/auxie-views/auxie-statistics/AuxieStatistics'

import ProfilePage from './views/profile/profilePage/ProfilePage'
import './config/firebase-config'

//Forms
import Form from './views/forms/auxie-form/AuxieForm'
import ClientForm from './views/forms/client-form/ClientForm'
import SupportForm from '../src/views/forms/support-form/SupportForm'
import ResetPassword from './views/reset-password/ResetPassword'

// Logins
import ClientLogin from './views/login/consumer-login/ClientLogin'
import AuxieLogin from './views/login/auxie-login/AuxieLogin'
import Pruebas from './views/pruebas/Pruebas'

import Detail from './views/detail/Detail'
import PageNotFound from './views/page-not-found/PageNotFound'
import RequestedServices from './views/requestedServices/RequestedServices'
import JobRequestForm from './views/forms/jobRequest-Form/JobRequestForm'
import ChatApp from './views/chat/App'

//URL Back
import axios from 'axios'
import ReviewForm from './views/forms/review-form/ReviewForm'

const apiBackUrl = import.meta.env.VITE_API_BACK_URL
const urlApi = apiBackUrl || 'http://localhost:3001'
axios.defaults.baseURL = urlApi

import { io } from 'socket.io-client'
import { Notifications } from './components/notifications/Notifications'

const socket = io(urlApi)

socket.on('disconnect', () => {
    console.log('Desconexión del servidor')
})

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAuxies())
        dispatch(getAllServices())
        socket.on('greeting', (msj) => {
            console.log(msj)
        })
    }, [])
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    {/* Landing Nav Views */}
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/guarantee" element={<Guarantee />} />
                    <Route path="/offer" element={<Offer />} />
                    <Route path="/howItWorks" element={<HowItWorks />} />
                    <Route path="/support" element={<SupportForm />} />
                    <Route path="/help" element={<Help />} />

                    {/* Home paths */}
                    <Route path="/homeconsumer" element={<HomeConsumer />} />
                    <Route path="/homeauxie" element={<HomeAuxie />} />

                    {/* Home views paths */}
                    <Route path="/auxieinbox" element={<AuxieInbox />} />
                    <Route path="/auxieservices" element={<AuxieServices />} />
                    <Route
                        path="/auxiestatistics"
                        element={<AuxieStatistics />}
                    />
                    <Route path="/jobrequest" element={<JobRequestForm />} />

                    {/*Detail paths  */}
                    <Route path="/detail/:id" element={<Detail />} />

                    {/*Profile paths */}
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Register paths */}
                    <Route path="/auxieform" element={<Form />} />
                    <Route path="/clientform" element={<ClientForm />} />
                    {/* Register paths */}
                    <Route path="/pruebas" element={<Pruebas />} />
                    {/* Login paths */}
                    <Route path="/clientlogin" element={<ClientLogin />} />
                    <Route path="/auxielogin" element={<AuxieLogin />} />
                    {/* Login paths */}
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route path="/chat" element={<ChatApp />} />
                    <Route
                        path="/requestedservices"
                        element={<RequestedServices />}
                    />
                    <Route path="/review" element={<ReviewForm />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </LocalizationProvider>
    )
}

export default App
