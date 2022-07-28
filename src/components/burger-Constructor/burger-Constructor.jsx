
import PropTypes from "prop-types";
import OrderInfo from "../order-info/order-info";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  DELETE_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_CONSTRUCTOR,
  SET_TOTAL,
  TOOGLE_INGREDIENTS_CONSTRUCTOR,
  getOrderNumber,

} from "../../services/actions/actions";

const Item = ({ item, position }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.ingredientsConstructor.items);
  const total = useSelector((state) => state.total.total);

  function itemsDelete(item) {
    let itemsNew = Array.from(items);
    let itemDelete = itemsNew.indexOf(item);
    itemsNew.splice(itemDelete, 1);
    let summ = itemsNew.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    dispatch({ type: SET_TOTAL, payload: summ });
    dispatch({ type: DELETE_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
  }

  const [{ isDrag, isTypeDrag }, constructorDragRef] = useDrag({
    type: "new",
    item: item,
    collect: (monitor) => ({
      isTypeDrag: monitor.getItemType(),
      isDrag: monitor.isDragging(),
    }),
  });

  function move() {
    let itemsNew = Array.from(items);
    let newItem = itemsNew.indexOf(isItem); // держу в руке
    let oldItem = itemsNew.indexOf(item); // снизу
    itemsNew.splice(oldItem, 1, isItem);
    itemsNew.splice(newItem, 1, item);
    dispatch({ type: TOOGLE_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
  }

  const [{ isItem, isOverItem }, constructorToggle] = useDrop({
    accept: "new",
    hover(Item) {
      move();
    },
    drop(Item) {
      move();
    },
    collect: (monitor) => ({
      isItem: monitor.getItem(),
      isOverItem: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={
        item.type !== "bun"
          ? isTypeDrag == "new"
            ? constructorToggle
            : constructorDragRef
          : null
      }
      className={item.type === "bun" ? `` : `${styles.Item}  pr-5`}
      style={isOverItem ? { opacity: "0" } : null}
    >
      {item.type !== "bun" && <DragIcon />}
      <ConstructorElement
        handleClose={() => itemsDelete(item)}
        type={position}
        isLocked={item.type === "bun" ? true : false}
        text={
          position === "bottom"
            ? `${item.name} (низ)`
            : position === "top"
            ? `${item.name} (верх)`
            : item.name
        }
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
};
Item.propTypes = {
  item: PropTypes.object.isRequired,
  position: PropTypes.string,
};

const BurgerConstructor = ({ setModalActive, setModal, setOnCloseFunc }) => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.ingredientsConstructor.items);
  const total = useSelector((state) => state.total.total);
  const {data,loading,failed,} = useSelector(state => state.order);
  
  
 


  const [{ isHoverMain, isTypeMain }, dropTargetMain] = useDrop({
    accept: "main",
    drop(item) {
      let itemsNew = Array.from(items);
      item.idKey = item._id + Math.random() + itemsNew.length;
      let itemCopy = Object.assign({}, item);
      itemsNew.push(itemCopy);
      let summ = itemsNew.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      );
      dispatch({ type: SET_TOTAL, payload: summ });
      dispatch({ type: ADD_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
    },

    collect: (monitor) => ({
      isHoverMain: monitor.isOver(),
      isTypeMain: monitor.getItemType(),
    }),
  });

   
  function addBun(itemsNew, item) {
    itemsNew.push(item);
    itemsNew.push(item);
    let summ = itemsNew.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    dispatch({ type: SET_TOTAL, payload: summ });
    dispatch({ type: ADD_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
  }

  const [{ isHover, isHoverBun }, dropTargetBun] = useDrop({
    accept: "bun",
    drop(item) {
      if (items.some((item) => item.type == "bun")) {
        let itemsNew = Array.from(items).filter((item) => item.type !== "bun");
        addBun(itemsNew, item);
      } else {
        let itemsNew = Array.from(items);
        addBun(itemsNew, item);
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isHoverBun: monitor.getItemType(),
    }),
  });













////открытие и закрытие  модального окна с номером заказа

  const close = () => {
    dispatch({ type: SET_TOTAL, payload: 0 });
    dispatch({ type: DELETE_INGREDIENTS_CONSTRUCTOR, payload: [] });
    setModalActive(false);
  };
  function openModal() {
    dispatch(getOrderNumber({ ingredients: items.map((item) => `${item._id}`) }))  
    ///окно открывается до получения номера 
   if (loading === false){
    setModal(<OrderInfo />);
    setOnCloseFunc(() => close); //устанавливаю функцию закрытия в стейт что бы потом
                                  // передать через пропс в modal
    setModalActive(true);
  }
}
//////////////////////////////////////////////

















  return (
    <div className={styles.BurgerConstructor}>
      <div
        ref={dropTargetBun}
        className={`${styles.BurgerList} mt-25 mb-10 pl-4 `}
      >
        <div
          className={`${styles.EmpyBun} ${styles.EmpyBun_top} ${
            isHover && isHoverBun == "bun" && styles.EmpyBun_active
          }`}
        >
          {" "}
          {items.filter((item) => item.type == "bun").length > 0 ? (
            <Item
              item={items.filter((item) => item.type == "bun")[0]}
              position="top"
            />
          ) : null}
        </div>

        <div
          ref={dropTargetMain}
          className={`${styles.BurgerListScroll}  pr-8 `}
        >
          {items.length == 0
            ? null
            : items
                .filter((item) => item.type !== "bun")
                .map((item, index) => (
                  <Item item={item} key={item._id + Math.random()} />
                ))}

          {items.filter((item) => item.type !== "bun").length > 0 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isHoverMain && isTypeMain !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {items.filter((item) => item.type !== "bun").length > 1 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isHoverMain && isTypeMain !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {items.filter((item) => item.type !== "bun").length > 2 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isHoverMain && isTypeMain !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {items.filter((item) => item.type !== "bun").length > 3 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isHoverMain && isTypeMain !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {items.filter((item) => item.type !== "bun").length > 4 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isHoverMain && isTypeMain !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
        </div>

        <div
          className={`${styles.EmpyBun} ${styles.EmpyBun_botton} ${
            isHover && isHoverBun == "bun" && styles.EmpyBun_active
          }`}
        >
          {" "}
          {items.filter((item) => item.type == "bun").length > 0 ? (
            <Item
              item={items.filter((item) => item.type == "bun")[0]}
              position="bottom"
            />
          ) : null}
        </div>
      </div>

      <div className={`${styles.Order}`}>
        <div className={`${styles.Total}`}>
          <p className={`${styles.Total__Count} pr-2  text_type_digits-medium`}>
            {total}
          </p>
          <CurrencyIcon />
        </div>
        <Button
          disabled={!items.some((item) => item.type == "bun") ? true : false}
          onClick={openModal}
          type="primary"
          size="large"
        >
          {loading  ? "Wait..." : "Оформить заказ"}
        </Button>
      </div>
    </div>
  );
};
BurgerConstructor.propTypes = {
  setModal: PropTypes.func.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
export default BurgerConstructor;
