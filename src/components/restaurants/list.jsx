import React from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Focusable } from "react-js-spatial-navigation";
import { Restaurant } from "./restaurant";

export const List = (props) => {
  const { items } = props;
  let match = useRouteMatch();
  const history = useHistory();
  const currentRestaurant = useSelector((state) => state.restaurant);

  const handleEnterClick = (id) => {
    if (currentRestaurant !== null && currentRestaurant !== id) {
      alert("you cannot order from two different restaurants");

      return;
    }

    history.push("/" + id);
  };

  return (
    <>
      <Switch>
        <Route path={`${match.path}:restaurantId`}>
          <Restaurant />
        </Route>
        <Route path={match.path}>
          <h2>Restaurants nearby you:</h2>
          <ul className="restaurants">
            {items &&
              items.map((item, index) => {
                return (
                  <Focusable
                    onClickEnter={() => handleEnterClick(item.id)}
                    key={index}
                  >
                    <li
                      className="restaurants-item"
                      onClick={() => handleEnterClick(item.id)}
                    >
                      <img
                        alt=""
                        className="restaurants-logo"
                        src={`img/restaurants/${item.logo}`}
                      />
                      <div className="restaurants-link">{item.name}</div>
                    </li>
                  </Focusable>
                );
              })}
          </ul>
        </Route>
      </Switch>
    </>
  );
};
