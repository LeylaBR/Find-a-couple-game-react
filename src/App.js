import { useEffect, useState } from "react";

import styles from "./App.module.css";

import grape from "./img/grape.png";
import mango from "./img/mango.png";
import orange from "./img/orange.png";
import pear from "./img/pear.png";
import pineapple from "./img/pineapple.png";
import pomegranate from "./img/pomegranate.png";
import avocado from "./img/avocado.png";
import blackberry from "./img/blackberry.png";
import figs from "./img/figs.png";
import lemon from "./img/lemon.png";
import lime from "./img/lime.png";
import papaya from "./img/papaya.png";
import rambutan from "./img/rambutan.png";
import raspberry from "./img/raspberry.png";

import firework from "./img/firework.gif";

function shuffle(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

const arrayCards = [
  { id: 1, img: pomegranate },
  { id: 2, img: grape },
  { id: 3, img: mango },
  { id: 4, img: orange },
  { id: 5, img: pear },
  { id: 6, img: pineapple },
  { id: 7, img: avocado },
  { id: 8, img: blackberry },
  { id: 9, img: figs },
  { id: 10, img: lemon },
  { id: 11, img: lime },
  { id: 12, img: papaya },
  { id: 13, img: rambutan },
  { id: 14, img: raspberry },
];

const arrayPairsCards = [...arrayCards, ...arrayCards];

function App() {
  const [arrayCard, setArrayCard] = useState([]);
  const [openCard, setOpenCard] = useState([]);
  const [pairCard, setPairCard] = useState([]);
  const [comparisonCard, setComparisonCard] = useState(0);

  useEffect(() => {
    console.log(":)");
    setArrayCard(shuffle(arrayPairsCards));
  }, [arrayCard]);

  const pairCheck = (id) => {
    if (comparisonCard === id) {
      setPairCard([...pairCard, id]);
      setComparisonCard(0);
    } else {
      setComparisonCard(0);
    }
  };

  const showCard = (inx, id) => {
    if (openCard.length === 0) {
      setOpenCard([inx]);
      setComparisonCard(id);
      setTimeout(() => setOpenCard([]), 1000);
    } else if (openCard[0] === inx) {
      return;
    } else if (openCard.length >= 2) {
      setOpenCard([]);
    } else {
      setOpenCard([...openCard, inx]);
      pairCheck(id);
    }
  };

  const startOver = () => {
    setPairCard([]);
    setOpenCard([]);
    setArrayCard([]);
  };

  const createCards = arrayCard.map((el, inx) => {
    return (
      <div
        key={inx}
        className={
          openCard.includes(inx) || pairCard.includes(el.id)
            ? `${styles.card} ${styles.active}`
            : `${styles.card} ${styles.closeCard}`
        }
        onClick={() => showCard(inx, el.id)}
      >
        <img src={el.img} className={styles.openCard} />
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.block}>{createCards}</div>
      </div>
      <button className={styles.restart} onClick={startOver}>
        restart
      </button>
      <div
        className={
          pairCard.length === arrayCards.length
            ? `${styles.end} ${styles.finish}`
            : styles.end
        }
      >
        <img src={firework} />
        <span className={styles.endText}>victory</span>
        <div className={styles.close} onClick={startOver}>
          <div className={styles.closeLeft}></div>
          <div className={styles.closeRight}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
