import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Focusable } from "react-js-spatial-navigation";

const Item = (props) => {
  const { item, restaurant, addToCart, cart, removeById } = props;

  const handleAddToCart = () => {
    addToCart(item, restaurant);
  };

  const handleRemoveFromCart = (id) => {
    removeById(id);
  };

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      setQuantity(cart.filter((cartItem) => cartItem.id === item.id).length);
    } else {
      setQuantity(0);
    }
  }, [cart]);

  if (!item) {
    return <h2>No menu items...</h2>;
  }

  return (
    <>
      <li className="menu-item">
        <div className="header">
          <h3 className="title">
            {item.name} - {item.price}
          </h3>
          <div>
            {quantity > 0 && (
              <Focusable onClickEnter={() => handleRemoveFromCart(item.id)}>
                <button
                  className="add-to-cart"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </Focusable>
            )}
            <Focusable onClickEnter={handleAddToCart}>
              <button className="add-to-cart" onClick={() => handleAddToCart()}>
                Add
              </button>
            </Focusable>
          </div>
        </div>
        <div className="counter">
          <button className="counter-button">-</button>
          <div className="counter-input-wrapper">
            <input
              id={`counter-input-${item.id}`}
              className="counter-input"
              type="text"
              disabled
              value={quantity}
            />
          </div>
          <button className="counter-button">+</button>
        </div>
        <p className="description">{item.description}</p>
      </li>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (menuItem, restaurant) =>
      dispatch({ type: "ADD_TO_CART", payload: { menuItem, restaurant } }),
    removeById: (id) => dispatch({ type: "REMOVE_BY_ID", payload: { id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
