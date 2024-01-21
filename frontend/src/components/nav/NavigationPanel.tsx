import "./Navigation.css";
import icon from "../../assets/BurgerIcon.png";
import { States } from "../../Constans";
import { useEffect, useState } from "react";


export const NavigationPanel = ({ onChangeState }: { onChangeState: (state: States) => void }): JSX.Element => {

    const [state, setSelectedState] = useState<States>(States.READ);

    const setState = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, state: States): void => {
        e.preventDefault();
        setSelectedState(state);
        onChangeState(state);
    }

    useEffect(() => {

        const handleChangeState = (e: CustomEvent<States>) => {
            setSelectedState(e.detail);
        }

        document.addEventListener("stateChanged", handleChangeState as EventListener);

        return () => document.removeEventListener("stateChanged", handleChangeState as EventListener);
    }, []);

    return (
        <div className="navbar">

            <div className="icon-container">
                <a className="icon" href="" onClick={(e) => setState(e, States.READ)}>
                    <img src={icon} alt="Icon" />
                </a>
            </div>

            <div className="links-container">
                <a className={"link w-full" + (state === States.CREATE ? " selected" : "")} href="" onClick={(e) => setState(e, States.CREATE)}>Create</a>
                <a className={"link w-full " + (state === States.UPDATE ? " selected" : "")} href="" onClick={(e) => setState(e, States.UPDATE)}>Update</a>
                <a className={"link w-full " + (state === States.DELETE ? " selected" : "")} href="" onClick={(e) => setState(e, States.DELETE)}>Delete</a>
                <a className={"link w-full " + (state === States.ORDERS ? " selected" : "")} href="" onClick={(e) => setState(e, States.ORDERS)}>Orders</a>
            </div>
        </div >
    );
}
