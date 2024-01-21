import { useEffect, useState } from "react";
import { Order, OrderData } from "../form/order/OrderForm";
import { Spinner } from "../spinner/Spinner";
import { OrderCard } from "../card/order/OrderCard";
import { rewriteUrl } from "../../utils/Utils";

export const Orders = () => {
    const [orders, setOrders] = useState<OrderData[]>();
    const [ordersWithClients, setOrdersWithClients] = useState<Order[]>();
    useEffect(() => {
        fetch("api/orders").then(resp => resp.json()).then(json => {
            setOrders([...json._embedded.orders])
        }).catch((error: Error) => document.dispatchEvent(new CustomEvent("error",
            { detail: error.message })));
    }, []);

    useEffect(() => {
        const fetchClients = async (): Promise<Order[]> => {
            if (orders) {
                const promises = orders.map(async o => {
                    const resp = await fetch(rewriteUrl(o._links.client.href));
                    const json = await resp.json();
                    return { orderData: { ...o }, clientData: { ...json } } as Order;
                });

                return (await Promise.all(promises));
            }
            return [];
        }
        fetchClients().then(orders => {
            setOrdersWithClients(orders)
        });

    }, [orders])

    if (orders == undefined) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            {
                ordersWithClients?.map(o => (<OrderCard order={o} key={o.orderData._links.self.href} />))
            }
        </>
    );
}