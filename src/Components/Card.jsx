import PropTypes from 'prop-types';

function Card({ item = {}, id, handleClick = () => {} }) {
    const itemClass = item?.stat ? " active " + item.stat : "";

    return (
        <div className={"card" + itemClass} onClick={() => handleClick(id)}>
            <img src={item?.img || "placeholder.png"} alt="Card image" />
        </div>
    );
}

// PropTypes validation
Card.propTypes = {
    item: PropTypes.shape({
        img: PropTypes.string,
        stat: PropTypes.string,
    }).isRequired,
    id: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Card;
