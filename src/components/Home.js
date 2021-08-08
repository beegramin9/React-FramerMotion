import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from './Loader';

/* Variants
1. cleaner code by reducing duplicacy and referencing object from outside
2. cleaner code by propagate variants down through the DOM, from parent DOM to child DOM
3. create timing relationship between parent motion 
and children motion using transition orchestration properties */

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: 5
    }
  },
  tab: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: 5
    }
  }
}

const containerVariants = {
  hidden: { 
    opacity: 0, 
  },
  visible: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.5 }
    /* transition은 실제로 보이는 visible에 준다. 그러므로
    따로 transition prop을 줄 필요 없다 */
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};

const Home = () => {
  return (
    <motion.div className="home container"
      variants={containerVariants}
      initial="hidden"
      // {{}}의 의미: dynamic date가 들어오면 {}, 그리고 마침 그 dynamic data가 object라서 결론적으로 bracket이 두번 쓰이는 것
      // jsx의 Style처럼, framerMotion의 animate는 css의 hyphen을 쓰지 않고, CamalCase로 대체한다
      // x,y는 position right,left,top,bottom 처럼 최초 자리에서 옮겨진다. 단, y축은 위에서 아래로
      // animate={{ fontSize: 50, color:'#ff2994', x: 10, y: -10 }}
      animate="visible"
      exit="exit"
    >
      <h2>Welcome to Pizza Joint</h2>
      <Link to="/base">
        <motion.button
          variants={buttonVariants}
          // 2. propagate variants down through the DOM, BUT JUST THE NAME OF VARIANCE, NOT THE CONTENT
          // initial, animate, exit 한번 더 쓸 필요 없다
          whileHover="hover"
          whileTab="tab"
        >
          Create Your Pizza
        </motion.button>
      </Link>
      <Loader/>
    </motion.div>
  )
}

export default Home;