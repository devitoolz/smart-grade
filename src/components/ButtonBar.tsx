import React from 'react';
import { Button, ButtonBarLayout } from '../styles/ButtonBarStyle';
import { ButtonBarProps } from '../types/components';

const ButtonBar = ({ value, onClick }: ButtonBarProps) => {
  return (
    <ButtonBarLayout>
      <Button onClick={onClick}>{value}</Button>
    </ButtonBarLayout>
  );
};

export default ButtonBar;
