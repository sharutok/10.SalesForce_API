const { default: axios } = require("axios")
const FormData = require('form-data')


exports.postMethod = async (req, res) => {

    const _token = await generatingToken()
    const url = 'https://adorweldingdemo2021--devai22.sandbox.my.salesforce-sites.com/Products/services/apexrest/Products'


    try {
        const data = await axios.post(url, req.body, { headers: { 'Authorization': `Bearer ${_token}` } })
        res.json({
            status: data.status
        })

    } catch (error) {
        console.log('error in genarating token', error.response.data);
    }
}

const generatingToken = async () => {
    try {
        const bodyFormData = new FormData();
        const object = {
            grant_type: process.env.SF_GRANT_TYPE,
            client_id: process.env.SF_CLIENT_ID,
            client_secret: process.env.SF_CLIENT_SECRET,
            username: process.env.SF_USERNAME,
            password: process.env.SF_PASSWORD,
        }

        Object.entries(object).map(x => {
            bodyFormData.append(x[0], x[1])
        })

        const data = await axios({ method: "post", url: 'https://test.salesforce.com/services/oauth2/token', data: bodyFormData, headers: { "Content-Type": "multipart/form-data" } })
        const { access_token } = data.data
        return access_token

    } catch (error) {
        console.log('error in genarating token', error);
    }

    sendRequest()
}


// const data_body = [
//     {
//         "INVENTORY_ITEM_ID": 332656,
//         "ITEM_CODE": "S21.06.007.0583",
//         "DESCRIPTION": "SHARAN KUDTARKAR",
//         "ENABLED_FLAG": "y",
//         "PRIMARY_UOM_CODE": "NOS",
//         "CATEGORY_ID": 22627,
//         "DELIVERY_LEAD_TIME": "5 days",
//         "METHOD_OF_PACKING": "hand packing",
//         "STANDARD_PACK_SIZE": "6",
//         "BRAND_NAME": "ador",
//         "AWS_CLASSIFICATION": "test int",
//         "LENGTH": "2.45",
//         "DIAMETER": "3.20",
//         "MODEL_DESCRIPTION": "int testing insert",
//         "MINIMUM_ORDER_QUANTITY": "10",
//         "HSN_Code": "435686"
//     }
// ]





