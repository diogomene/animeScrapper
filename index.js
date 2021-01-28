const express = require('express');
const app = express();
const scraper = require('./serchAnime')
const cors=require('cors')
const port = process.env.PORT || 3000;

app.use(cors())
app.get('/', (req,res)=>{
    res.json({msg:'bacana'})
})
app.get('/search/:title',(req,res)=>{
    scraper
        .getInfo(req.params.title)
        .then(animes=>{
            res.json(animes)
        }
        )
})

app.get('/anime',(req,res)=>{
    if(!req.query.url){
        res.json({msg:"a url não foi passada"})
        return
    }
    scraper
        .getAnime(req.query.url)
        .then(anime=>{
            res.json(anime)
        }
        )
})
app.get('/watch',(req,res)=>{
    if(!req.query.url){
        res.json({msg:"a url não foi passada"})
        return
    }
    scraper
        .getVideo(req.query.url)
        .then(anime=>{
            res.json(anime)
        }
        )
})

app.listen(port, ()=>{
    console.log("Funcionando em:"+port);
})