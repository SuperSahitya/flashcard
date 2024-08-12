import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `fc_${name}`);

export const flashcardSchema = createTable("flashcard", {
  id: serial("serial").primaryKey().notNull().unique(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 30 }),
  difficulty: varchar("difficulty", {
    enum: ["easy", "medium", "hard"],
  }).default("easy"),
  createdAt: timestamp("createdAt").defaultNow(),
});
