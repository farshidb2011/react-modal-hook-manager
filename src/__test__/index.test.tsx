/** @jest-environment jsdom */
import React, { useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '../utils/test-utils';
import ModalContext from '../ModalContext';
import useModal from '../useModal';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    cleanup();
})

describe('render package', () => {
    
    it('can access to Modals object', () => {
        const ren = render(
            <ModalContext.Consumer>
                {({ Modals }) => {
                    return Object.keys(Modals).map(name => (
                        <p>name</p>
                    ))
                }}
            </ModalContext.Consumer>
        )
    });


    function Modal() {
        const { Modals } = React.useContext(ModalContext);
        return (
            <div>
                All Modals
                {
                    Object.keys(Modals).map(name => (
                        <div key={name} className={Modals[name].isOpen ? 'active' : ''}>
                            <button>Close Modal</button>
                            {Modals[name].component}
                        </div>
                    ))
                }
            </div>
        )
    }

    const Content = () => {
        return (<p data-testid="content">content</p>)
    }
    const App = ({ children }: { children: React.ReactNode }) => {
        const { createModal } = useModal();
        return (
            <>
                <Modal />
                <button data-testid='1' onClick={() => createModal('content', <Content />)}>create modal</button>
                {children}
            </>
        )
    }

    it('can render all modals', () => {
        const { getByText } = render(<Modal />);
        expect(getByText('All Modals')).toBeInTheDocument();
    })

    it('use modal hook to createModal', async () => {

        await act(() => { render(<App>d</App>); })

        const button = await screen.findByTestId('1');
        await act(async () => {
            await button.click();
        })
        expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    it('Modal object should be have "content" key', async () => {

        await act(() => {
            const TestComponent = () => {
                const { Modals } = React.useContext(ModalContext);
                useEffect(() => {
                    if (Object.keys(Modals).length > 0) {
                        expect(Object.keys(Modals)).toContain('content');
                    }
                }, [Modals]);
                return null;
            }


            render(<>
                <App>
                    <TestComponent />
                </App>
            </>);

            screen.findByTestId('1').then(button => button.click());
        })

    });


});