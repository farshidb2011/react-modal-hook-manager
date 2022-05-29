import { createContext } from 'react';
import { IModalContext } from './Interfaces';

const ModalContext = createContext<IModalContext>({ Modals: {}, setModals: () => { } });

export default ModalContext;