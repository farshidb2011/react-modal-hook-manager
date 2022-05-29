import { useContext, useEffect, useState } from "react";
import { IModal } from './Interfaces';
import ModalContext from './ModalContext';

export default function useModal(name?: string) {

    const {
        Modals,
        setModals,
    } = useContext(ModalContext);    

    const [Name, setName] = useState(name);
    const [CurrentModal, setCurrentModal] = useState<IModal | null>(null);

    useEffect(() => {
        if (Name) {
            setCurrentModal(Modals[Name]);
        }
    }, [Name]);

    const getCurrentModal = () => {
        return CurrentModal;
    };

    const setModal = (name: string, callback: (modal: IModal) => IModal) => {
        const modal = Modals[name];
        if (modal) {
            const newModal = callback(modal);
            setModals(prev => ({
                ...prev,
                [name]: newModal,
            }));
        }
    }

    const getMeta = (name?: string) => {
        const n = name || Name;
        if (n) {
            const modal = Modals[n!];
            if (modal) {
                return modal.meta;
            }
        } else {
            throw new Error('No modal name provided');
        }
        return null;
    }


    const toggleModal = (name?: string) => {
        const n = name || Name;
        if (n) {
            setModal(n, (model) => {
                return {
                    ...model,
                    isOpen: !model.isOpen,
                };
            });
        }
    }

    const destroyModal = (name?: string) => {
        const n = name || Name;
        if (n) {
            setModals(prev => {
                const newModals = { ...prev };
                delete newModals[n];
                return newModals;
            });
        }
    }

    const destroyAllModals = () => {
        setModals({});
    }

    const closeModal = (name?: string, destroy = false) => {
        const n = name || Name;
        if (n) {
            setModal(n, (modal) => ({
                ...modal,
                isOpen: false,
            }));
        }
        if (destroy) {
            setTimeout(() => {
                destroyModal(name);
            }, 200);
        }
    }

    const closeAllModals = (names?: string[], destroy = false) => {
        if (names) {
            for (const name of names) {
                closeModal(name, true);
            }
        } else {
            for(const name in Modals) {
                closeModal(name, destroy);
            }
        }
    }

    const openModal = (name?: string) => {
        const n = name || Name;
        if (n) {
            setModal(n, (modal) => ({
                ...modal,
                isOpen: true,
            }));
        }
    }

    const isOpenModal = (name?: string) => {
        const n = name || Name;
        if (n) {
            const modal = Modals[n];
            if (modal) {
                return modal.isOpen;
            } else {
                return false;
            }
        }
        return false;
    }

    const hasModal = (name?: string) => {
        const n = name || Name;
        if (n) {
            return Modals[n] !== undefined;
        }
        return false;
    }

    const createModal = (name: string, component: JSX.Element, open: boolean = false, meta?: any) => {
        setName(name);
        setModals(prev => ({
            ...prev,
            [name]: {
                name,
                isOpen: open,
                component,
                meta,
                closeModal,
                openModal,
                toggleModal
            }
        }));
    }

    return {
        getCurrentModal,
        createModal,
        toggleModal,
        openModal,
        closeModal,
        closeAllModals,
        destroyModal,
        destroyAllModals,
        isOpenModal,
        hasModal,
        getMeta
    };
}