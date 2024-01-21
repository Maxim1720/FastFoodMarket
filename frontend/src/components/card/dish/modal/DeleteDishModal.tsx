import { DishData } from "../DishCard";
import "./DeleteDishModal.css";
import { Modal } from "../../../modal/Modal";

export default function DeleteDishModal({ data, onClose }: { data: DishData, onClose: () => void }): JSX.Element {

    return (
        <Modal content={<div className="delete-dish-modal relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="delete-dish-modal_text">
                Вы действительно хотите удалить блюдо {`"${data.name}"`} из меню?
            </div>
            <div className="buttons">
                <button className="yes-btn" onClick={
                    () => {
                        onClose();
                        document.dispatchEvent(new CustomEvent<DishData>("dishDeleted",
                            { detail: data }
                        ));
                    }}>
                    Да
                </button>
                <button className="no-btn" onClick={() => { onClose() }}>
                    Нет
                </button>
            </div>
        </div>} openHandler={onClose} />
    );
} 