const LandingCard = ({ title, description }) => {
  return (
    <div className="card bg-neutral lg:card-side mt-2 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default LandingCard;
