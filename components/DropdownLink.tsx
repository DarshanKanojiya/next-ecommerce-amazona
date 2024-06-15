import { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import { DropdownLinkProps } from '../types';

const DropdownLink: NextPage<DropdownLinkProps> = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default DropdownLink;
