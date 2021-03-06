import React, { CSSProperties, FC, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from '@components/Menu/styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  closeButton?: boolean;
  children: any;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton = true }) => {
  const stopPropagation = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
