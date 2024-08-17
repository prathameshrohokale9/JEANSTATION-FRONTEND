const Cards = ({ img, title, text }) => {
    return (
        <div className="col">
          <div className="card" onClick={() => window.location.href = `/Store`}>
            <img src={img} className="card-img-top" alt={title} style={{ height: "20rem" }} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{text}</p>
            </div>
          </div>
        </div>
      );
};

export default Cards;
