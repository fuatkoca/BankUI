import { toast } from 'react-toastify';

//here we are generating the condition fore getting the error notification

export const toastError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
        })
    } else {
        return toast.error("Unexpected error");
    }
}