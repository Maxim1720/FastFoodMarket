import "./DishCard.css";
import { States } from "../../../Constans";
import React, { useState } from "react";
import DeleteDishModal from "./modal/DeleteDishModal";
import { DishFormModal } from "../../form/dish/modal/DishFormModal";
import { OrderFormModal } from "../../form/order/modal/OrderFormModal";
import { Order } from "../../form/order/OrderForm";


export interface DishData {
    name: string,
    price: string,
    description: string,
    composition: string,
    _links: {
        self: {
            href: string
        },

    }
    image?: Array<number>;
}

const buttons = {
    update: (data: DishData) => <EditBtn dishData={data} />,
    delete: (data: DishData) => <DeleteBtn dishData={data} />,
    read: (data: DishData) => <ReadBtn dishData={data} />
}


export default function DishCard({ state, data }: { data: DishData, state: States }) {

    return (
        <div className={"dish " + state.toLowerCase()}>
            <img className="img object-cover"
                src={'data:image/jpeg;base64,' + data.image}
                alt="img" />

            <hr />
            <div className="description">
                <div className="name">{data.name}</div>

                <div className="description-description-composition">
                    <div>
                        <span className="bold">Описание: </span>
                        {data.description}
                    </div>
                    <div>
                        <span className="bold">Состав: </span>{data.composition}
                    </div>
                </div>
                <div className="price">{data.price}р</div>
            </div>
            {
                buttons[state.toLowerCase() as keyof typeof buttons](data)
            }
        </div>
    );
}

const EditBtn = ({ dishData }: { dishData: DishData }): JSX.Element => {

    const [modalOpened, setOpened] = useState<boolean>(false);

    const openHandler = (flag: boolean): void => {
        setOpened(flag);
    }

    const onClick = (e: React.MouseEvent | MouseEvent) => {
        e.preventDefault();
        setOpened(true);
    }

    return (
        <>
            <button className="btn update "
                data-modal-target="update-dish-modal" data-modal-toggle="popup-modal"
                onClick={onClick}>
                Редактировать
            </button>
            {
                modalOpened ?
                    <DishFormModal dish={dishData} openHandler={openHandler} />
                    : <></>
            }
        </>
    );
}

const ReadBtn = ({ dishData }: { dishData: DishData }): JSX.Element => {


    const [clicked, setClicked] = useState<boolean>(false);

    const onClick = (e: React.MouseEvent | MouseEvent): void => {
        e.preventDefault();
        setClicked(true);
    }
    return (
        <>
            <button className="btn" onClick={onClick}>
                Заказать
            </button>
            {clicked ? <OrderFormModal dish={dishData} openHandler={setClicked} onOrderSubmit={
                (order: Order) => document.dispatchEvent(new CustomEvent<Order>("orderCreated", { detail: order }))
            } /> : <></>}
        </>

    );
}

const DeleteBtn = ({ dishData }: { dishData: DishData }): JSX.Element => {

    const [flag, setFlag] = useState<boolean>(false);

    const onCloseModal = (): void => {
        setFlag(false);
    }

    const onClick = (e: React.MouseEvent | MouseEvent): void => {
        e.preventDefault();
        setFlag(true);
    }

    const btn = (<button className="btn delete " data-modal-target="delete-dish-modal" data-modal-toggle="popup-modal" onClick={onClick}>Удалить</button>);

    return (
        <>
            {flag ? <DeleteDishModal data={dishData} onClose={onCloseModal} /> : <></>}
            {btn}
        </>
    );
}