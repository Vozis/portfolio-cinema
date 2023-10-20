import cn from 'clsx';
import { forwardRef, useEffect, useState } from 'react';

import Field from '@/ui/form-elements/Field';
import { IField, IFileUploadField } from '@/ui/form-elements/form.interface';
import styles from '@/ui/form-elements/form.module.scss';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

const FilesUploadField = forwardRef<HTMLInputElement, IFileUploadField>(
  (
    {
      placeholder,
      error,
      style,
      isNoImage = false,
      isLoading = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn(styles.field, styles.uploadField)} style={style}>
        <div className={cn(styles.uploadFlex)}>
          <label>
            <span>{placeholder}</span>
            <input {...rest} type={'file'} multiple ref={ref} />
            {/* @ts-ignore */}
            {error && <div className={cn(styles.error)}>{error.message}</div>}
          </label>

          {/*{!isNoImage && (*/}
          {/*  <div className={styles.uploadImageContainer}>*/}
          {/*    {isLoading ? (*/}
          {/*      <SkeletonLoader count={1} className={'w-full h-full'} />*/}
          {/*    ) : (*/}
          {/*      value && (z*/}
          {/*        <Image*/}
          {/*          src={value}*/}
          {/*          alt={''}*/}
          {/*          fill*/}
          {/*          className={'image-like-bg rounded-md'}*/}
          {/*          unoptimized*/}
          {/*        />*/}
          {/*      )*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    );
  },
);

FilesUploadField.displayName = 'FilesUploadField';

export default FilesUploadField;
