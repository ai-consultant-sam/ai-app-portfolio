import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  position: text("position"),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  contactName: text("contact_name").notNull(),
  industry: text("industry").notNull(),
  department: text("department"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailGenerations = pgTable("email_generations", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  customerCompany: text("customer_company").notNull(),
  customerName: text("customer_name").notNull(),
  purpose: text("purpose").notNull(),
  tone: text("tone").notNull(),
  length: integer("length").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export const insertEmailGenerationSchema = createInsertSchema(emailGenerations).omit({
  id: true,
  createdAt: true,
});

// Email generation request schema
export const emailGenerationRequestSchema = z.object({
  userProfile: insertUserProfileSchema,
  customer: insertCustomerSchema,
  purpose: z.enum(['initial', 'followup', 'proposal', 'meeting']),
  tone: z.enum(['formal', 'friendly', 'casual']),
  length: z.number().min(150).max(500),
});

// Types
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type EmailGeneration = typeof emailGenerations.$inferSelect;
export type InsertEmailGeneration = z.infer<typeof insertEmailGenerationSchema>;
export type EmailGenerationRequest = z.infer<typeof emailGenerationRequestSchema>;
