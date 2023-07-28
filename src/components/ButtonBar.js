import React from 'react';
import { Button, ButtonBarLayout } from '../styles/ButtonBarStyle';

const ButtonBar = ({ value, onClick }) => {
  return (
    <ButtonBarLayout>
      <Button onClick={onClick}>{value}</Button>
    </ButtonBarLayout>
  );
};

export default ButtonBar;
