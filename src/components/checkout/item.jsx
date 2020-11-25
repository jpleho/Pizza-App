import React from "react";
import { connect } from "react-redux";

const Item = (props) => {
  const { item, index, cart } = props;

  return (
    <>
      <li className="menu-item">
        <div className="header">
          <h3 className="title">
            {item.name} - {item.price}
          </h3>
        </div>
        <p className="description">{item.description}</p>
        {cart[index].toppings.length > 0 && (
          <ul>
            {cart[index].toppings.map((topping, index) => {
              return (
                <li key={index}>
                  <p>
                    {topping.name} - {topping.price}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
