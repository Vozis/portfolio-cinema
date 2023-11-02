import cn from 'clsx';
import Image from 'next/image';
import { ChangeEvent, FC, useCallback, useState } from 'react';

import { IUploadField } from '@/ui/form-elements/form.interface';
import { useUpload } from '@/ui/form-elements/upload-field/useUpload';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import styles from '../form.module.scss';

const UploadField: FC<IUploadField> = ({
  folder,
  onChange,
  isNoImage = false,
  style,
  value,
  placeholder,
  error,
}) => {
  const { isLoading, uploadFile } = useUpload(onChange, folder);

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={cn(styles.uploadFlex)}>
        <label>
          <span>{placeholder}</span>
          <input type={'file'} multiple onChange={uploadFile} />
          {/* @ts-ignore */}
          {error && <div className={cn(styles.error)}>{error.message}</div>}
        </label>

        {!isNoImage && (
          <div className={styles.uploadImageContainer}>
            {isLoading ? (
              <SkeletonLoader count={1} className={'w-full h-full'} />
            ) : (
              value &&
              value.map(item => (
                <Image
                  key={item.id}
                  src={item.url}
                  alt={''}
                  fill
                  className={'image-like-bg rounded-md'}
                  unoptimized
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadField;
