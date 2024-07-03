import './publikacia.styles.scss'; 

const PublicationDisplay = ({ name, imageUrl, link, createdAt }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="publication-block" style={{ backgroundImage: `url(${imageUrl})`,height: '300px', width: "300px", cursor: 'pointer', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={handleClick}>
      <div className="publication-content">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default PublicationDisplay;