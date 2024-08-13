"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useState } from "react";

const Page = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { question, answer, category, difficulty };
    console.log(formData);

    try {
      const response = await fetch("/api/flashcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex flex-col bg-primary w-screen min-h-screen justify-center items-center gap-8 text-zinc-50 mt-10">
      <div className="flex flex-col justify-center items-center">
        <div className="flex">
          <span className="text-4xl font-bold">Dash</span>
          <span className="text-primary text-4xl font-bold">Board</span>
        </div>
        <div className="font-semibold text-secondary">
          Add And Edit Flashcards!
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        <label className="mb-1 mt-4 text-primary shadow-2xl">Question</label>
        <Textarea
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-primary border-2 border-zinc-400 text-white w-[250px]"
        ></Textarea>
        <label className="mb-1 mt-4 text-primary ">Answer</label>
        <Textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="bg-primary border-2 border-zinc-400 text-white w-[250px]"
        ></Textarea>
        <label className="mb-1 mt-4 text-primary ">Category</label>
        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-primary border-2 border-zinc-400 text-white w-[250px]"
        ></Input>
        <label className="mb-1 mt-4 text-primary ">Difficulty</label>
        <Select onValueChange={(value) => setDifficulty(value)}>
          <SelectTrigger className="bg-primary border-2 border-zinc-400 text-white w-[250px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className="bg-primary border-2 border-zinc-400 text-white">
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary-red border-2 border-red-400 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Page;
