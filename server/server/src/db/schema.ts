import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  numeric,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// User roles
export const userRole = pgEnum('user_role', ['admin', 'staff', 'customer']);
export const queuePriority = pgEnum('queue_priority', [
  'vip',
  'staff',
  'normal',
]);

// Users
export const Users = pgTable('users', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  supabaseId: varchar('supabase_id', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  phone: integer('phone').notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  role: userRole('role').default('customer').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Kiosks
export const Kiosks = pgTable('kiosks', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 150 }).notNull(),
  location: varchar('location', { length: 200 }).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Queues
export const Queues = pgTable('queues', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 150 }).notNull(),
  location: varchar('location', { length: 200 }),
  createdBy: uuid('created_by').references(() => Users.id),
  kioskId: uuid('kiosk_id').references(() => Kiosks.id),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Queue Entries
export const QueueEntries = pgTable('queue_entries', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  queueId: uuid('queue_id')
    .references(() => Queues.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => Users.id)
    .notNull(),
  priority: queuePriority('priority').default('normal').notNull(),
  status: varchar('status', { length: 20 }).default('waiting'),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  servedAt: timestamp('served_at'),
});

// Feedback
export const Feedback = pgTable('feedback', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  userId: uuid('user_id')
    .references(() => Users.id)
    .notNull(),
  queueId: uuid('queue_id')
    .references(() => Queues.id)
    .notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notifications
export const Notifications = pgTable('notifications', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  userId: uuid('user_id').references(() => Users.id),
  type: varchar('type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  sentAt: timestamp('sent_at').defaultNow(),
});

// Services
export const Services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: varchar('price', { length: 50 }), // could be string/decimal
  active: boolean('active').default(true).notNull(),
  kioskId: uuid('kiosk_id')
    .references(() => Kiosks.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payments
export const Payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .references(() => Users.id)
    .notNull(),
  serviceId: uuid('service_id')
    .references(() => Services.id)
    .notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  provider: varchar('provider', { length: 50 }),
  reference: varchar('reference', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
