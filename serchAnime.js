const cheerio = require("cheerio");
const fetch = require("node-fetch");
const surl = "https://animesonline.cc/search/";

function getInfo(anime){
        return fetch(`${surl}${anime}`).then(
            r=>r.text()
            ).then(r=>{
                const animes=[];
                const $=cheerio.load(r);
                $('.animation-2 .item').each((i,e)=>{
                    const anime = $(e);
                    const animeInfo ={
                        url: anime.find('.poster a').attr('href'),
                        poster: anime.find('.poster a img').attr('src'),
                        title: anime.find('.data h3').text().trim(),
                        nota: anime.find('.poster .rating').text().trim() || "N/A"
                    }
                    animes.push(animeInfo);
                })
                return animes;
            })
    }
function getVideo(epUrl){
    return fetch(`${epUrl}`).then(
        r=>r.text()
        ).then(body=>{
            const $=cheerio.load(body);
            const player =$('.player_sist iframe').attr('src')
            return player;
        })
}
function getAnime(animeurl){
    return fetch(`${animeurl}`).then(
        r=>r.text()
        ).then(body=>{
            const $ = cheerio.load(body);
            const tempo=[]
            $('.se-c').each((i,e)=>{
                const eps=[];
                console.log("temp")
                $('.se-a .episodios li').each((i,e)=>{
                    const ep=$(e);
                    const link=ep.find('.episodiotitle a').attr('href')
                    const epInfo={
                        num: ep.find('.episodiotitle a').text(),
                        img:ep.find('.imagen a img').attr('src'),
                        link: link
                    }
                    eps.push(epInfo)
                })
                tempo.push(eps);
            })
            return tempo
        })
}

module.exports = {
    getInfo,
    getAnime,
    getVideo
}