import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import logoImage from '@/assets/images/logo.svg';

const Logo: FC = () => {
  return (
    <div className={'lg:p-0 flex justify-center items-center'}>
      <Link href={'/'}>
        <Image
          src={logoImage}
          alt={'Online cinema'}
          draggable={false}
          priority
          className={'h-10'}
        />
      </Link>
    </div>
  );
};

export default Logo;
