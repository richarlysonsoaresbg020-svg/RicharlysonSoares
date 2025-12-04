import conexao from "../config/conexao.js";

const PersonagemSchema = conexao.Schema({
    nome:{type:String, required:true},
    tipo:{type:String, required:true},
    primeiraaparicao:{type:Number, required:true},
    forca:{type:Number, required:true},
    foto:{type:Buffer,
        get:(valor)=>{
            if(!valor) return null;
                return `data:image/png;base64,${valor.toString('base64')}`;
            }
    }
}, { toObject: { getters: true }, toJSON: { getters: true } })
const Personagem = conexao.model("Personagem", PersonagemSchema);
export default Personagem