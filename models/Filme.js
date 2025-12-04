import conexao from "../config/conexao.js";

const FilmeSchema = conexao.Schema({
    nome:{type:String, required:true}
    ,Tempo:{type:String, required:true}
    ,Historia:{type:String, required:true}
})
const Filme = conexao.model("Filme", FilmeSchema);
export default Filme