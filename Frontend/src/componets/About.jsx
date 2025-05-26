const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">About Our Dessert Shop 🍰</h2>
        <p className="text-secondary fs-6">
          Indulge in handcrafted sweets and a smart dining experience!
        </p>
      </div>

      <div className="mb-4 p-4 rounded bg-light border shadow-sm">
        <h4 className="fw-semibold text-danger">Who We Are</h4>
        <p className="fs-6 text-dark">
          Welcome to our Dessert Shop! We serve a variety of mouth-watering 
          treats like cakes, pastries, ice creams, waffles, and more! Every 
          dish is crafted with care to deliver a premium dessert experience.
        </p>
      </div>

      <div className="mb-4 p-4 rounded bg-warning bg-opacity-25 border shadow-sm">
        <h4 className="fw-semibold text-success">🔗 Smart Seating with Arduino + IoT</h4>
        <p className="fs-6 text-dark">
          We offer a tech-powered smart dining setup:
        </p>
        <ul className="list-group fs-6">
          <li className="list-group-item bg-transparent border-0">👥 People counting using Arduino sensors.</li>
          <li className="list-group-item bg-transparent border-0">🟢 Live table availability updates on our website.</li>
          <li className="list-group-item bg-transparent border-0">⏰ Save time by checking seats before visiting.</li>
        </ul>
      </div>

      <div className="text-center mt-5">
        <p className="fs-6 text-muted">
          Great desserts + smart technology = A sweet & smooth experience! 🍩🍨
        </p>
      </div>
    </div>
  );
};

export default About;
