import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

export const Modal = ({content, openHandler} : {content: JSX.Element, openHandler: (flag: boolean)=>void})=>{
    const [open, setIsOpen] = useState<boolean>(true);
    const cancelBtn = useRef(null);

    const setModalIsOpen = (flag: boolean) => {
        setIsOpen(flag);
        openHandler(flag);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelBtn} onClose={setModalIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out transition duration-[300ms]"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <Dialog.Panel>
                                {content}
                            </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>


    );
}

function setOpenHandler(flag: boolean) {
    throw new Error("Function not implemented.");
}
