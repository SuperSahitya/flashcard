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
        animate={{ rotateY: flip ? 180 : 0, rotateX: flip ? [20, 30, 8] : 5 }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      >
        <div className={styles.front}>
          <div>{question}</div>
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <div className="border-2 border-zinc-500 p-1 rounded-md text-xs text-secondary">
              {category}
            </div>
            <div className="border-2 border-zinc-500 p-1 rounded-md text-xs text-secondary">
              {difficulty}
            </div>
          </div>
          <div className="text-secondary text-sm absolute bottom-4">
            Click To Reveal Answer!
          </div>
        </div>
        <div className={styles.back}>
          <div>{answer}</div>
          <div className="text-secondary text-sm absolute bottom-4">
            Click To See Question!
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Flashcard;
