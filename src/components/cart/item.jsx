import React, { useState } from "react";
import { connect } from "react-redux";
import { data } from "./../../config";

const Item = (props) => {
  const {
    item,
    index,
    removeFromCart,
    cart,
    addTopping,
    removeTopping,
  } = props;

  const [toppingsOpen, setToppingsOpen] = useState(false);

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
  };

  const handleAddTopping = (topping) => {
    const itemExists = cart[index].toppings.find(
      (t) => t.name === topping.name
    );

    if (!itemExists) {
      addTopping(topping, index);
    }
  };

  const handleRemoveTopping = (topping, toppingIndex) => {
    const itemExists = cart[index].toppings.find(
      (t) => t.name === topping.name
    );

    if (itemExists) {
      removeTopping(topping, toppingIndex, index);
    }
  };

  return (
    <>
      <li className="menu-item">
        <div className="header">
          <h3 className="title">
            {item.name} - {item.price}
          </h3>
          <button
            className="add-to-cart"
            onClick={() => handleRemoveFromCart(index)}
          >
            Remove
          </button>
        </div>
        <p className="description">{item.description}</p>
        <button
          className="add-toppings"
          onClick={() => setToppingsOpen(!toppingsOpen)}
        >
          Toppings
        </button>
        {cart[index].toppings.length > 0 && (
          <ul>
            {cart[index].toppings.map((topping, index) => {
              return (
                <li key={index}>
                  <p>
                    {topping.name} - {topping.price}
                  </p>
                  <button onClick={() => handleRemoveTopping(topping, index)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {toppingsOpen && (
          <div className="toppings">
            {data.toppings &&
              data.toppings.map((topping, index) => {
                if (!item.toppings.find((t) => t.name === topping.name)) {
                  return (
                    <button
                      key={index}
                      onClick={() => handleAddTopping(topping)}
                    >
                      {topping.name} - {topping.price}
                    </button>
                  );
                }

                return false;
              })}
          </div>
        )}
      </li>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (index) =>
      dispatch({ type: "REMOVE_FROM_CART", payload: { index } }),
    addTopping: (topping, index) =>
      dispatch({ type: "ADD_TOPPING", payload: { topping, index } }),
    removeTopping: (topping, toppingIndex, cartIndex) =>
      dispatch({
        type: "REMOVE_TOPPING",
        payload: { topping, toppingIndex, cartIndex },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
