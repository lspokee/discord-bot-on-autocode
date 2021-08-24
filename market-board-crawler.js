// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });
let dc = 'gaia'
let dcArr = {
    "elemental": { "region": 1, "subRegion": 1 },
    "gaia": { "region": 1, "subRegion": 2 },
    "mana": { "region": 1, "subRegion": 3 },
    "aether": { "region": 2, "subRegion": 1 },
    "primal": { "region": 2, "subRegion": 2 },
    "crystal": { "region": 2, "subRegion": 3 },
    "chaos": { "region": 3, "subRegion": 1 },
    "light": { "region": 3, "subRegion": 2 }
}
let region = dcArr[dc] ? dcArr[dc].region : 1;
let subRegion = dcArr[dc] ? dcArr[dc].subRegion : 2;
let res = await lib.crawler.query['@0.0.1'].selectors({
    url: `https://jp.finalfantasyxiv.com/lodestone/worldstatus/`,
    userAgent: `stdlib/crawler/query`,
    includeMetadata: false,
    selectorQueries: [{
        'selector': `.js--tab-content[data-region=${region}] .world-dcgroup .world-dcgroup__item:nth-child(${subRegion})`,
        'resolver': `map`,
        'mapQueries': [{
            'selector': '.world-dcgroup__header',
            'resolver': 'text'
        }, {
            'selector': 'div.world-list__world_name p',
            'resolver': 'text'
        }, {
            'selector': 'div.world-list__create_character i',
            'resolver': 'attr',
            'attr': 'data-tooltip'
        }]
    }]
});
let trimRes = res.queryResults[0][0].mapResults;
let resultDC = trimRes[0].text;
let resultSerArr = trimRes[1];
let resultStatArr = trimRes[2];
let finalResult = [];
for (let i = 0; i < resultSerArr.length; i++) {
    finalResult.push(resultSerArr[i].text + " - " + resultStatArr[i].attr);
}

return finalResult.join("\n");
// return lib.crawler.query['@0.0.1'].selectors({
// url: `https://jp.finalfantasyxiv.com/lodestone/worldstatus/`,
// userAgent: `stdlib/crawler/query`,
// includeMetadata: false,
// selectorQueries: [{
// 'selector': `.world-list__world_name p`,
// 'resolver': `text`
// }]
// });