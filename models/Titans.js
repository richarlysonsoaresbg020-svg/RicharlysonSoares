import conexao from "../config/conexao.js";

const TitansSchema = conexao.Schema({
    nome:{type:String, required:true},
    habilidade:{type:String,required:true},
    portador:{type:String,required:true},
    foto:{type:Buffer,
        get:(valor)=>{
            if(!valor) return null;
                return `data:image/png;base64,${valor.toString('base64')}`;
            }
    }
})
const Titans = conexao.model("Titans", TitansSchema);
export default Titans