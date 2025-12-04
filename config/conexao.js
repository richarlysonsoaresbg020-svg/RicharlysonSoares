import mongoose from "mongoose";
const url = 
"mongodb+srv://Richarlyson:123@richarlyson.x3irh7n.mongodb.net/?retryWrites=true&w=majority&appName=Richarlyson";
const conexao = await mongoose.connect(url)
export default conexao