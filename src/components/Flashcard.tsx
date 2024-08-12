"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./flashcard.module.css";

const Flashcard = ({
  question,
  answer,
  category,
  difficulty,
  direction,
}: {
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  direction: "next" | "prev";
}) => {
  const [flip, setFlip] = useState(false);

  const variants = {
    enter: (direction: string) => {
      return {
        x: direction === "next" ? "-100vw" : "100vw",
        rotate: direction === "next" ? -40 : 40,
      };
    },
    center: {
      x: 0,
      rotate: 0,
    },
    exit: (direction: string) => {
      return {
        x: direction === "next" ? "100vw" : "-100vw",
        rotate: direction === "next" ? 40 : -40,
      };
    },
  };

  return (
    <motion.div
      className={styles.card}
      onClick={() => setFlip(!flip)}
      variants={variants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={styles.content}
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      >
        <div className={styles.front}>{question}</div>
        <div className={styles.back}>{answer}</div>
      </motion.div>
    </motion.div>
  );
};

export default Flashcard;