// authenticates you with the API standard library
const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

if (context.params.event.channel_id !== '877153308534525953') {
    return;
}
let contentStr = context.params.event.content;
if (context.params.event.channel_id == '833690031695986758' || context.params.event.channel_id == '877153308534525953') {
    // kitchen special
    if (contentStr.includes('食乜好') || contentStr.includes('食咩好') || contentStr.includes('eat what')) {
        var whereClause = [{}];
        if (contentStr.includes('正常')) {
            whereClause = [{
                'Type__is': `食得`
            }];
        }
        if (contentStr.includes('開放')) {
            whereClause = [{
                'Type__not': `食得`
            }];
        }
        let result = await lib.googlesheets.query['@0.3.0'].select({
            range: `A1:C999`,
            bounds: 'FIRST_EMPTY_ROW',
            where: whereClause,
            limit: {
                'count': 0,
                'offset': 0
            }
        });
        let resArr = result.rows;
        let random = Math.floor(Math.random() * resArr.length);
        var item = resArr[random].fields.Item;
        if (contentStr.includes('debug_mode')) {
            var pointer = contentStr.split(' ')[2];
            if (pointer) {
                if (pointer === "latest") {
                    item = resArr[resArr.length - 1].fields.Item;
                } else {
                    item = resArr[parseInt(pointer) - 2].fields.Item;
                }
            }
        }
        if (item == "落街轉左第x間（x=日期個位+十位）") {
            let today = new Date().getDate();
            let x = today > 10 ? (today % 10 + Math.floor(today / 10)) : today;
            return lib.discord.channels['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: `<@!${context.params.event.author.id}> 你就食 落街轉左第${x}間 [抽中左 ${item}] 啦！`
            });
        }
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 你就食 ${item} 啦！`
        });
    }
    if (contentStr.startsWith(',addfood')) {
        let item = contentStr.replace(",addfood", "").trimStart();
        let result = await lib.googlesheets.query['@0.3.0'].insert({
            range: `A1:A999`,
            fieldsets: [{
                'Item': `${item}`
            }]
        });
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}>  已經加左 ${item} 入廚房menu！`
        });
    }
    if (contentStr === ',shit') {
        let random = Math.floor(Math.random() * 1000);
        let reply = await lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `shit！<@!${context.params.event.author.id}> 屙出了${random}米:shit:！`
        });
        return lib.googlesheets.query['@0.3.0'].insert({
            spreadsheetId: `1XynNpWDmNoGGZh46ScLrdPnshHauR7Ngx81CDexRPr4`,
            range: `A:E`,
            fieldsets: [{
                distance: `${random}`,
                user_id: `${context.params.event.author.id}`,
                username: `${context.params.event.member.nick}`,
                channel_id: `${context.params.event.channel_id}`,
                timestamp: new Date().toISOString()
            }]
        });
    }
    if (contentStr === ',shit the fuck up') {
        if (context.params.event.author.id == '328509372076392448') {
            let random = Math.floor(Math.random() * 5000000);
            return lib.discord.channels['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: `shit！<@!${context.params.event.author.id}> 屙出了${random}米:shit:！`
            });
        }
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<:f_laladunno:739438957896663080>`
        });
    }
    if (contentStr === ',shit-ranking') {
        let command = contentStr.replace(",shit-ranking", "").trimStart();
        let result = await lib.googlesheets.query['@0.3.0'].select({
            spreadsheetId: `1XynNpWDmNoGGZh46ScLrdPnshHauR7Ngx81CDexRPr4`,
            range: `A:E`,
            bounds: 'FIRST_EMPTY_ROW',
            where: [{
                'timestamp__date_gt': new Date().toLocaleDateString() + ' 00:00:00+08:00'
            }],
            limit: {
                'count': 10,
                'offset': 0
            }
        });
        let reply = await lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `shit！<@!${context.params.event.author.id}> 屙出了${random}米:shit:！`
        });
        return lib.googlesheets.query['@0.3.0'].insert({
            spreadsheetId: `1XynNpWDmNoGGZh46ScLrdPnshHauR7Ngx81CDexRPr4`,
            range: `A:C`,
            fieldsets: [{
                distance: `${random}`,
                user_id: `${context.params.event.author.id}`,
                timestamp: new Date().toISOString()
            }]
        });
    }
    if (contentStr.includes('但丁')) {
        if (contentStr.includes('光頭')) {
            return lib.discord.channels['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: 'https://media.discordapp.net/attachments/363677618144280589/738081585366171738/image0.png?width=225&height=300'
            });
        }
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '但丁係光頭仔'
        });
    }
    if (contentStr.includes('歡迎')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://na.cx/i/ToDEWAq.gif'
        });
    }

    if (contentStr.includes('薯巨')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877109885215576076/877838247739412490/VP_IXV_1_30300331.png'
        });
    }
}
if (contentStr === ',help') {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: '',
        embed: {
            title: '金蛙Bot救命合集',
            type: 'rich',
            color: 0xffd700,
            description: ['為左照顧進入discord頭90日的新手',
                '本bot會積極搭嗲回答各種常見問題',
                '對於想協助解答既老手 請參考以下command召喚我'
            ].join('\n'),
            fields: [{
                name: '非新人之召喚checklist',
                value: ['試玩限制  i2501  版本差異  PS版購買懶人包  ',
                    'steam開ac懶人包  steam購買懶人包  下載創角懶人包',
                    '改制教學  hud教學  排唔到副本  點拎坐騎  點樣飛  幻想藥',
                    '新手副本機制  幻化教學  軍團差異  手掣教學',
                    '咩ser多人玩  轉職前置  漢化教學  生產裝換領'
                ].join('\n')
            }, {
                name: '人人平等功能checklist',
                value: [',dice  ,fashion  抽職  抽ser  抽種族  優遇server一覽',
                    '主線任務數量  升lv方法  基本禮儀   新手必改設定',
                    'Ifrit之臭雞  但丁光頭  妖怪手錶  想唔想我玩姐  dllmi2501',
                    '蟹柳好偉大  big fat taco  lahee  幾時打牌',
                    '練生產.gif 新生祭.gif  Lawson討伐戰  活動.gif'
                ].join('\n')
            }]
        }
    });
}
if (contentStr === ',dice') {
    let random = Math.floor(Math.random() * 1000);
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `ダイス！ <@!${context.params.event.author.id}>  は、:game_die:${random}を出した！`
    });
}
if (contentStr === ',fashion') {
    let result = await lib.twitter.tweets['@1.1.1'].search.tweets.list({
        q: `KaiyokoStar#ffxiv#ファッションチェック`
    });
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `${result.statuses[0].entities.media[0].expanded_url}`
    });
}
if (contentStr === '幾時打牌') {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: '',
        embed: {
            title: '',
            type: 'rich',
            color: 0xffdf00,
            description: '',
            fields: [{
                name: 'NOW!',
                value: '[#按此進入升空現場](https://discord.com/channels/363677618144280587/727929955731767366)'
            }]
        }
    });
}
if (contentStr.includes('屌你咁廢既')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://zippy.gfycat.com/EvergreenOrnateInganue.mp4'
    });
}
if ((contentStr.toLowerCase().includes('reg') || contentStr.includes('主席') || contentStr.toLowerCase().includes('ifrit')) && contentStr.includes('臭雞')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://cdn.discordapp.com/attachments/877130233294258209/877211255679631370/image0.png'
    });
}
if (contentStr === '但丁光頭') {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://media.discordapp.net/attachments/363677618144280589/738081585366171738/image0.png?width=225&height=300'
    });
}
if (contentStr.toLowerCase().includes('ser') && contentStr.toLowerCase().includes('trump')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://cdn.discordapp.com/attachments/704017265544265749/877493818369396736/DonaldDraws1629281207090.gif'
    });
}
if (contentStr.toLowerCase().includes('想唔想') && contentStr.toLowerCase().includes('玩')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://media.discordapp.net/attachments/704017265544265749/877620521053872228/tenor.gif'
    });
}
if (contentStr.toLowerCase().includes('dllm') && contentStr.toLowerCase().includes('i2501')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://media.discordapp.net/attachments/704017265544265749/877880181786832926/tenor_1.gif'
    });
}
if (contentStr.includes('客家人')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://media.discordapp.net/attachments/877130233294258209/879544369114402846/image0.jpg'
    });
}
if (contentStr.includes('抽') && contentStr.toLowerCase().includes('ser')) {
    let random = Math.floor(Math.random() * 11);
    let gaia_arr = ["Alexander", "Bahamut", "Durandal", "Fenrir", "Ifrit", "Ridill", "Tiamat", "Ultima", "Valefor", "Yojimbo", "Zeromus"];
    let item = gaia_arr[random];
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `<@!${context.params.event.author.id}> 求其幫你Gaia入面抽一個server比你: Gaia -> ${item}`
    });
}

if (contentStr.includes('抽') && contentStr.includes('種族')) {
    let race = ["Lalafell 拉拉肥", "Hyuran 人類", "Elezen 精靈", "Lalafell 拉拉菲爾", "Lalafell 拉拉肥是食物", "Lalafell 拉拉肥", "Miqo'te 貓魅", "Roegadyn 魯加", "Au Ra 敖龍", "Hrothgar 獅子", "Viera 維埃拉(兔女郎)"];
    let random = Math.floor(Math.random() * race.length);
    let item = race[random];
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `<@!${context.params.event.author.id}> 求其幫你抽一個種族啦(今期有拉拉肥UP): ${item}`
    });
}

if (contentStr.includes('抽') && contentStr.includes('職')) {
    let random = Math.random();
    let icon_match = {
        "Paladin": {
            icon: "<:x_pld:482174244998873097>",
            name: "Paladin 聖騎"
        },
        "Warrior": {
            icon: "<:x_war:482174244780900387>",
            name: "Warrior 戰士"
        },
        "Dark Knight": {
            icon: "<:x_drk:482174244923637760>",
            name: "Dark Knight 暗騎"
        },
        "Gunbreaker": {
            icon: "<:x_gnb:664395081448685569>",
            name: "Gunbreaker 絕槍戰士"
        },
        "White Mage": {
            icon: "<:w_whm:482174244856528899>",
            name: "White Mage 白魔"
        },
        "Scholar": {
            icon: "<:w_sch:482174244600676373>",
            name: "Scholar 學者"
        },
        "Astrologian": {
            icon: "<:w_ast:482174244990746674>",
            name: "Astrologian 占星"
        },
        "Monk": {
            icon: "<:v_mnk:482174244982358056>",
            name: "Monk 武僧"
        },
        "Dragoon": {
            icon: "<:v_drg:482174244910923819>",
            name: "Dragoon 龍騎"
        },
        "Ninja": {
            icon: "<:v_nin:482174244600676355>",
            name: "Ninja 忍者"
        },
        "Samurai": {
            icon: "<:v_sam:482174244722180117>",
            name: "Samurai 武士"
        },
        "Bard": {
            icon: "<:v_brd:482174245087084554>",
            name: "Bard 詩人"
        },
        "Machinist": {
            icon: "<:v_mch:482174245036752896>",
            name: "Machinist 機工"
        },
        "Dancer": {
            icon: "<:v_dnc:664395097399492608>",
            name: "Dancer 舞者"
        },
        "Black Mage": {
            icon: "<:v_blm:482174245028233216>",
            name: "Black Mage 黑魔"
        },
        "Summoner": {
            icon: "<:v_smn:482174244701339654>",
            name: "Summoner 召喚"
        },
        "Red Mage": {
            icon: "<:v_rdm:482174244596350978>",
            name: "Red Mage 赤魔"
        },
    };
    let tank_arr = ["Paladin", "Warrior", "Dark Knight", "Gunbreaker"];
    let healer_arr = ["White Mage", "Scholar", "Astrologian"];
    let melee_arr = ["Monk", "Dragoon", "Ninja", "Samurai"];
    let range_arr = ["Bard", "Machinist", "Dancer"];
    let magic_arr = ["Black Mage", "Summoner", "Red Mage"];
    let dps_arr = melee_arr.concat(range_arr).concat(magic_arr);
    let full_list = tank_arr.concat(healer_arr).concat(dps_arr);
    if (contentStr.includes('坦') || contentStr.toLowerCase().includes('tank')) {
        let item = tank_arr[Math.floor(random * tank_arr.length)];
        let res = icon_match[item].name + " " + icon_match[item].icon;
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 求其幫你抽隻坦啦: Tank -> ${res}`
        });
    }
    if (contentStr.includes('補') || contentStr.includes('奶') || contentStr.toLowerCase().includes('healer')) {
        let item = healer_arr[Math.floor(random * healer_arr.length)];
        let res = icon_match[item].name + " " + icon_match[item].icon;
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 求其幫你抽隻補啦: Healer -> ${res}`
        });
    }
    if (contentStr.includes('近') || contentStr.toLowerCase().includes('melee')) {
        let item = melee_arr[Math.floor(random * melee_arr.length)];
        let res = icon_match[item].name + " " + icon_match[item].icon;
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 求其幫你抽隻近戰啦: Melee DPS -> ${res}`
        });
    }
    if (contentStr.includes('遠') || contentStr.toLowerCase().includes('range')) {
        let item = range_arr[Math.floor(random * range_arr.length)];
        let res = icon_match[item].name + " " + icon_match[item].icon;
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 求其幫你抽隻遠攻啦: Ranged DPS -> ${res}`
        });
    }
    if (contentStr.includes('法') || contentStr.includes('魔') || contentStr.toLowerCase().includes('magic') || contentStr.toLowerCase().includes('mage')) {
        let item = magic_arr[Math.floor(random * magic_arr.length)];
        let res = icon_match[item].name + " " + icon_match[item].icon;
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 求其幫你抽隻法師啦: Mage -> ${res}`
        });
    }
    if (contentStr.includes('打') || contentStr.toLowerCase().includes('dps')) {
        let item = dps_arr[Math.floor(random * dps_arr.length)];
        let res = icon_match[item].name + " " + icon_match[item].icon;
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `<@!${context.params.event.author.id}> 又唔講明近遠法，求其幫你抽隻打手啦: DPS -> ${res}`
        });
    }
    let item = full_list[Math.floor(random * full_list.length)];
    let res = icon_match[item].name + " " + icon_match[item].icon;
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `<@!${context.params.event.author.id}> 又唔講明坦補打，求其幫你抽隻職啦: Any -> ${res}`
    });
}

if (((contentStr.includes('優遇') || contentStr.includes('優越')) && (contentStr.includes('一覽') || contentStr.includes('列表'))) || contentStr.includes('開唔到人')) {
    let a = contentStr.toLowerCase().match(/gaia|elemental|mana|aether|primal|crystal|chaos|light/g);
    var dc = a ? a : "gaia";
    let resultArr = await lib.utils.kv['@0.1.16'].entries();
    let finalResult = [];
    for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i][0].match(dc)) {
            finalResult.push(resultArr[i][1]);
        }
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
                name: `${dc}`,
                value: finalResult.join("\n")
            }, {
                name: '官網連結',
                value: 'https://jp.finalfantasyxiv.com/lodestone/worldstatus/'
            }]
        }
    });
}

if (contentStr.includes('妖怪手錶')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://cdn.discordapp.com/attachments/363677618144280589/877105202908499988/574233288059781140.png'
    });
}
if (contentStr.includes('蟹柳好味') || contentStr.includes('蟹柳好偉大')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://www.youtube.com/watch?v=avBEKxG5Ce4'
    });
}
if (contentStr.toLowerCase().includes('big') && contentStr.toLowerCase().includes('fat') && contentStr.toLowerCase().includes('taco')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://www.youtube.com/watch?v=0d6XaW5TeD0'
    });
}
if (contentStr.toLowerCase().includes('lahee')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://www.youtube.com/watch?v=aBt4zT_PBmw'
    });
}
if (contentStr.includes('主線任務數量')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: '||https://cdn.discordapp.com/attachments/877130233294258209/878251370078175232/SPOILER_DsGNY9Cggm.jpg||'
    });
}
if (contentStr.toLowerCase().includes('升lv方法')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: 'https://cdn.discordapp.com/attachments/877130233294258209/878595802652618782/unknown.png'
    });
}

if (contentStr.includes('禮儀')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: '',
        embed: {
            title: '日服基本禮儀',
            type: 'rich',
            color: 0xffba01,
            description: '',
            image: {
                "url": `https://media.discordapp.net/attachments/878934663769509918/879252949367390228/unknown.png`,
                "height": 0,
                "width": 0
            },
            fields: [{
                name: '詳細資訊',
                value: ['[#巴哈 -【心得】新手上路禮貌須知](https://forum.gamer.com.tw/G2.php?bsn=17608&parent=0&sn=948&lorder=10)', '[#Google Sheet - 言葉補完計畫](https://docs.google.com/spreadsheets/d/10lQY-VwXPjZJPT7lGRAkO1HjW1SZQOn-o3LPmlWEErk/edit#gid=2)'].join('\n')
            }]
        }
    });
}

if ((contentStr.includes('搖桿') || contentStr.includes('手掣') || contentStr.includes('手制')) && contentStr.includes('教學')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `https://forum.gamer.com.tw/C.php?bsn=17608&snA=15239&tnum=24`
    });
}

if ((contentStr.includes('新手') || contentStr.includes('有用')) && (contentStr.includes('教學') || contentStr.includes('設定'))) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `https://forum.gamer.com.tw/C.php?bsn=17608&snA=17264`
    });
}

if (contentStr.includes('練生產.gif')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `https://cdn.discordapp.com/attachments/877130233294258209/879974037089038346/image0.gif`
    });
}

if (contentStr.includes('紅蓮祭')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        // content: `https://cdn.discordapp.com/attachments/704017265544265749/880264655325495317/image0.png`
        content: `一早過左啦<:u_hahaha:673423717124276247>`
    });
}

if (contentStr.includes('新生祭.gif')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `https://cdn.discordapp.com/attachments/877130233294258209/880161691164356638/image0.gif`
    });
}

if (contentStr.toLowerCase().includes("lawson")) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: '',
        embed: {
            title: 'Lawson討伐戰',
            type: 'rich',
            color: 0x445094,
            description: '',
            image: {
                'url': 'https://cdn.discordapp.com/attachments/877130233294258209/882647484558630983/image0.gif',
                "height": 0,
                "width": 0
            },
            fields: [{
                name: '活動連結',
                value: 'https://www.lawson.co.jp/lab/campaign/ffxiv/mileage.html'
            }]
        }
    });
}

if (contentStr.includes('活動.gif')) {
    return lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `https://cdn.discordapp.com/attachments/877130233294258209/882643519817252885/image0.gif`
    });
}

// Classify whether an user joined for 90days or not
// if so, answer newible questions
// console.log(context.params);
if (context.params.event.member.joined_at && (new Date() - new Date(context.params.event.member.joined_at) < 90 * 24 * 3600 * 1000)) {
    if ((contentStr.includes('試玩') || contentStr.includes('免費')) && (contentStr.includes('限制') || contentStr.includes('資訊') || contentStr.toLowerCase().includes('info') || contentStr.includes('功能'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '試玩限制',
                type: 'rich',
                color: 0xfff77a,
                description: '',
                fields: [{
                    name: ['目前本遊戲可以免費試玩至60級，主線暢遊至3.56故事完結',
                        '試玩期間部分功能無法使用'
                    ].join('\n'),
                    value: ['▸ 無法加入公會',
                        '▸ 無法使用密頻',
                        '▸ 無法邀請別人組隊 (可加入隊伍)',
                        '▸ 無法交易',
                        '▸ 金錢上限為30萬'
                    ].join('\n')
                }, {
                    name: '試玩申請 / Square Enix帳號連結FF14',
                    value: '[#試玩申請](https://discord.com/channels/363677618144280587/788830915916202024/871314039169490946)'
                }]
            }
        });
    }
    if (contentStr.toLowerCase().includes('i2501')) {
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
                    '會累加上去，過往曾經有人被封鎖高達10天\n'
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
                }, {
                    name: '歐服i2501 report form',
                    value: 'https://support.eu.square-enix.com/spform.php?id=5383&la=2&h=729633fa'
                }]
            }
        });
    }
    if (contentStr.includes('下載') || contentStr.includes('創角')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877130233294258209/879397603144507452/unknown.png'
        });
    }
    if ((contentStr.includes('懶人包') || contentStr.includes('教學') || contentStr.includes('打手')) && (contentStr.toLowerCase().includes('ps版') || contentStr.toLowerCase().includes('psn') || contentStr.toLowerCase().includes('ps4'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877436436809400370/image0.jpg'
        });
    }
    if ((contentStr.includes('懶人包') || contentStr.includes('教學') || contentStr.includes('打手')) && contentStr.toLowerCase().includes('steam')) {
        if (contentStr.includes('買')) {
            return lib.discord.channels['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: 'https://cdn.discordapp.com/attachments/877130233294258209/879540253147426896/unknown.png'
            });
        }
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877130233294258209/877813244423720960/unknown.png'
        });
    }
    if (contentStr.includes('改制') && (contentStr.includes('想') || contentStr.includes('點') || contentStr.includes('教學'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877437854714822666/unknown.png'
        });
    }
    if ((contentStr.toLowerCase().includes('steam') || contentStr.includes('PC版') || contentStr.toLowerCase().includes('ps4') || contentStr.includes('版本')) && (contentStr.includes('分別') || contentStr.includes('唔同') || contentStr.includes('差異') || contentStr.includes('買'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877130233294258209/879397926831538246/unknown.png'
        });
    }
    if (contentStr.toLowerCase().includes('hud') && (contentStr.includes('想') || contentStr.includes('點') || contentStr.includes('教學'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877442201288859648/unknown.png'
        });
    }
    if ((contentStr.includes('排唔到') || contentStr.includes('排好耐') || contentStr.includes('無人排') || contentStr.toLowerCase().includes('content') || contentStr.toLowerCase().includes('finder')) && (contentStr.includes('副本') || contentStr.includes('教學'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/878142890830872576/PF.png'
        });
    }
    if (contentStr.includes('點樣飛') || contentStr.includes('風脈') || contentStr.includes('飛行')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '點樣飛',
                type: 'rich',
                color: 0xa4de02,
                description: ['50lv完成2.0主線後即可解鎖飛行，3.0及以後地圖需要完成對應地圖主線、完成對應地圖風脈泉支線(藍任)以及與地圖上的風脈泉共鳴後才能飛行。',
                    '丶所有坐騎均可飛行。',
                    '丶風脈泉理論上需要玩家使用風脈儀尋找，但若想偷懶可以參照風脈地圖。',
                    '丶風脈泉大多分佈在主線路線上。',
                    '丶每張地圖固定有10個風脈泉和5個風脈支線。\n'
                ].join('\n'),
                fields: [{
                    name: '風脈地圖：',
                    value: ['[#日文](https://game8.jp/ff14/275978)',
                        '[#簡中](https://tools.ffxiv.cn/lajipai/index.html)',
                        '[#Discord資料區-風脈及地圖](https://discord.com/channels/363677618144280587/543271289620791296)'
                    ].join('  ')
                }]
            }
        });
    }
    if (contentStr.includes('幻想藥') || contentStr.includes('美容師')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877885216268619807/-1.png'
        });
    }
    if (contentStr.includes('副本') && (contentStr.includes('攻略') || contentStr.includes('機制'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '新手副本機制',
                type: 'rich',
                color: 0xffdfbf,
                description: '',
                fields: [{
                    name: '2.0 - 3.0 新手副本機制',
                    value: '[#Google Sheet Link](https://docs.google.com/spreadsheets/d/1mdgeOUSV8xQzRGJ8xwA0y894QZTxMFgm4Q7OwCi9SGI/edit?usp=sharing)'
                }]
            }
        });
    }

    if ((contentStr.includes('坐騎') || contentStr.includes('陸行鳥')) && (contentStr.includes('點先有') || contentStr.includes('點有') || contentStr.includes('點拎') || contentStr.includes('點先拎到') || (contentStr.includes('幾') && contentStr.includes('先有')))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '幾多Lv先有坐騎?',
                type: 'rich',
                color: 0xf90492,
                description: '',
                fields: [{
                    name: '1. 完成主線20Lv任務 [英雄の卵] ',
                    value: '[#英雄の卵](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/c90b420ef47/)'
                }, {
                    name: '2. 完成後各軍團處會有坐騎任',
                    value: '[#黒渦団](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/2aac1dcda64/)\n[#双蛇党](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/1ddd53e642c/)\n[#不滅隊](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/cdf5de09896/)'
                }, {
                    name: '3. 接完坐騎任後繼續解主線並完成主線任務 [森の意志あらんことを]',
                    value: '[#森の意志あらんことを](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/ae1f4b2aff5/)'
                }, {
                    name: '4. 完成任務後可獲得300軍票, 然後於各軍團補給品NPC換取 [チョコボ支給券] / [Chocobo Issuance] ',
                    value: '\n\n*睇唔明日文可以於官網右上方語言選擇英語'
                }]
            }
        });
    }
    if ((contentStr.includes('軍團') || contentStr.includes('軍隊')) && (contentStr.includes('分別') || contentStr.includes('唔同') || contentStr.includes('揀') || contentStr.includes('點轉') || contentStr.includes('三大') || contentStr.includes('差異'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '三大軍團(黒渦団 双蛇党 不滅隊)有咩唔同？',
                type: 'rich',
                color: 0xf90492,
                description: '基本上無所謂,除左少量唔同',
                fields: [{
                    name: '不同之處',
                    value: ['1. 外觀用既軍服',
                        '2. PVP成就座騎',
                        '3. 可換領之陸行鳥鳥甲',
                        '4. 交任主城位置',
                        '*日後都可以自由轉換, 只不過要重升軍階'
                    ].join('\n')
                }]
            }
        });
    }
    if ((contentStr.includes("幻化") || contentStr.includes("投影")) && (contentStr.includes("教學") || contentStr.includes("幻化投影"))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '幻化教學',
                type: 'rich',
                color: 0x0492f9,
                description: '15Lv 去沙之家附近接任<:704952915890143232:878592208612233237>',
                fields: [{
                    name: '詳細教學連結',
                    value: ['[#繁中](https://www.oninegi.com/glamour-dresser)  [#簡中](https://ff14.huijiwiki.com/wiki/%E6%AD%A6%E5%85%B7%E6%8A%95%E5%BD%B1)  [#日文](https://game8.jp/ff14/301040)',
                        '[#英文](https://ffxiv.consolegameswiki.com/wiki/Glamours)  [#Youtube教學](https://www.youtube.com/watch?v=mXTVtL_Ro5U&t=164s)'
                    ].join('\n')
                }]
            }
        });
    }
    if ((contentStr.toLowerCase().includes('咩ser') || contentStr.toLowerCase().includes('咩dc') || contentStr.toLowerCase().includes('邊個ser') || contentStr.toLowerCase().includes('邊個dc') || contentStr.toLowerCase().includes('ser') || contentStr.includes('日服') || contentStr.includes('國際服') || contentStr.includes('美服') || contentStr.includes('歐服')) && (contentStr.includes('多人玩') || contentStr.includes('香港人') || contentStr.includes('大家') || contentStr.includes('優遇') || contentStr.includes('入坑') || contentStr.includes('揀') || contentStr.includes('多數'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '咩Ser最多香港人玩? / 大家咩DC???',
                type: 'rich',
                color: 0xb055f8,
                description: ['▸ 本討論區的玩家主要集中於日本區Gaia DC，其中以Ifrit Server最為多人',
                    '▸ 新入坑玩家可考慮於Gaia DC創角，方便尋找香港玩家一齊玩 或 尋求支援',
                    '▸ 於優遇伺服器創建角色能較快提升職業等級，並可以額外獲得15天遊玩權利',
                    '▸ 但缺點是優遇伺服器乃少人的代名詞',
                    '▸ 若要加入遊戲公會，需要人物與公會都屬相同伺服器'
                ].join('\n'),
                fields: [{
                    name: '有用連結',
                    value: ['[#入坑指南](https://discord.com/channels/363677618144280587/788830915916202024/871314055086895125)', '[#LLL公會介紹](https://discord.com/channels/363677618144280587/795169174456238111/795170302526881822)'].join('\n')
                }]
            }
        });
    }
    if ((contentStr.includes('漢化') || contentStr.includes('中文化') || (contentStr.includes('中文') && contentStr.includes('遊戲語言'))) && (contentStr.includes('點先有') || contentStr.includes('點有') || contentStr.includes('點轉') || contentStr.includes('點裝') || contentStr.includes('有冇') || contentStr.includes("教學"))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '漢化教學',
                type: 'rich',
                color: 0xfa547c,
                description: ['▸ 當中涉及非官方承認之修改，使用與否請自行判斷 & 承擔風險',
                    '▸ 當中涉及非官方承認之修改，使用與否請自行判斷 & 承擔風險',
                    '▸ 當中涉及非官方承認之修改，使用與否請自行判斷 & 承擔風險'
                ].join('\n'),
                fields: [{
                    name: '▸ 請留意以下連結之注意事項',
                    value: '[#漢化教學](https://discord.com/channels/363677618144280587/856922919015809055/866978847114788864)'
                }]
            }
        });
    }
    if ((contentStr.includes("轉職") || contentStr.includes("職業") || contentStr.includes("特職") || contentStr.includes("副職") || contentStr.includes("升職")) && (contentStr.includes("前置") || contentStr.includes("教學") || contentStr.includes("開放") || contentStr.includes("要求"))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/878934663769509918/879178924083511356/unknown.png'
        });
    }
    if (contentStr.includes('生產') && contentStr.includes('換領') && contentStr.includes('裝')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877459862081110086/image0.jpg',
        });
    }
} else {
    if (contentStr === "試玩限制") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '試玩限制',
                type: 'rich',
                color: 0xfff77a,
                description: '',
                fields: [{
                    name: ['目前本遊戲可以免費試玩至60級，主線暢遊至3.56故事完結',
                        '試玩期間部分功能無法使用'
                    ].join('\n'),
                    value: ['▸ 無法加入公會',
                        '▸ 無法使用密頻',
                        '▸ 無法邀請別人組隊 (可加入隊伍)',
                        '▸ 無法交易',
                        '▸ 金錢上限為30萬'
                    ].join('\n')
                }, {
                    name: '試玩申請 / Square Enix帳號連結FF14',
                    value: '[#試玩申請](https://discord.com/channels/363677618144280587/788830915916202024/871314039169490946)'
                }]
            }
        });
    }
    if (contentStr.toLowerCase() === 'i2501') {
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
                    '會累加上去，過往曾經有人被封鎖高達10天\n'
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
                }, {
                    name: '歐服i2501 report form',
                    value: 'https://support.eu.square-enix.com/spform.php?id=5383&la=2&h=729633fa'
                }]
            }
        });
    }
    if ((contentStr.includes('下載') || contentStr.includes('創角')) && contentStr.includes('懶人包')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877130233294258209/879397603144507452/unknown.png'
        });
    }
    if (contentStr === '版本差異') {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877130233294258209/879397926831538246/unknown.png',
        });
    }
    if (contentStr.toLowerCase() === 'ps版購買懶人包') {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877436436809400370/image0.jpg',
        });
    }
    if (contentStr.includes('steam') && contentStr.includes('懶人包')) {
        if (contentStr.includes('買')) {
            return lib.discord.channels['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: 'https://cdn.discordapp.com/attachments/877130233294258209/879540253147426896/unknown.png'
            });
        }
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877130233294258209/877813244423720960/unknown.png'
        });
    }
    if (contentStr === '改制教學') {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877437854714822666/unknown.png',
        });
    }
    if (contentStr.toLowerCase() === 'hud教學') {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877442201288859648/unknown.png',
        });
    }
    if (contentStr === '排唔到副本' || (contentStr.toLowerCase().includes('content') && contentStr.toLowerCase().includes('finder') && contentStr.toLowerCase().includes('教學'))) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/878142890830872576/PF.png',
        });
    }
    if (contentStr === '點樣飛') {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '點樣飛',
                type: 'rich',
                color: 0xa4de02,
                description: ['50lv完成2.0主線後即可解鎖飛行，3.0及以後地圖需要完成對應地圖主線、完成對應地圖風脈泉支線(藍任)以及與地圖上的風脈泉共鳴後才能飛行。',
                    '丶所有坐騎均可飛行。',
                    '丶風脈泉理論上需要玩家使用風脈儀尋找，但若想偷懶可以參照風脈地圖。',
                    '丶風脈泉大多分佈在主線路線上。',
                    '丶每張地圖固定有10個風脈泉和5個風脈支線。\n'
                ].join('\n'),
                fields: [{
                    name: '風脈地圖：',
                    value: ['[#日文](https://game8.jp/ff14/275978)',
                        '[#簡中](https://tools.ffxiv.cn/lajipai/index.html)',
                        '[#Discord資料區-風脈及地圖](https://discord.com/channels/363677618144280587/543271289620791296)'
                    ].join('  ')
                }]
            }
        });
    }
    if (contentStr === ('幻想藥') || contentStr === ('美容師')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877885216268619807/-1.png'
        });
    }
    if (contentStr === "點拎坐騎") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '幾多Lv先有坐騎?',
                type: 'rich',
                color: 0xf90492,
                description: '',
                fields: [{
                    name: '1. 完成主線20Lv任務 [英雄の卵] ',
                    value: '[#英雄の卵](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/c90b420ef47/)'
                }, {
                    name: '2. 完成後各軍團處會有坐騎任',
                    value: '[#黒渦団](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/2aac1dcda64/)\n[#双蛇党](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/1ddd53e642c/)\n[#不滅隊](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/cdf5de09896/)'
                }, {
                    name: '3. 接完坐騎任後繼續解主線並完成主線任務 [森の意志あらんことを]',
                    value: '[#森の意志あらんことを](https://jp.finalfantasyxiv.com/lodestone/playguide/db/quest/ae1f4b2aff5/)'
                }, {
                    name: '4. 完成任務後可獲得300軍票, 然後於各軍團補給品NPC換取 [チョコボ支給券] / [Chocobo Issuance] ',
                    value: '\n\n*睇唔明日文可以於官網右上方語言選擇英語'
                }]
            }
        });
    }
    if (contentStr === "軍團差異") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '三大軍團(黒渦団 双蛇党 不滅隊)有咩唔同？',
                type: 'rich',
                color: 0xf99204,
                description: '基本上無所謂,除左少量唔同',
                fields: [{
                    name: '不同之處',
                    value: ['1. 外觀用既軍服',
                        '2. PVP成就座騎',
                        '3. 可換領之陸行鳥鳥甲',
                        '4. 交任主城位置',
                        '*日後都可以自由轉換, 只不過要重升軍階'
                    ].join('\n')
                }]
            }
        });
    }
    if (contentStr === "幻化教學") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '幻化教學',
                type: 'rich',
                color: 0x0492f9,
                description: '15Lv 去沙之家附近接任<:704952915890143232:878592208612233237>',
                fields: [{
                    name: '詳細教學連結',
                    value: ['[#繁中](https://www.oninegi.com/glamour-dresser)  [#簡中](https://ff14.huijiwiki.com/wiki/%E6%AD%A6%E5%85%B7%E6%8A%95%E5%BD%B1)  [#日文](https://game8.jp/ff14/301040)',
                        '[#英文](https://ffxiv.consolegameswiki.com/wiki/Glamours)  [#Youtube教學](https://www.youtube.com/watch?v=mXTVtL_Ro5U&t=164s)'
                    ].join('\n')
                }]
            }
        });
    }
    if (contentStr.includes('新手副本攻略') || contentStr.includes('新手副本機制')) {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '新手副本機制',
                type: 'rich',
                color: 0xffdfbf,
                description: '',
                fields: [{
                    name: '2.0 - 3.0 新手副本機制',
                    value: '[#Google Sheet Link](https://docs.google.com/spreadsheets/d/1mdgeOUSV8xQzRGJ8xwA0y894QZTxMFgm4Q7OwCi9SGI/edit?usp=sharing)'
                }]
            }
        });
    }
    if (contentStr.toLowerCase() === "咩ser多人玩") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '咩Ser最多香港人玩? / 大家咩DC???',
                type: 'rich',
                color: 0xb055f8,
                description: ['▸ 本討論區的玩家主要集中於日本區Gaia DC，其中以Ifrit Server最為多人',
                    '▸ 新入坑玩家可考慮於Gaia DC創角，方便尋找香港玩家一齊玩 或 尋求支援',
                    '▸ 於優遇伺服器創建角色能較快提升職業等級，並可以額外獲得15天遊玩權利',
                    '▸ 但缺點是優遇伺服器乃少人的代名詞',
                    '▸ 若要加入遊戲公會，需要人物與公會都屬相同伺服器'
                ].join('\n'),
                fields: [{
                    name: '有用連結',
                    value: ['[#入坑指南](https://discord.com/channels/363677618144280587/788830915916202024/871314055086895125)', '[#LLL公會介紹](https://discord.com/channels/363677618144280587/795169174456238111/795170302526881822)'].join('\n')
                }]
            }
        });
    }
    if (contentStr === "漢化教學") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: '',
            embed: {
                title: '漢化教學',
                type: 'rich',
                color: 0xfa547c,
                description: ['▸ 當中涉及非官方承認之修改，使用與否請自行判斷 & 承擔風險',
                    '▸ 當中涉及非官方承認之修改，使用與否請自行判斷 & 承擔風險',
                    '▸ 當中涉及非官方承認之修改，使用與否請自行判斷 & 承擔風險'
                ].join('\n'),
                fields: [{
                    name: '▸ 請留意以下連結之注意事項',
                    value: '[#漢化教學](https://discord.com/channels/363677618144280587/856922919015809055/866978847114788864)'
                }]
            }
        });
    }
    if (contentStr === "轉職前置" || contentStr === "職業前置") {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/878934663769509918/879178924083511356/unknown.png'
        });
    }
    if (contentStr === '生產裝換領') {
        return lib.discord.channels['@0.2.0'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: 'https://cdn.discordapp.com/attachments/877137307810009098/877459862081110086/image0.jpg',
        });
    }
}