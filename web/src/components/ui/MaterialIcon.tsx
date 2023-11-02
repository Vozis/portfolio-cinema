import React, { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from '@/shared/types/icon.types';

import { useRenderClient } from '@/hooks/useRenderClient';

export const MaterialIcon: FC<
  { name: TypeMaterialIconName } & React.HTMLAttributes<HTMLDivElement>
> = ({ name, className }) => {
  const { isRenderClient } = useRenderClient();

  const IconComponent = MaterialIcons[name];

  if (isRenderClient) {
    return <IconComponent className={className} /> || <MaterialIcons.MdError />;
  } else {
    return null;
  }
};
