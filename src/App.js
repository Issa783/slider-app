import { useEffect, useState } from "react";
import styles from "./style.module.css"
import { FaQuoteRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import Data from "./data"
function App() {
  const[people,setPeople] = useState(Data)
  const[index,setIndex] = useState(0)
  useEffect(()=>{
    let lastIndex = people.length - 1
    if (index < 0){
      setIndex(lastIndex)
    }
    if(index > lastIndex){
      setIndex(0)
    }
  },[index,people])
  useEffect(()=>{
    let slider = setInterval(()=>{
      setIndex(index + 1)
    },3000)
    return () => {
       clearInterval(slider)
    }
  },[index]) 
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>
          <span>/</span> Reviews
        </h2>
      </div>
      <div className={styles.sectioncenter}>
        {people.map((person,personIndex) => {
          const{id,image,name,title,quote} = person;
          let position = styles.nextSlide
          if(personIndex === index){
            position = styles.activeSlide
          }
          if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)){
            position = styles.lastSlide
          }
          return (<article key = {id} className={`${position}`}>
            <img src={image} alt={name} className={styles.personimg} />
            <h4>{name}</h4>
            <p className={styles.title}>{title}</p>
            <p className={styles.text}>{quote}</p>
            <FaQuoteRight className={styles.icon} />
          </article>)
        })}
        <button className={styles.prev} onClick={() =>{setIndex(index - 1)}}>
          <FaChevronLeft />
        </button>
        <button className={styles.next} onClick={() => {setIndex(index + 1)}}>
          <FaChevronRight />
          </button>
      </div>
    </section>
    
  );
}

export default App;
