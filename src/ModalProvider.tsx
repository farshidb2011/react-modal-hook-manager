import React, { PropsWithChildren, useState } from 'react';
import ModalContext from './ModalContext';

export default function ModalProvider(props:PropsWithChildren<any>) {

  const [Modals, setModals] = useState({});

  return React.createElement(ModalContext.Provider, { value: { Modals, setModals } }, props.children);
}

