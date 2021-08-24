if ((contentStr.includes('優遇') || contentStr.includes('優越')) && (contentStr.includes('一覽') || contentStr.includes('列表'))) {
    let a = contentStr.toLowerCase().match(/gaia|elemental|mana|aether|primal|crystal|chaos|light/g);
    var dc = a ? a : "gaia";
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
                'selector': 'div.world-list__world_category p',
                'resolver': 'text'
            }, {
                'selector': 'div.world-list__create_character i',
                'resolver': 'attr',
                'attr': 'data-tooltip'
            }]
        }]
    });
    let trimRes = res.queryResults[0][0].mapResults;
    let resultDC = trimRes[0][0].text;
    let resultSerArr = trimRes[1];
    let resultStatArr = trimRes[2];
    let resultAbleArr = trimRes[3];
    let finalResult = [];
    for (let i = 0; i < resultSerArr.length; i++) {
        finalResult.push(resultSerArr[i].text + " - " + resultStatArr[i].text + " - " + resultAbleArr[i].attr.replace(/新規キャラクター作成/g, '') + "以開新角");
    }
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: ``,
        embed: {
            title: '優遇server一覽',
            type: 'rich',
            color: 0xe999b4,
            description: '呼喚時請指明Data Center，若無指明或未成功讀取，則一律當作Gaia',
            fields: [{
                name: `${resultDC}`,
                value: finalResult.join("\n")
            }, {
                name: '官網連結',
                value: 'https://jp.finalfantasyxiv.com/lodestone/worldstatus/'
            }]
        }
    });
}