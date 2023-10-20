import cn from 'clsx';
import { FC } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import styles from './Arrow.module.scss';

interface ISlideArrow {
  variant: 'left' | 'right';
  clickHandler: () => void;
}

const SlideArrow: FC<ISlideArrow> = ({ variant, clickHandler }) => {
  const isLeft = variant === 'left';

  return (
    <button
      aria-label={isLeft ? 'previous slide' : 'next slide'}
      onClick={clickHandler}
      className={cn(styles.arrow, {
        [styles.left]: isLeft,
        [styles.right]: !isLeft,
      })}
    >
      <MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
    </button>
  );
};

export default SlideArrow;
