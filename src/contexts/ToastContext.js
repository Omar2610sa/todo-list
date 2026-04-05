import { createContext, useContext } from "react";
import { useState } from "react";
import MySnackBar from '../components/MySnackBar'


export const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("")


    function showHideToast(message, color) {
        setOpen(true)
        setMessage(message)
        setColor(color)
        setTimeout(() => {
            setOpen(false)
        }, 4000)
    }
    return (

        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackBar open={open} message={message} color={color} />
            {children}
        </ToastContext.Provider>
    )

}

export const useToast = () =>{
    return useContext(ToastContext)
}
