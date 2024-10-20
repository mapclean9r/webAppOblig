import DataBase from "better-sqlite3"
import { env } from "../../lib/env"

export const db = new DataBase(env.DATABASE_URL)
export type DB = typeof db

export default db