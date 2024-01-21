import { DishData } from "../../../card/dish/DishCard";
import DishForm from "../DishForm";
import { Modal } from "../../../modal/Modal";

export const DishFormModal = ({ dish, openHandler }: { dish: DishData, openHandler: (flag: boolean) => void }): JSX.Element => {

    const setModalIsOpen = (flag: boolean) => {
        openHandler(flag);
    }
    return (
        <Modal content={
            <DishForm prevData={dish} onSubmit={
                (newData: DishData): void => {
                    document.dispatchEvent(new CustomEvent("dishUpdated", {
                        detail: {
                            ...newData,
                            _links: {
                                ...dish._links
                            }
                        }
                    }));
                    setModalIsOpen(false);
                }
            } />
        } openHandler={openHandler} />
    );
}