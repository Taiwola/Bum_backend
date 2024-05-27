import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.model";
dotenv.config(); // Load environment variables from a .env file

export const connectionSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST , // Provide a default value if environment variable is missing
  username: process.env.DB_USER ,
  port: parseInt(process.env.DB_PORT), // Ensure the port is parsed as an integer
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  synchronize: true, // In development, you can set this to false
  logging: false,
  entities: [User],
  migrations: [], // Configure migrations if needed
  subscribers: [], // Configure subscribers if needed
  migrationsTableName: "custom_migration_table",
});

export async function connect () {
    try {
        await connectionSource.initialize();
        console.log("Connected to the database.");
      } catch (error) {
        console.error("Database connection error:", error);
      }
}