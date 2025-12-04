import express from 'express'
const app = express();
//Importar os modelos 
import Arco from './models/Arco.js';
import Personagem from './models/Personagem.js';
import Titans from './models/Titans.js';
import Filme from './models/Filme.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

//Confiram se tem essa linha aqui também
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname} from 'path';


// Converte o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

//rotas


app.get('/', (req, res) => {
    res.render("index")
})

app.get('/personagem/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const personagens = await Personagem.find()
    res.render("personagem/lst", {personagens:personagens})
})
app.post('/personagem/lst', async (req, res) => {
  const pesquisa = (req.body.pesquisa || '').toString().trim()

  const regex = { $regex: pesquisa, $options: 'i' }

  const personagens = await Personagem.find({
    $or: [
      { nome: regex },
      { tipo: regex }
    ]
  })

  res.render('personagem/lst', { personagens })
})
app.post('/personagem/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    const dados = {
        nome: req.body.nome,
        tipo: req.body.tipo,
        primeiraaparicao: req.body.primeiraaparicao,
        forca: req.body.forca
    }
        if(req.file) {
        dados.foto = req.file.buffer
        dados.fotoType = req.file.mimetype
    }
    await Personagem.create(dados)
    res.render("personagem/addok" )
})

app.get('/personagem/add', (req, res) => {
    res.render("personagem/add")
})

app.get('/personagem/del/:id', async (req, res) => {
  await Personagem.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/personagem/lst');
});

//Edição
app.get('/personagem/edt/:id', async (req, res) => {

const personagem = await Personagem.findById(req.params.id)

res.render("personagem/edt", {personagem})

})

app.post('/personagem/edt/:id', async (req, res) => {

const personagens = await Personagem.findByIdAndUpdate(req.params.id, req.body)

res.render("personagem/edtok")

})
app.post('/personagem/add/ok',upload.single('foto'), async (req, res) => {
   
    //grava no banco
    //await Marca.create(req.body)
    /*como agora tem um campo "fora do padrão" tem q fazer o create campo a campo*/

    await Personagem.create({
        nome:req.body.nome,
        tipo:req.body.tipo,
        primeiraaparicao:req.body.primeiraaparicao,
        forca:req.body.forca,
        foto:req.file.buffer
    })
    res.render("personagem/add/ok" )
})

  //ARCOS


app.get('/arco/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const arcos = await Arco.find()
    res.render("arco/lst", {arcos:arcos})
})

app.post('/arco/lst', async (req, res) => {
    //pesquisar
    const pesquisa = req.body.pesquisa
    const arcos = await Arco.find({ nome: { $regex: pesquisa, $options: 'i' } })
    res.render("arco/lst", { arcos: arcos })
})

app.post('/arco/add/ok', async (req, res) => {
    //grava no banco
    await Arco.create(req.body)
    res.render("arco/addok" )
})

app.get('/arco/add', (req, res) => {
    res.render("arco/add")
})
app.get('/arco/del/:id', async (req, res) => {
  await Arco.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/arco/lst');
});

app.get('/arco/edt/:id', async (req, res) => {

const arco = await Arco.findById(req.params.id)

res.render("arco/edt", {arco})

})

app.post('/arco/edt/:id', async (req, res) => {

const arcos = await Arco.findByIdAndUpdate(req.params.id, req.body)

res.render("arco/edtok")

})


 //TITANS


app.get('/titam/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const titans = await Titans.find()
    res.render("titam/lst", {titans: titans})
})

app.post('/titam/lst', async (req, res) => {
    //pesquisar
    const pesquisa = req.body.pesquisa
    const titans = await Titans.find({ nome: { $regex: pesquisa, $options: 'i' } })
    res.render("titam/lst", { titans: titans })
})

app.post('/titam/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    const dados = {
        nome: req.body.nome,
        habilidade: req.body.habilidade,
        portador: req.body.portador
    }
    if(req.file) {
        dados.foto = req.file.buffer
    }
    await Titans.create(dados)
    res.render("titam/addok" )
})

app.get('/titam/add', (req, res) => {
    res.render("titam/add")
})
app.get('/titam/del/:id', async (req, res) => {
  await Titans.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/titam/lst');
});


app.get('/titam/edt/:id', async (req, res) => {

const titam = await Titans.findById(req.params.id)

res.render("titam/edt", {titam})

})

app.post('/titam/edt/:id', async (req, res) => {

const titans = await Titans.findByIdAndUpdate(req.params.id, req.body)

res.render("titam/edtok")

})

app.post('/titam/add/ok',upload.single('foto'), async (req, res) => {
   
    //grava no banco
    //await Marca.create(req.body)
    /*como agora tem um campo "fora do padrão" tem q fazer o create campo a campo*/

    await Titans.create({
        nome:req.body.nome,
        habilidade:req.body.habilidade,
        portador:req.body.portador,
        foto:req.file.buffer
    })
    res.render("titam/add/ok" )
})


//FILMES


app.get('/filme/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const filmes = await Filme.find()
    res.render("filme/lst", {filmes: filmes})
})

app.post('/filme/lst', async (req, res) => {
    //pesquisar
    const pesquisa = req.body.pesquisa
    const filmes = await Filme.find({ nome: { $regex: pesquisa, $options: 'i' } })
    res.render("filme/lst", { filmes: filmes })
})

app.post('/filme/add/ok', async (req, res) => {
    //grava no banco
    await Filme.create(req.body)
    res.render("filme/addok" )
})

app.get('/filme/add', (req, res) => {
    res.render("filme/add")
})
app.get('/filme/del/:id', async (req, res) => {
  await Filme.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/filme/lst');
});

app.get('/filme/edt/:id', async (req, res) => {

const filme = await Filme.findById(req.params.id)

res.render("filme/edt", {filme})

})

app.post('/filme/edt/:id', async (req, res) => {

const filmes = await Filme.findByIdAndUpdate(req.params.id, req.body)

res.render("filme/edtok")

})

//++++++++++++ site ++++++++++

app.get('/site', async (req, res) => {
    const personagens= await Personagem.find()
    const titans = await Titans.find()
    const arcos = await Arco.find()
    const filmes  = await Filme.find()
    res.render("site/index", {personagens,titans,arcos,filmes})
})
app.listen(3001)
console.log("Servidor rodando em http://localhost:3001")