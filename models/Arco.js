import conexao from "../config/conexao.js";

const ArcoSchema = conexao.Schema({
    nome:{type:String, required:true},
    Tempo:{type:String, required:true},
    historia:{type:String, required:true}
})
const Arco = conexao.model("Arco", ArcoSchema);
export default Arco