
export interface IModal {
    name: string;
    isOpen: boolean;
    component: JSX.Element;
    meta?: any;
    closeModal: () => void;
    openModal: () => void;
    toggleModal: () => void;
}

export interface IModals {
    [key: string]: IModal;
}

export type SetState = IModals | ((prevState: IModals) => IModals);

export interface IModalContext {
    Modals: IModals;
    setModals: (state: SetState) => void;
    [key: string]: any;
}
