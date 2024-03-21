import { Flip, toast, ToastOptions } from 'react-toastify';

const defaultToastOptions: ToastOptions = {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  type:'default',
  transition:Flip,
  theme:'dark'
 
};

export const showToast = (message: string, options?: ToastOptions) => {

  

  toast(message, { ...defaultToastOptions, ...options });
};
