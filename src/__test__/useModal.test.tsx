/** @jest-environment jsdom */
import React, { useEffect, useMemo } from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, within } from '../utils/test-utils';
import ModalContext from '../ModalContext';
import useModal from '../useModal';
import { act } from 'react-dom/test-utils';


function App() {
    const { Modals } = React.useContext(ModalContext);
    const {
        closeAllModals,
        closeModal,
        createModal,
        destroyAllModals,
        destroyModal,
        getCurrentModal,
        getMeta,
        hasModal,
        isOpenModal, openModal, toggleModal
    } = useModal();

    return (
        <>
            <div id='modals'>
                {
                    Object.keys(Modals).map(name => {
                        const { meta, component, isOpen } = Modals[name];
                        return (
                            <div key={name} data-testid={name}>
                                <div data-testid="isOpen">{isOpen == true ? 'yes' : 'no'}</div>
                                <div data-testid="meta">{meta?.name ? meta.name : 'no have meta'}</div>
                                <div data-testid="component">{component}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => createModal('modal1', <p>Modal1</p>)}>Create Modal 1</button>
            <button onClick={() => createModal('modal2', <p>Modal2</p>, true)}>Create Modal 2</button>
            <button onClick={() => createModal('modal3', <p>Modal3</p>, true, { name: 'farshid' })}>Create Modal 3</button>
            <button onClick={()=> openModal('modal1')}>Open Modal 1</button>
            <button onClick={()=> closeModal('modal2')}>Close Modal 2</button>
        </>
    );
}


describe('test useModal', () => {
    beforeEach(async () => {
        await act(() => {
            render(<App />);
        });
    })

    test('create Modal 1', async () => {
        await act(async () => {
            const btnModal1 = await screen.findByText('Create Modal 1');
            const btnModal2 = await screen.findByText('Create Modal 2');

            btnModal1.click();
            btnModal2.click();
        });
        await act(async () => {
            const component = await screen.findByTestId('modal1');
            expect(component).toBeInTheDocument();
            expect(component).not.toHaveTextContent('Modal2');
            expect(component).toHaveTextContent('Modal1');
            expect(component).toHaveTextContent('no have meta');
            expect(component.querySelector('[data-testid="isOpen"')?.innerHTML).toBe('no');

            const btnOpenModal1 = await screen.findByText('Open Modal 1');
            btnOpenModal1.click();
        });

        

        await act(async () => {
            const component = await screen.findByTestId('modal1');
            expect(component).toBeInTheDocument();
            expect(component).toHaveTextContent('Modal1');
            expect(component).toHaveTextContent('no have meta');
            expect(component.querySelector('[data-testid="isOpen"')?.innerHTML).toBe('yes');

            const btnCloseModal2 = await screen.findByText('Close Modal 2');
            btnCloseModal2.click();
        });

        await act(async () => {
            const component = await screen.findByTestId('modal2');
            expect(component).toBeInTheDocument();
            expect(component).toHaveTextContent('Modal2');
            expect(component).toHaveTextContent('no have meta');
            expect(component.querySelector('[data-testid="isOpen"')?.innerHTML).toBe('no');
        });
    });
})