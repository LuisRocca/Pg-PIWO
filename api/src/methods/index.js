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
                    impression: e.impression,
                    aroma: e.aroma,
                    ingredients: e.ingredients,
                    flavor: e.flavor,
                    // IBU: e.stats,
                    // ABV: e.stats.abv ? e.stats.abv : "None ABV",
                    history: e.history,
                })))
                console.log(beersData);
                return beersData;
            })
            .catch(err => console.log(err));
        return beers;
    },

}