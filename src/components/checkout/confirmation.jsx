import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { data } from "./../../config";

const Confirmation = (props) => {
  const orderItems = useSelector((state) => state.order);

  if (!orderItems.length) {
    return <h2>No order yet..</h2>;
  }

  const restaurant = data.restaurants.find(
    (r) => r.id === orderItems[0].restaurant
  );

  return (
    <>
      <h2>Thanks for your order!</h2>
      <p>Your order will arive in:</p>
      <p>42min</p>
      <p>Your details:</p>
      <ul>
        <li>{data.user.name}</li>
        <li>{data.user.address}</li>
        <li>{data.user.phone}</li>
      </ul>
      <p>Restaurant details:</p>
      <ul>
        <li>{restaurant.name}</li>
        <li>{restaurant.phone}</li>
      </ul>
      <p>Your order:</p>
      <ul>
        {orderItems[0].cart.map((item, index) => {
          return (
            <li key={index}>
              <p>
                {item.name} - {item.price}
              </p>
              {item.toppings && (
                <ul>
                  {item.toppings.map((topping, index) => {
                    return <li key={index}>{topping.name}</li>;
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
