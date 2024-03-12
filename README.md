## pay.reporte.me

This is a study project 

Improving the application of concepts related to Drizzle ORM. The project, called [pay.reporte.me](http://pay.reporte.me/), is a simple payment list application.

**Used Technologies**

- Next.js: A React framework for building web applications.
- TypeScript: A programming language that adds static typing to JavaScript.
- NeoDatabase: A library for connection with Neo4j databases.
Drizzle ConfigurationThe Drizzle configuration file is located at ./src/db/schema.ts. It defines the database schema and other important settings. Here is an excerpt from this file:

**Database Schema**

The database schema includes a table called payment. Here are the fields of this table:

- id: Primary key of integer type.
- due_date: Due date of the task.
- title: Title of the task.
- note: Additional notes about the task.
- done: Indicates whether the task has been completed (boolean).

```tsx
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const payment = pgTable("payment", {
	id: integer("id").primaryKey(),
	due_date: timestamp('due_date', { precision: 6, withTimezone: true }),
	title: text("title").notNull(),
	note: text("note").notNull(),
	done: boolean("done").default(false).notNull(),
});
```

```tsx
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.NEON_DATABASE_URL!);

export const db = drizzle(sql);
```

Tags- neon database

- Drizzle ORM
- Next.js
- React
- TypeScript