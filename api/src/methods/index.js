const {default: axios} = require("axios");
// const Beer = require("../models/Beer");
// const Category = require("../models/Category")
const { styleguide} = require('../../api.json')
const { conn } = require("../db");
const { Beer, Category } = conn.models;

module.exports = {
    showAll: async() => {
        // let {data} = await axios.get(`http://localhost:4000/styleguide`)
           let data = styleguide
        //    console.log(data)
            let beersData = [];
            let beersData2 = [];
            data.class[0].category.forEach(e => beersData2.push(e.subcategory))
            // console.log(beersData2);

            beersData2.forEach(e => e.forEach(e => beersData.push({style:e.style? e. style : "Standard American Beer", 
            beer:{
                name: e.name,
                impression: e.impression ? e.impression : "Dato no proporcionado por el fabricante",
                aroma: e.aroma,
                price: e.price,
                stock: e.stock,
                ingredients: e.ingredients ? e.ingredients : "Dato no proporcionado por el fabricante",
                flavor: e.flavor,
                examples: Array.isArray(e.examples) ? e.examples.join(', ') : "Dato no proporcionado por el fabricante",
                IBU: e.stats?.ibu ? e.stats.ibu.high : "10",
                ABV: e.stats?.abv ? e.stats.abv.high : "5",
                history: e.history ? e.history : "Dato no proporcionado por el fabricante",
                image: e.image? e.image : "https://www.billsbeercans.com/~billsbee/canstore/images/IMG_2947.JPG"
            }})))
            const db = beersData.map(async el => {
                const beer = await Beer.create(el.beer)
                let category =  await Category.findOne({where: {name: el.style}})
                beer.addCategory(category)
            })

    },
    getCategories: async() => {
        try {
            const { data } = await axios.get(`https://raw.githubusercontent.com/gthmb/bjcp-2015-json/master/json/styleguide-2015.json`)
            data.styleguide.class[0].category.map(async c =>{ 
                return Category.create({name: c.name })
            })
            return console.log('listos')
        } catch (error) {
            console.log(error)
        }
    },
    getImgs: async() => {
        try {
            // let {data} = await axios.get(`http://localhost:4000/styleguide`)
            // console.log(data.image)
            let data = styleguide   
            return data.image
        } catch (error) {
            console.log(error)
        }
    }
}



