import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
  doshaType: text("dosha_type"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  category: text("category").notNull(), // face, hair, body, wellness, combo
  doshaType: text("dosha_type"), // vata, pitta, kapha, tri-dosha
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").default(true),
  isBestseller: boolean("is_bestseller").default(false),
  isNew: boolean("is_new").default(false),
  rating: real("rating").default(5),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

// Cart Item schema
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

// Practitioner schema
export const practitioners = pgTable("practitioners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: real("price").notNull(),
  duration: integer("duration").notNull(),
});

export const insertPractitionerSchema = createInsertSchema(practitioners).omit({
  id: true,
});

// Dosha Quiz Question schema
export const doshaQuizQuestions = pgTable("dosha_quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  vataOption: text("vata_option").notNull(),
  pittaOption: text("pitta_option").notNull(),
  kaphaOption: text("kapha_option").notNull(),
});

export const insertDoshaQuizQuestionSchema = createInsertSchema(doshaQuizQuestions).omit({
  id: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Practitioner = typeof practitioners.$inferSelect;
export type InsertPractitioner = z.infer<typeof insertPractitionerSchema>;

export type DoshaQuizQuestion = typeof doshaQuizQuestions.$inferSelect;
export type InsertDoshaQuizQuestion = z.infer<typeof insertDoshaQuizQuestionSchema>;
