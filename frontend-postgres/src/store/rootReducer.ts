import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as userReducer } from './user/userSlice';

export const rootReducer = {
  user: userReducer,
  toastr: toastrReducer,
};
