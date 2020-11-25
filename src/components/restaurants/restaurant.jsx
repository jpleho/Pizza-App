import React from "react";
import { useParams, Link } from "react-router-dom";
import { data } from "./../../config";
import Item from "./item";

export const Restaurant = (props) => {
  let { restaurantId } = useParams();
  const item = data.restaurants.find((item) => item.id === +restaurantId);

  if (!item) {
    return <h2>No restaurants found...</h2>;
  }

  return (
    <div className="restaurant">
      <h1 className="title">
        {item.name} - {item.rating}
      </h1>
      <Link to="/">back to restaurant list</Link>
      <ul className="menu">
        {item.menuItems &&
          item.menuItems.map((menuItem, index) => {
            return <Item item={menuItem} restaurant={item} key={index} />;
          })}
      </ul>
    </div>
  );
};
