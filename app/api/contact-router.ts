import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contacts } from "@db/schema";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "El nombre es obligatorio"),
        email: z.string().email("Email inválido"),
        phone: z.string().optional(),
        message: z.string().min(1, "El mensaje es obligatorio"),
        plan: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        message: input.message,
        plan: input.plan || null,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }),
});
