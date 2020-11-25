import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Item from "./item";
import { sum } from "./../../helpers";
import { Link, useHistory } from "react-router-dom";
import { Focusable } from "react-js-spatial-navigation";
import { data } from "./../../config";

const Checkout = (props) => {
  const { confirmOrder } = props;
  const cartItems = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurant);
  const history = useHistory();

  const handleConfirmOrder = () => {
    fetch("http://localhost:3001/order-email", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: cartItems,
        user: data.user,
        restaurant: data.restaurants.find((r) => r.id === restaurant).name,
      }),
    }).then((response) => {
      if (response.status === 200) {
        history.push("/your-order");
        confirmOrder();
      } else {
        console.log(response);
      }
    });
  };

  return (
    <>
      <h2>Checkout</h2>
      <Link to="/cart">back to cart</Link>
      {cartItems.length > 0 && <h4>Total: {sum(cartItems, "price")}</h4>}
      <ul className="menu">
        {cartItems.length > 0 &&
          cartItems.map((cartItem, index) => {
            return <Item item={cartItem} index={index} key={index} />;
          })}
        {cartItems.length <= 0 && <li>No Items in cart...</li>}
      </ul>
      <Focusable onClickEnter={handleConfirmOrder}>
        <a href="#/checkout" onClick={handleConfirmOrder}>
          Confirm your order
        </a>
      </Focusable>
    </>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (menuItem) =>
      dispatch({ type: "ADD_TO_CART", payload: { menuItem } }),
    confirmOrder: () => dispatch({ type: "CONFIRM_ORDER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
