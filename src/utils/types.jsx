import PropTypes from "prop-types";
const ingredientType = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    type: PropTypes.string,
    position: PropTypes.string,
  };
  export default ingredientType;