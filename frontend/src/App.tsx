import { useEffect, useState } from 'react';
import Container from './components/Container'
import { DishData } from './components/card/dish/DishCard'
import { NavigationPanel } from './components/nav/NavigationPanel';
import { States } from './Constans';
import DishForm from './components/form/dish/DishForm';
import { Dishes } from './components/dishes/Dishes';
import { ClientData, Order, OrderData } from './components/form/order/OrderForm';
import { Orders } from './components/orders/Orders';


function App() {
  const [state, setSelectedView] = useState<States>(States.READ);

  type StatesMap = {
    [key: string]: JSX.Element
  }
  const statesMap: StatesMap = {
    [States.READ]: <Dishes appState={States.READ} />,
    [States.CREATE]: <div className="w-full h-full flex items-center justify-center">

      <DishForm onSubmit={(data) => {
        const postData = (formData: DishData) => {
          fetch("/api/dishes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          })
            .then(resp => resp.json())
            .then(json => console.log(json))
            .then(() => {
              document.dispatchEvent(
                new CustomEvent<DishData>("dishCreated", {
                  detail: data
                })
              );
            })
        }
        postData(data);
      }} />

    </div>,
    [States.UPDATE]: <Dishes appState={States.UPDATE} />,
    [States.DELETE]: <Dishes appState={States.DELETE} />,
    [States.ORDERS]: <Orders />

  };

  useEffect(() => {
    const dishCreatedEventListener = (e: CustomEvent<DishData>) => {
      setSelectedView(States.READ);
      document.dispatchEvent(new CustomEvent<States>("stateChanged", { detail: States.READ }));
    }
    document.addEventListener("dishCreated", dishCreatedEventListener as EventListener);
    return () => {
      document.removeEventListener("dishCreated",
        dishCreatedEventListener as EventListener);
    }

  }, []);

  useEffect(() => {
    const handleOrderCreateEventListener = (e: CustomEvent<Order>) => {
      const postData = (url: string, data: ClientData | OrderData) => {
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
      };
      const order = e.detail;
      postData("/api/clients", e.detail.clientData)
        .then(resp => resp.json())
        .then(json => {
          const clientResponse = json as ClientData;
          order.orderData.client = clientResponse._links.self.href;
          postData("/api/orders", e.detail.orderData)
            .then(resp => resp.json())
            .then(() => {
              setSelectedView(States.ORDERS);
              document.dispatchEvent(new CustomEvent<States>("stateChanged", { detail: States.ORDERS }));
            });
        });
    };

    document.addEventListener("orderCreated", handleOrderCreateEventListener as EventListener);
    return () => document.removeEventListener("orderCreated", handleOrderCreateEventListener as EventListener);

  }, [])

  return (
    <>
      <div className="main-container">
        <NavigationPanel onChangeState={(selectedLink: States) => {
          setSelectedView(selectedLink);
          document.dispatchEvent(new CustomEvent<States>("stateChanged", { detail: selectedLink }));
        }} />
        <Container content={
          <>
            {
              statesMap[state]
            }

          </>
        } />
      </div>

    </>

  );
}

export default App
