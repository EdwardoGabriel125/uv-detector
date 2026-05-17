import express from "express";
import axios from "axios";
import ejs from "ejs";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.UVKEY;
const porta = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/" , (req, res) => {
    res.render("index.ejs");
})

app.get("/post", (req,res) => {
    res.redirect("/");
})

app.post("/protetor" , async (req, res) => {
    try{
        const data = {
            headers : {
                "x-access-token" : key,
            },
            params : {
                lat : req.body.lat,
                lng : req.body.lng
            }
        }
        const response = await axios.get("https://api.openuv.io/api/v1/uv", data);
        const result = response.data;
        const uv = response.data.result.uv;


        let texto = "";

        if(uv < 3){
            texto = "O seu nível é baixo, não precisa passar";
        }
        else if( uv < 6){
            texto = "Nível moderado, é recomendado passar a depender do tom de pele";
        }
        else if(uv < 8){
            texto = "Alto, use protetor solar!";
        }
        else if(uv < 11){
            texto = "Muito alto, use protetor solar!";
        }
        else if(uv > 11){
            texto = "Extremamente alto! Use protetor solar para cuidar da sua pele!";
        }

        res.render("protetor.ejs", {texto : texto, uv : uv});

    }
    catch(error){
        if(error.response){
            console.log(`Erro da API: ${error.response.data} , ${error.response.log}`);
        }
        else{
            console.log("Erro: " + error.message);
        }
    }
})

app.listen(porta, () => console.log(`Servidor rodando em {porta}`));
