import { connect } from "@tursodatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const db = connect({ url: process.env.TURSO_DATABASE_URL, authToken:process.env.TURSO_AUTH_TOKEN}) ;


export default db ;