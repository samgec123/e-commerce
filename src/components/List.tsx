import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ListProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand: string;
  images: string;
  thumbnail?: string;
}

const List: React.FC<ListProps> = (props) => {
  function makeImageBig(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): void {
    event.currentTarget.style.transform = "scale(1.2)";
    event.currentTarget.style.transition = "transform 0.3s ease";
  }

  function revertOriginalSize(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): void {
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.transition = "transform 0.3s ease";
  }

  return (
    <div className="card h-100" key={props.id} style={{ width: "450px" }}>
      <img
        src={props.images}
        className="card-img-top img-thumbnail img-fluid"
        alt={props.title}
        onMouseEnter={makeImageBig}
        onMouseLeave={revertOriginalSize}
      />
      <div className="card-body bg-light">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text">
          <strong>Price:</strong> ${props.price}
        </p>
        <p className="card-text">
          <strong>Rating:</strong> {props.rating}
        </p>
        <p className="card-text">
          <strong>Stock:</strong> {props.stock}
        </p>
        <p className="card-text">
          <strong>Category:</strong> {props.category}
        </p>
        <p className="card-text">
          <strong>Brand:</strong> {props.brand}
        </p>
      </div>
    </div>
  );
};

export default List;
