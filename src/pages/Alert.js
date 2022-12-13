import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
export function showError(msg) {
    return toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
        autoClose: 5000,
        pauseOnHover:true,
        pauseOnFocusLoss: true,
        progress:false,
        draggable:true,
        hideProgressBar:false
    });
}

export function showSuccess(msg) {
    return toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
        autoClose: 5000,
        pauseOnHover:true,
        pauseOnFocusLoss: true,
        progress:false,
        draggable:true,
        hideProgressBar:true
    });
}

export function showInfo(msg) {
    return toast.warning(msg, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 5000,
        pauseOnHover:true,
        pauseOnFocusLoss: true,
        progress:false,
        draggable:true,
        hideProgressBar:true
    });
}