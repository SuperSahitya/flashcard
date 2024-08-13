"use client";
import Flashcard from "@/components/Flashcard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const fetchFlashcards = async ({ pageParam = 0 }) => {
    const res = await fetch(`/api/flashcard?offset=${pageParam}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["flashcards"],
    queryFn: fetchFlashcards,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (data) {
      const totalCards = data.pages.flat().length;
      if (index === totalCards - 1 && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [index, data, hasNextPage, fetchNextPage]);

  const flashcards = data ? data.pages.flat() : [];

  const handleNext = () => {
    if (index < flashcards.length - 1) {
      setDirection("next");
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setDirection("prev");
      setIndex(index - 1);
    }
  };

  return (
    <main className="flex flex-col bg-primary w-screen min-h-screen justify-center items-center gap-8 text-zinc-50">
      <div className="absolute bg-primary-red rounded-full w-32 h-32 z-[10] top-16 left-16 blur-[150px]"></div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex">
          <span className="text-4xl font-bold">Flash</span>
          <span className="text-primary text-4xl font-bold">Cards</span>
        </div>
        <div className="font-semibold text-secondary">
          Your Ultimate Preparation Hub!
        </div>
      </div>
      <div className="relative w-2 h-2 mt-44">
        <AnimatePresence initial={false} custom={direction}>
          {status == "pending" && (
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
          )}
          {flashcards[index] && (
            <Flashcard
              question={flashcards[index].question}
              answer={flashcards[index].answer}
              category={flashcards[index].category}
              difficulty={flashcards[index].difficulty}
              key={flashcards[index].id}
              direction={direction}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-4 mt-32">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="w-28 px-4 py-2 font-bold bg-primary-red border-2 border-red-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={index >= flashcards.length - 1}
          className="w-28 px-4 py-2 font-bold bg-primary-red border-2 border-red-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isFetchingNextPage ? "Next" : "Loading..."}
        </button>
      </div>
    </main>
  );
}
