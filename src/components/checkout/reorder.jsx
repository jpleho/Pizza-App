import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Focusable } from "react-js-spatial-navigation";
import { data } from "./../../config";

const Reorder = (props) => {
  const { reorder } = props;
  const orderItems = useSelector((state) => state.order);
  const history = useHistory();

  if (!orderItems.length || !orderItems[0].cart.length) {
    return <h2>You have not ordered anything yet...</h2>;
  }

  const restaurant = data.restaurants.find(
    (r) => r.id === orderItems[0].restaurant
  );

  const handleConfirmOrder = () => {
    history.push("/cart");
    reorder();
  };

  return (
    <>
      <h2>Reorder Your last order:</h2>
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
      <Focusable onClickEnter={handleConfirmOrder}>
        <Link onClick={handleConfirmOrder} to={`/cart`}>
          Reorder this order
        </Link>
      </Focusable>
    </>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    reorder: () => dispatch({ type: "REORDER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reorder);
