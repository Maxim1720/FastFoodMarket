import { useEffect, useState } from "react";
import DishCard, { DishData } from "../card/dish/DishCard";
import { Spinner } from "../spinner/Spinner";
import { States } from "../../Constans";
import { rewriteUrl } from "../../utils/Utils";

const fetchDishes = async (): Promise<DishData[]> => {
    const response: Response = await fetch("/api/dishes");
    const json = await response.json();
    console.log(json);
    return json._embedded.dishes.map((d: DishData) => d);
}


export const Dishes = ({ appState }: { appState: States }) => {
    const [state, setState] = useState<{
        imported: boolean,
        items: DishData[],
        state: States
    }>({
        imported: false,
        items: [],
        state: appState
    });

    useEffect(
        () => {
            fetchDishes().then(items => setState(prev => ({
                ...prev,
                imported: true,
                items: [...items]
            })));
        }, []
    );
    useEffect(() => {
        const handleChangeState = (e: CustomEvent<States>) => {
            setState(prev => ({
                ...prev,
                state: e.detail
            }))
        }
        document.addEventListener("stateChanged", handleChangeState as EventListener);
        return () => {
            document.removeEventListener("stateChanged", handleChangeState as EventListener)
        };
    }, []);

    useEffect(() => {
        const handleDishDeleting = (event: CustomEvent<DishData>) => {
            console.log(event.detail);
            fetch(rewriteUrl(event.detail._links.self.href), {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    setState(prev => {
                        const newArr = prev.items.filter(d => d._links.self.href !== event.detail._links.self.href);
                        return {
                            ...prev,
                            items: [...newArr],
                        };
                    });
                });
        }
        document.addEventListener("dishDeleted", handleDishDeleting as EventListener);

        return () => {
            document.removeEventListener('dishDeleted', handleDishDeleting as EventListener);
        };
    }, []);


    useEffect(() => {

        const handleDishUpdating = (event: CustomEvent<DishData>) => {
            const body = { ...event.detail };
            if (event.detail.image) {
                fetch(rewriteUrl(event.detail._links.self.href), {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        image: null
                    })
                })
                    .then(resp => resp.json())
                    .then(json => console.log(json))
            }

            fetch(rewriteUrl(event.detail._links.self.href), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(resp => resp.json())
                .then(json => {
                    setState(prev => {
                        const items = prev.items;
                        items[
                            items.findIndex(i => i._links.self.href
                                === json._links.self.href)
                        ] = json;

                        return {
                            ...prev,
                            items,
                        }
                    });
                });
        }

        document.addEventListener("dishUpdated", handleDishUpdating as EventListener);
        return () => {

            document.removeEventListener("dishUpdated", handleDishUpdating as EventListener);
        };
    }, []);


    useEffect(() => {
        const handleCreatedDish = (event: CustomEvent<DishData>) => {
            setState(prev => {
                const items = prev.items;
                items.push(event.detail);
                return {
                    ...prev,
                    items
                };
            })
        };

        document.addEventListener("dishCreated", handleCreatedDish as EventListener);
        return () => document.removeEventListener("dishCreated", handleCreatedDish as EventListener);
    }, [])

    if (!state.imported) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Spinner />
            </div>
        );
    }
    return (
        state.items.map(d => (
            <DishCard data={d} state={state.state} key={d._links.self.href} />
        )));

}