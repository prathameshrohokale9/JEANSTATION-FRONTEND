import React from 'react';

const Cards = ({ img, title, text, price, onAddToCart, custId, itemCode }) => {
  const handleAddToCart = () => {
    onAddToCart(title, img, price, custId, itemCode); // Pass price along with other parameters
  };

  return (
    <div className="col">
      <div className="card">
        <img src={img} className="card-img-top" alt={title} style={{ height: "15rem", width: "18rem" }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          {/* <button type="button" class="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
