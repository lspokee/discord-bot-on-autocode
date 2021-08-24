const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI()

const getID = async() => {
    //find item
    let res = await xiv.search('古ぼけた地図')

    //return item ID
    console.log(res)
    return res.Results[0].ID
}