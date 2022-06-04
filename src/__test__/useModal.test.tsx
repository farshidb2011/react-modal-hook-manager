/** @jest-environment jsdom */
import React, { useEffect, useMemo } from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, getByText, waitForElementToBeRemoved } from '../utils/test-utils';
import ModalContext from '../ModalContext';
import useModal from '../useModal';
import { act } from 'react-dom/test-utils';
import type { RenderResult } from '@testing-library/react/types/index';


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
                            <div key={name} data-testid={name} role="dialog">
                                <div data-id="isOpen">{isOpen == true ? 'yes' : 'no'}</div>
                                <div data-id="meta">{meta?.id ? meta.id : 'no have meta'}</div>
                                <div data-id="component">{component}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => createModal('modal1', <p>Modal1</p>)}>Create Modal 1</button>
            <button onClick={() => createModal('modal2', <p>Modal2</p>, true)}>Create Modal 2</button>
            <button onClick={() => createModal('modal3', <p>Modal3</p>, true, { id: 1401 })}>Create Modal 3</button>
            <button onClick={() => openModal('modal1')}>Open Modal 1</button>
            <button onClick={() => openModal('notExistModal')}>Open No Exist Modal</button>
            <button onClick={() => closeModal('modal2')}>Close Modal 2</button>
            <button onClick={() => closeAllModals()}>Close All Modals</button>
            <button onClick={() => closeModal('modal2', true)}>Close And Destroy Modal 2</button>
            <button onClick={() => destroyModal('modal1')}>Destroy Modal 1</button>
            <button onClick={() => destroyAllModals()}>Close Modal 2</button>
            <button onClick={() => getCurrentModal()}>Close Modal 2</button>
            <button onClick={() => getMeta('modal2')}>Close Modal 2</button>
            <button onClick={() => hasModal('modal2')}>Close Modal 2</button>
            <button onClick={() => isOpenModal('modal2')}>Close Modal 2</button>
            <button onClick={() => toggleModal('modal2')}>Close Modal 2</button>

        </>
    );
}


describe('test useModal', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        globalThis.IS_REACT_ACT_ENVIRONMENT = true;
        act(() => {
            wrapper = render(<App />);
        });
    });

    afterEach(() => {
    })

    function clickButton(button: HTMLButtonElement) {
        act(() => {
            button.click();
        })
    }

    function clickButtonWithName(name: string | RegExp) {

        const button = wrapper.getByRole('button', { name });
        clickButton(button as HTMLButtonElement);

    }

    it('div tag should be exist with id = modals', () => {
        const div = wrapper.container.querySelector('#modals');
        expect(div).not.toBeNull();
        expect(div!.id).toEqual('modals');
    });



    it('create modal1', () => {
        clickButtonWithName(/Create Modal 1/i);
        screen.findByText('Modal1').then(txt => {
            expect(txt).toBeInTheDocument();
        });
    });

    it('modal1 should be closed in first render', () => {
        clickButtonWithName(/Create Modal 1/i);
        expect(wrapper.getByText('no')).toBeInTheDocument();
    })


    it('modal1 should be open', () => {
        clickButtonWithName(/Create Modal 1/i);
        clickButtonWithName(/Open Modal 1/i);
        expect(screen.getByText('yes')).toBeInTheDocument();
        screen.getByText(/no have meta/i);
    })

    it('modal1 and modal2 should be create', () => {
        clickButtonWithName(/Create Modal 1/i);
        clickButtonWithName(/Create Modal 2/i);
        wrapper.findByText('modal1').then(modal1 => expect(modal1).toBeInTheDocument());
        wrapper.findByText('modal2').then(modal2 => expect(modal2).toBeInTheDocument());
    });

    it('meta should be have 2 "no have meta"', () => {
        clickButtonWithName(/Create Modal 1/i);
        clickButtonWithName(/Create Modal 2/i);
        wrapper.findAllByText(/no have meta/i).then(metas => {
            expect(metas.length).toBe(2);
        });
    })

    it('create modal 3 with meta', () => {
        clickButtonWithName(/Create Modal 3/i);
        expect(wrapper.getByText('1401')).toBeInTheDocument();
    });

    it('after close all modal document should be dont have modals', () => {
        clickButtonWithName(/Create Modal 1/i);
        clickButtonWithName(/Create Modal 2/i);
        clickButtonWithName(/Create Modal 3/i);
        clickButtonWithName(/Close All Modals/i);
        expect(wrapper.getAllByText('no').length).toBe(3);
    });

    it('should be no rendering for modal that is not exist', () => {
        clickButtonWithName(/Open No Exist Modal/i);
        expect(wrapper.container.querySelectorAll('div[role="dialog"]').length).toBe(0);
    })

    it("should be destroy modal that can't open it", () => {
        clickButtonWithName(/Create Modal 1/i);
        clickButtonWithName(/Destroy Modal 1/i);
        expect(wrapper.container.querySelector('div[role="dialog"]')).toBeNull();
    });

    // it('should be close modal first then destroy it after 200ms', async () => {
    //     clickButtonWithName(/Create Modal 2/i);
    //     clickButtonWithName(/Close And Destroy Modal 2/i);
    //     // const dialog = wrapper.container.querySelector('div[role="dialog"]');
    //     // await waitForElementToBeRemoved(dialog)
    //     // expect(dialog).toBeNull();
    //     function getDialogComponent(){
    //         return new Promise<Element | null>((resolve,reject)=>{
    //             setTimeout(()=>{
    //                 resolve(wrapper.container.querySelector('div[role="dialog"]'));
    //             },500)
    //         })
    //     }
    //     const dialog = await getDialogComponent();
    //     expect(dialog).toBeNull();
    // })
})