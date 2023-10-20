import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import SlideItem from '@/ui/slider/SlideItem';
import SlideArrow from '@/ui/slider/slide-arrow/SlideArrow';
import { ISlide } from '@/ui/slider/slider.interface';
import { useSlider } from '@/ui/slider/useSlider';

import styles from './slider.module.scss';

interface ISlider {
  slides: ISlide[];
  buttonTitle?: string;
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
  const { handleArrowClick, index, slideIn, isPrev, isNext } = useSlider(
    slides.length,
  );

  return (
    <div className={styles.slider}>
      <CSSTransition
        in={slideIn}
        classNames={'slide-animation'}
        timeout={300}
        unmountOnExit
      >
        <SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
      </CSSTransition>

      {isPrev && (
        <SlideArrow
          variant={'left'}
          clickHandler={() => handleArrowClick('prev')}
        />
      )}
      {isNext && (
        <SlideArrow
          variant={'right'}
          clickHandler={() => handleArrowClick('next')}
        />
      )}
    </div>
  );
};

export default Slider;
