import { forwardRef } from 'react';
import { IField } from '@/ui/form-elements/form.interface';
import cn from 'clsx';

import styles from './form.module.scss';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={cn(styles.common, styles.field)} style={style}>
        <label>
          <span>{placeholder}</span>
          <input {...rest} type={type} ref={ref} />
        </label>
        {/* @ts-ignore */}
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    );
  },
);

Field.displayName = 'Field';

export default Field;
