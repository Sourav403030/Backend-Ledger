import "dotenv/config";
import { app } from "./app";
import connectToDb from "./config/db";

connectToDb();

// Start server
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on Port ${process.env.PORT}`);
})