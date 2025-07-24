import { Toaster } from "react-hot-toast"

function Toast() {
    return (
        <Toaster position="top-right" toastOptions={{
            success: {
                style: {
                    background: 'green',
                    color: 'white'
                },
            },
            error: {
                style: {
                    background: 'red',
                    color: "white"
                },
            },
        }} />
    )
}

export default Toast
