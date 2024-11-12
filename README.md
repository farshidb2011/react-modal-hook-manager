# React Modal Hook Manager

This package does not include any components for displaying modals. You need to create your own components to show modals.

Use this package to manage modal states easily.

## Example:

Add ModalProvider to your root component:

```js
index.jsx;
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook-manager";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
```

Create your modal component: Render each modal component in the Modals state.

```js
Modal.jsx;
import { useContext } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ModalContext, useModal } from "react-modal-hook-manager";

export default function Modal() {
  const { Modals, setModals } = useContext(ModalContext);
  const { closeModal } = useModal();

  return (
    <>
      {Object.keys(Modals).map((name) => (
        <Dialog key={name} open={Modals[name].isOpen} keepMounted>
          <DialogContent>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                closeModal(name, true);
              }}
            />
            <Box mt={1}></Box>
            {Modals[name].component}
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
```

## Creating a Component to Show in a Modal

### Note: Any component can be displayed in a modal.

```js
Helloworld1.jsx;
import React from "react";

export default function HelloWorld1() {
  return (
    <>
      <h2>Hello World1</h2>
    </>
  );
}
```

Another example component to show in a modal:

```js
Helloworld2.jsx;
import React from "react";

export default function HelloWorld2() {
  return (
    <>
      <h2>Hello World2</h2>
    </>
  );
}
```

## Import and Use the Components
With the ```createModal``` function, you can create modals.

```js
App.jsx;
import React from "react";
import Modal from "./Modal";
import HelloWorld1 from "./HelloWorld1";
import HelloWorld2 from "./HelloWorld2";
import { useModal } from "react-modal-hook-manager";

export default function App() {
  const { createModal, openModal, closeModal } = useModal();

  const handelHelloWorld1 = () => {
    createModal("HelloWorld1", <HelloWorld1 />, true);
  };

  useEffect(() => {
    createModal("HelloWorld2", <HelloWorld2 />);
  });

  const handelHelloWorld2 = () => {
    openModal("HelloWorld2");

    setTimeout(() => {
      closeModal("HelloWorld2");
    }, 3000);
  };

  return (
    <>
      <Modal />
      <Button onClick={handelHelloWorld1}>show HelloWorld1 modal</Button>
      <Button onClick={handelHelloWorld2}>show HelloWorld2 modal</Button>
    </>
  );
}
```
