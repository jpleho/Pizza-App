import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Item from "./item";
import { sum } from "./../../helpers";
import { Link, useHistory } from "react-router-dom";
import { Focusable } from "react-js-spatial-navigation";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart);
  const history = useHistory();

  const handleClickEnter = (path) => {
    history.push(path);
  };
  if (!cartItems || cartItems.length <= 0) {
    return <h2>No Items in cart...</h2>;
  }

  return (
    <>
      <h2>Cart</h2>
      {cartItems.length > 0 && <h4>Total: {sum(cartItems, "price")}</h4>}
      <ul className="menu">
        {cartItems.length > 0 &&
          cartItems.map((cartItem, index) => {
            return <Item item={cartItem} index={index} key={index} />;
          })}
      </ul>
      {cartItems.length > 0 && (
        <Focusable onClickEnter={() => handleClickEnter(`/checkout`)}>
          <Link to={`/checkout`}>Go to checkout</Link>
        </Focusable>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (menuItem) =>
      dispatch({ type: "ADD_TO_CART", payload: { menuItem } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
