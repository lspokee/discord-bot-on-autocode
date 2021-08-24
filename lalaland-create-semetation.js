// authenticates you with the API standard library
const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });
const masterSet = {
    "how-to": [
        "點先有", "點有", "點拎", "點先拎到", "(幾)(先有)"
    ],
    "mount": [
        "坐騎", "陸行鳥"
    ],
    "join-server": [
        "Ser", "ser", "DC", "dc", "mana", "Mana", "gaia", "Gaia", "elemental", "Elemental", "(日)(ser)", "(日)(Ser)"
    ],
    "server-population": [
        "多人玩", "香港人", "大家", "(你地)(玩)", "優遇"
    ]
}

// Only respond to messages containing the word "hi", "hey", "hello", or "sup"
if (context.params.event.content.match(/\bhi\b|\bhey\b|\bhello\b|\bsup\b/i)) {


    // await lib.discord.channels['@0.0.6'].messages.create({
    //     channel_id: context.params.event.channel_id,
    //     content: messageContent.join('\n'),
    //     message_reference: {
    //       message_id: context.params.event.id
    //     }
    //   });
}
if (context.params.event.content.includes('屌你咁廢既')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://zippy.gfycat.com/EvergreenOrnateInganue.mp4',
    });
}

if (context.params.event.content.includes('妖怪手錶')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://cdn.discordapp.com/attachments/363677618144280589/877105202908499988/574233288059781140.png',
    });
}
// Classify whether an user joined for 90days or not
// if so, answer newible questions
//console.log(context.params);
if (new Date() - new Date(context.params.event.member.joined_at) < 90 * 24 * 3600 * 1000) {
    let contentStr = context.params.event.content;
    if (contentStr.includes('但丁')) {

        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '但丁係光頭仔',
        });
    }
    if (contentStr.includes('i2501')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: 'i2501',
                type: 'rich',
                color: 0xfff77a,
                description: ['若出現 Error:i2501 問題',
                    '簡單講就是Square Enix透過第三方機構保護他們的系統避免受到詐騙的一個機制',
                    '',
                    '此機制會封鎖一切跟進行金錢交易有關的權利',
                    '如：儲值，續約，購買商城物品，註冊遊戲序號......等等',
                    '包含註冊帳號在內，每觸發一次機制就會被封鎖24小時',
                    '會累加上去，過往曾經有人被封鎖高達10天'
                ].join('\n'),
                fields: [{
                    name: '封鎖原因',
                    value: ['▸ 偵測到IP來源不乾淨，通常是針對VPN，浮動式IP',
                        '▸ 偵測到你使用了在他們系統裡被黑名單的插件程式',
                        '▸ 偵測到會直接封鎖該IP位址的金錢相關權利\n'
                    ].join('\n')
                }, {
                    name: '避免方法',
                    value: '▸ 請嘗試使用 固定式IP 或 手機以4G/5G網絡進行操作'
                }, {
                    name: '解決方法',
                    value: ['▸ 使用 固定式IP 或 手機以4G/5G網絡重新申請一個新帳號',
                        '▸ 若已被鎖唯有等時間到解鎖 或 聯絡Square Enix客服'
                    ].join('\n')
                }]
            }
        });
    }
    if (masterSet["how-to"].filter(s => contentStr.match(new RegExp('/' + s + '/g'))) && masterSet["mount"].filter(s => contentStr.match(new RegExp('/' + s + '/g')))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '幾多Lv先有坐騎?',
                type: 'rich',
                color: 0xf90492,
                description: ['1. 完成主線20Lv任務 [英雄の卵]  / [A Hero in the Making]',
                    '2. 完成後各軍團處會有坐騎任 [念願のマイチョコボ] / [My Little Chocobo]',
                    '3. 接完坐騎任後繼續解主線並完成主線任務 [森の意志あらんことを] / [Wood\'s Will Be Done]',
                    '4. 完成任務後可獲得300軍票, 然後於各軍團補給品NPC換取 [チョコボ支給券] / [Chocobo Issuance]'
                ].join('\n'),
                fields: [{
                    name: '英雄の卵',
                    value: 'https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/c90b420ef47/'
                }, {
                    name: '森の意志あらんことを',
                    value: 'https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/ae1f4b2aff5/'
                }]
            }
        });
    }
    if (masterSet["join-server"].filter(s => contentStr.match(new RegExp('/' + s + '/g'))) && masterSet["server-population"].filter(s => contentStr.match(new RegExp('/' + s + '/g')))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: ['```',
                '**咩Ser最多香港人玩? / 大家咩DC??**\n',
                '▸ 本討論區的玩家主要集中於日本區Gaia DC，其中以Ifrit Server最為多人',
                '▸ 新入坑玩家可考慮於Gaia DC創角，方便尋找香港玩家一齊玩 或 尋求支援',
                '▸ 於優遇伺服器創建角色能較快提升職業等級，並可以額外獲得15天遊玩權利',
                '▸ 若要加入遊戲公會，需要人物與公會都屬相同伺服器',
                '```'
            ].join('\n'),
            embed: {
                title: '咩Ser最多香港人玩? / 大家咩DC???',
                type: 'rich',
                color: 0xb055f8,
                description: ['▸ 本討論區的玩家主要集中於日本區Gaia DC，其中以Ifrit Server最為多人',
                    '▸ 新入坑玩家可考慮於Gaia DC創角，方便尋找香港玩家一齊玩 或 尋求支援',
                    '▸ 於優遇伺服器創建角色能較快提升職業等級，並可以額外獲得15天遊玩權利',
                    '▸ 若要加入遊戲公會，需要人物與公會都屬相同伺服器'
                ].join('\n'),
                fields: [{
                    name: 'LLL @ Ifrit',
                    value: 'https://discord.com/channels/363677618144280587/795169174456238111/795170302526881822'
                }]
            }
        });
    }
}