const Form = () => {
  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Your Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="3" placeholder="Your Message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="goback" className="btn btn-primary" onClick={() => window.open("/")}>GoBack</button>
      </form>
    </div>
  );
};

export default Form;
