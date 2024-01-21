import { DishData } from "../../../card/dish/DishCard";
import { Order, OrderForm } from "../OrderForm";
import { Modal } from "../../../modal/Modal";


export const OrderFormModal = ({ dish, openHandler, onOrderSubmit }: {
    dish: DishData,
    openHandler: (flag: boolean) => void,
    onOrderSubmit: (data: Order) => void
}) => {

    return (
        <Modal content={<OrderForm dish={dish} onSubmit={onOrderSubmit} />}
            openHandler={openHandler} />
    );
}