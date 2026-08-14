import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient> | null = null;

/* Singleton client, cached across dev hot-reloads via globalThis. */
export function getMongo(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  const g = globalThis as typeof globalThis & {
    _mongoPromise?: Promise<MongoClient>;
  };
  if (!g._mongoPromise) {
    g._mongoPromise = new MongoClient(uri).connect();
  }
  clientPromise = g._mongoPromise;
  return clientPromise;
}

export const DB_NAME = process.env.MONGODB_DB ?? "joshvantage";
