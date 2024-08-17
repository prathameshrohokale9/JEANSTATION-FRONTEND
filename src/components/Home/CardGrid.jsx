import Cards from './Cards';

const CardGrid = ({ cards }) => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cards.map((card, index) => (
          <Cards
            key={index}
            img={card.img}
            title={card.title}
            text={card.text}
          />
         
        ))}
      </div>
    </div>
  );
};

export default CardGrid;

