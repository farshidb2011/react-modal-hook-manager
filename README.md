# react modal hook mangaer

this package don't have any component for show modal. so you must created your own component for show modal.

you can use this package for mangage modals.

for example:

Add ModalProvider to your root component.

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

Create your modal component.
Render all Dialog component in Modals state.

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

Component for show modal.

Note: Every component can show in modal.

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

Other component for show modal.

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

Import components and use it.
With createModal function you can create modal.

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
