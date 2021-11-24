const {default: axios} = require("axios");

module.exports = {
    showAll: () => {
        let beers = axios.get(`https://raw.githubusercontent.com/gthmb/bjcp-2015-json/master/json/styleguide-2015.json`)
            .then(r => r.data)
            .then(results => {
                let beersData = [];
                let beersData2 = [];
                results.styleguide.class[0].category.forEach(e => beersData2.push(e.subcategory))
                // console.log(beersData2);
                beersData2.forEach(e => e.forEach(e => beersData.push({
                    ID: e.id,
                    name: e.name,
                    impression: e.impression ? e.impression : "AQUI VOY A HARDCODEAR UNA IMPRESSION RANDOM",
                    aroma: e.aroma,
                    ingredients: e.ingredients ? e.ingredients : "AQUI VOY A HARDCODEAR INGREDIENTES RANDOM",
                    flavor: e.flavor,
                    IBU: e.stats?.ibu ? e.stats.ibu.high : "AQUI VOY A HARDCODEAR UN VALOR RANDOM ",
                    ABV: e.stats?.abv ? e.stats.abv.high : "AQUI VOY A HARDCODEAR UN VALOR RANDOM",
                    history: e.history ? e.history : "AQUI VOY A HARDCODEAR UNA HISTORY RANDOM",
                })))
                console.log(beersData);
                return beersData;
            })
            .catch(err => console.log(err));
        return beers;
    },
    getCategories: async() => {
        const { data } = await axios.get(`https://raw.githubusercontent.com/gthmb/bjcp-2015-json/master/json/styleguide-2015.json`)
        let categories = data.styleguide.class[0].category.map(c =>{ 
            return{ 
            id: c.id, 
            name: c.name
        }
    })
    return categories
    },
}