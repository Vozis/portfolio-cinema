import cn from 'clsx';
import { FC } from 'react';

import { IButton } from '@/ui/form-elements/form.interface';

const Button: FC<IButton> = ({ children, className, ...rest }) => {
  return (
    <button className={cn('btn-primary py-2 px-8', className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
