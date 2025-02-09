// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `petphotos_${name}`);

// Posts table 
export const posts = createTable(
  "posts",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userID: varchar("userID", {length: 1024}),
    userName: varchar("userName", {length: 1024}),
    userImg: varchar("userImg", {length: 1024}),
    content: varchar("content", { length: 2048 }),
    imgURL: varchar("imgURL", {length: 1024}).notNull(),
    status: varchar("status", {length: 64}).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.content),
  })
);

// // Comments table
// export const comments = createTable(
//   "comments",
//   {
//     id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
//     postID: integer("postID").notNull().references(() => posts.id),
//     userID: varchar("userID", { length: 1024 }),
//     commentText: varchar("comment_text", { length: 1024 }).notNull(),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//   },
//   (example) => ({
//     postIndex: index("post_idx").on(example.postID),
//   })
// );

// // follow table
// export const follow = createTable(
//   "follow",
//   {
//     id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
//     followerID: varchar("follower_id", { length: 1024 }).notNull(), // ID of the user who follows
//     followingID: varchar("following_id", { length: 1024 }).notNull(), // ID of the user being followed
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//   },
//   (example) => ({
//     followIndex: index("follow_idx").on(example.followerID, example.followingID),
//   })
// );