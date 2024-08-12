"use client";
import Flashcard from "@/components/Flashcard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

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
    <main className="flex flex-col bg-primary w-screen min-h-screen justify-center items-center gap-8">
      <div>
        <span className="text-4xl font-bold">Flash</span>
        <span className="text-primary text-4xl font-bold">Cards</span>
      </div>
      <div className="relative w-2 h-2 mt-44">
        <AnimatePresence initial={false} custom={direction}>
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
      <div className="flex gap-4 mt-28">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="px-4 py-2 bg-primary-red border-2 border-red-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={index >= flashcards.length - 1}
          className="px-4 py-2 bg-primary-red border-2 border-red-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </main>
  );
}
