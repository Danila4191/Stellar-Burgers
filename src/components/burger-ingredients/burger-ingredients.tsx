import React, { useContext,  useState,FC } from "react";
import { isMobileContext } from "../../services/context/appContext";
import PropTypes from "prop-types";
import { useSelectorTyped } from "../../services/types/types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { IIngredientsProps,IingredientObjectProps,IIngredientsGridProps, Scroll } from "../../services/types/types";

const Grid:FC<IIngredientsGridProps> = (props) => {
  return (
    <ul id={`${props.id}`} className={`${styles.section} pb-10`}>
      <h2 className={`${styles.subtitle} text_type_main-medium`}>
        {props.title}
      </h2>
      <div className={`${styles.grid} pr-4 pl-4 pt-6`}>{props.children}</div>
    </ul>
  );
};


const BurgerIngredients:FC<IIngredientsProps> = ({
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
  pageChange,
}) => {
  const ingredientsFromSetver = useSelectorTyped(
    (state) => state.ingredients.productData
  );

  const [cursorPosition, setCursorPosition] = React.useState<Scroll>({y:0});
  const [current, setCurrent] = useState<string>("");

  const { isMobile } = useContext(isMobileContext);
  const total = useSelectorTyped((state) => state.total.total);
  
 
  function sroll(type:string) {
    document
      .querySelector(`#${type}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
    OnScrol();
  }

  const OnScrol = (e?: React.UIEvent<HTMLDivElement, UIEvent>):void => {
    const bun = document.querySelector<HTMLElement>(`#${"bun"}`)?.offsetTop;
    const main = document.querySelector<HTMLElement>(`#${"main"}`)?.offsetTop;
    const souse = document.querySelector<HTMLElement>(`#${"souce"}`)?.offsetTop;
    const scrollTop = document.querySelector<HTMLElement>(`#${"list"}`)?.scrollTop;
    if(scrollTop !== undefined){
    setCursorPosition({
     // ...cursorPosition,
      y: scrollTop,
    });}

    if ( bun !== undefined  && cursorPosition.y < bun  ) {
      setCurrent("bun");
    
    } else if ( bun !== undefined && souse!== undefined  && cursorPosition.y > bun && cursorPosition.y < souse) {
      setCurrent("souce");

    } else if (main !== undefined && cursorPosition.y < main) {
      setCurrent("main");
    }
  };

  return (
    <div className={styles.burger__ingredients}>
      <h1 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h1>
      <div className={`${styles.scrollbar} pb-10`}>
        <div
          className={`${styles.line} ${
            current == "bun" && styles.line_active
          } pb-4 pt-4`}
        >
          <p
            onClick={() => sroll("bun")}
            className={`${styles.tab__button} text text_type_main-small`}
          >
            Булки
          </p>
        </div>
        <div
          className={`${styles.line} ${
            current == "souce" && styles.line_active
          } pb-4 pt-4`}
        >
          <p
            onClick={() => sroll("souce")}
            className={`${styles.tab__button}  text text_type_main-small`}
          >
            Соусы
          </p>
        </div>
        <div
          className={`${styles.line}  ${
            current == "main" && styles.line_active
          } pb-4 pt-4`}
        >
          <p
            onClick={() => sroll("main")}
            className={`${styles.tab__button}  text text_type_main-small`}
          >
            Начинки
          </p>
        </div>
      </div>

      <div
        id="list"
        onScroll={(e) => {
          OnScrol(e);
        }}
        className={styles.ingredients__list}
      >
        <Grid id="bun" title="Булки">
          {ingredientsFromSetver
            .filter((ingredient:IingredientObjectProps) => ingredient.type == "bun")
            .map((ingredient:IingredientObjectProps) => (
       
                <BurgerIngredient
                  ingredient={ingredient}
                  setModalActive={setModalActive}
                  setModal={setModal}
                  setOnCloseFunc={setOnCloseFunc}
                  modalActive={modalActive}
                  key={ingredient._id }
                />
            
            ))}
        </Grid>

        <Grid id="souce" title="Соусы">
          {ingredientsFromSetver
            .filter((ingredient:IingredientObjectProps) => ingredient.type == "sauce")
            .map((ingredient:IingredientObjectProps) => (
      
                <BurgerIngredient
                  key={ingredient._id }
                  ingredient={ingredient}
                  setModalActive={setModalActive}
                  setModal={setModal}
           
                  setOnCloseFunc={setOnCloseFunc}
                  modalActive={modalActive}
                />
      
            ))}
        </Grid>
        <div className="pb-15">
          <Grid id="main" title="Начинки">
            {ingredientsFromSetver
              .filter((ingredient:IingredientObjectProps) => ingredient.type == "main")
              .map((ingredient:IingredientObjectProps) => (
         
                  <BurgerIngredient
                    key={ingredient._id }
                    ingredient={ingredient}
                    setModalActive={setModalActive}
                    setModal={setModal}
                    setOnCloseFunc={setOnCloseFunc}
                    modalActive={modalActive}
                  />
             
              ))}
          </Grid>
        </div>
      </div>

      {isMobile && (
        <div className={`${styles.scrollbar__mobile}`}>
          <div className={`${styles.scrollbar__mobile__container} pl-2`}>
            <p className={`pr-2 text text_type_digits-default `}>{total}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div className={`${styles.scrollbar__button__mobile} pt-4 pr-3`}>
            <Button onClick={pageChange} type="primary" size="small">
              <p className={` text text_type_main-small `}>
                {"Смотреть заказ "}
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerIngredients;
