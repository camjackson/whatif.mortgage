import React, { FC } from 'react';

type Props = {
  className?: string;
  colSpan?: number;
};

const cell = 'border-1 py-1 px-2';

export const Th: FC<Props> = ({ className, ...props }) => (
  <th className={`${cell} text-right font-hairline ${className}`} {...props} />
);
export const Td: FC<Props> = ({ className, ...props }) => (
  <td className={`${cell} text-left font-normal ${className}`} {...props} />
);
