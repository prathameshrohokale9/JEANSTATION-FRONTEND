import React from 'react';
import Cards from './Cards'; // Adjust the import path as needed

const CardGrid = ({ cards, onAddToCart }) => {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <Cards
          key={index}
          img={card.img}
          title={card.title}
          text={card.text}
          price={card.price} // Pass price to Cards component
          onAddToCart={onAddToCart}
          custId={card.custId}
          itemCode={card.itemCode}
        />
      ))}
    </div>
  );
};

export default CardGrid;
