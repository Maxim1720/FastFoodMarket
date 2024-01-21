import { ChangeEvent, FormEvent, useState } from "react";
import "./OrderForm.css";
import img from "../../../assets/img/1.png";
import { DishData } from "../../card/dish/DishCard";
import { States } from "../../../Constans";

export interface OrderData {
    count: number,
    address: string,
    comment: string,
    client: string,
    dish: string,
    _links: {
        self: {
            href: string
        },
        client: {
            href: string
        },
        dish: {
            href: string
        }
    }
}

export interface ClientData {
    firstname: string,
    lastname: string,
    phone: string
    _links: {
        self: {
            href: string
        }
    }
}

export interface Order {
    orderData: OrderData,
    clientData: ClientData
}


export const OrderForm = ({ dish, onSubmit }: { dish: DishData, onSubmit: (data: Order) => void }) => {

    const [formData, setFormData] = useState<Order>({
        clientData: {
            firstname: "", lastname: "", phone: "",
            _links: {
                self: {
                    href: ""
                }
            }
        },
        orderData: {
            count: 1, address: "", comment: "",
            client: "",
            dish: dish._links.self.href,
            _links: {
                self: {
                    href: ""
                },
                client: {
                    href: ""
                },
                dish: {
                    href: ""
                }
            }
        }
    });

    const onClientChange = (e: ChangeEvent): void => {
        setFormData(prev => ({
            ...prev,
            clientData: {
                ...prev.clientData,
                [e.target.name]: e.target.value
            }
        }))
    }

    const onOrderChange = (e: ChangeEvent): void => {
        setFormData(prev => ({
            ...prev,
            orderData: {
                ...prev.orderData,
                [e.target.name]: e.target.value
            }
        }))
    }

    const submit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }
    return (
        <form className="order-form" onSubmit={submit}>
            <div className="img">
                <img className="img" src={'data:image/jpeg;base64,' + dish.image} alt="img burger" />
            </div>
            <div className="order-dish-name">
                {dish.name}
            </div>
            <div className="order-data">
                <input className="count" type="number" min={1} name="count" onChange={onOrderChange} placeholder="Количество" />
                <input type="text" name="address" onChange={onOrderChange} placeholder="Адрес" />
                <input type="text" name="comment" onChange={onOrderChange} placeholder="Комментарий к заказу" />
                <div className="client-data">
                    <input type="text" name="firstname" placeholder="Имя" onChange={onClientChange} />
                    <input type="text" name="lastname" placeholder="Фамилия" onChange={onClientChange} />
                    <input type="tel" name="phone" placeholder="Номер телефона" onChange={onClientChange} />
                </div>
            </div>
            <input type="submit" value={"Заказать"} />
        </form>
    );
}
