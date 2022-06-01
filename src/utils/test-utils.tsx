import React from "react";
import { render, RenderOptions } from '@testing-library/react';
import ModalProvider from "../ModalProvider";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
};

const customRender = (ui:React.ReactElement, options?:Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };