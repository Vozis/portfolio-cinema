import { toastr } from 'react-redux-toastr';
import { toast } from 'react-toastify';

import { errorCatch } from '@/config/api/api.helper';

export const toastError = (error: any, title?: string) => {
  const message = errorCatch(error);
  toast.error(message, {
    toastId: message,
  });
  // toastr.error(title || 'Error request', message);

  throw message;
};
