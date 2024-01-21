import { useEffect, useState } from "react";
import { Order } from "../../form/order/OrderForm";
// import "./OrderCard.css"
import "./OrderCard.scss";
import { DishData } from "../dish/DishCard";
import { Spinner } from "../../spinner/Spinner";
import { rewriteUrl } from "../../../utils/Utils";


export const OrderCard = ({ order }: { order: Order }) => {

    const [dish, setDish] = useState<DishData>();

    useEffect(() => {
        fetch(rewriteUrl(order.orderData._links.dish.href)).then(resp => resp.json()).then(json => setDish(json));
    }, [order.orderData._links.dish.href]);


    if (!dish) {
        return (<div className="w-full h-full flex flex-col items-center justify-center"><Spinner /></div>)
    }

    return (
        <div className="order-card">
            <div className="order-card_order-data">
                <img className="order-card_order-data_img" src={'data:image/jpeg;base64,' + dish.image} alt="Dish image" />
                <div className="order-card_order-data_text">

                    <div className="order-card_order-data_text-main">
                        <div className="order-card_order-data_text-main_name">
                            {dish.name} x <span className="text-lime-500">{order.orderData.count}</span>
                        </div>
                        <div>
                            {order.orderData.address}
                        </div>
                    </div>

                    <div className="order-card_order-data_text-comment">
                        "{order.orderData.comment}"
                    </div>

                </div>
            </div>
            <div className="order-card_client-data">
                <div>
                    <b>Имя:</b> {order.clientData.firstname}
                </div>
                <div>
                    <b>Фамилия:</b> {order.clientData.lastname}
                </div>

                <div>
                    <b>Номер телефона:</b> {order.clientData.phone}
                </div>
            </div>
        </div>
    );
}