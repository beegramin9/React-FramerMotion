import React, { useState } from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Base from './components/Base';
import Toppings from './components/Toppings';
import Order from './components/Order';
import Modal from './components/Modal';
import { AnimatePresence } from 'framer-motion';

function App() {
  //* get & update information about current route location
  //* 대표적으로 pathname = slug, search = querystring 정도가 있음
  const location = useLocation();
  const [pizza, setPizza] = useState({ base: "", toppings: [] });
  const [showModal, setShowModal] = useState(false);

  const addBase = (base) => {
    // ...pizza = toppings: [...]
    setPizza({ ...pizza, base })
  }
  
  const addTopping = (topping) => {
    let newToppings;
    // if 기존 toppings에 없는 새로운 topping =>
    if(!pizza.toppings.includes(topping)){
      // 기존 Array에 단순하게 더해주기만 하면 된다
      newToppings = [...pizza.toppings, topping];
    // if 기존 toppings에 속한 topping =>
    } else {
      // 원래 있던 topping을 한번 더 눌러서 deactivate, 즉 제거하는 것이므로
      // 해당 deactivated된 topping을 제외, filter해서 새로운 array를 만든다
      newToppings = pizza.toppings.filter(item => item !== topping);
    }
    // ...pizza = base: "..."
    setPizza({ ...pizza, toppings: newToppings });
  }

  return (
    <>
      <Header />
      <Modal showModal={showModal} />
      {/* AnimatePresence로 감싸면 모든 Component의 exit을 읽을 수 있다 */}
      <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
        <Switch location={location} key={location.key}>
          <Route path="/base">
            <Base addBase={addBase} pizza={pizza} />
          </Route>
          <Route path="/toppings">
            <Toppings addTopping={addTopping} pizza={pizza} />
          </Route>
          <Route path="/order">
            <Order pizza={pizza} setShowModal={setShowModal} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;