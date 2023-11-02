import Image from 'next/image';
import { FC } from 'react';

import { ICollection } from '@/screens/collection/collection.interface';

const CollectionImage: FC<{ collection: ICollection }> = ({
  collection: { image, title },
}) => {
  return <Image src={image} alt={title} fill={true} draggable={false} />;
};

export default CollectionImage;
