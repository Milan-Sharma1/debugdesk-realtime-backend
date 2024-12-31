import "dotenv/config";
import { Client, Databases, Users } from "node-appwrite";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_HOST_URL)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const users = new Users(client);
export { databases, users };
