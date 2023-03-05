const { default: axios } = require("axios")
const FormData = require('form-data')
const oracledb = require('oracledb');
const { Customer_Master_Query, Customer_Sites_Query, Invoice_Details_Query, Invoice_Header_Query, Item_Categories_Query, Item_Master_Query, Organization_Master_Query, Price_List_Query } = require("../OracleQueries/Queries");
const { apiList } = require("../SalesForceAPI/API");
require("dotenv").config({ path: "./.env" });
const { logger_model } = require('../models')
const fs = require('fs')


exports.Customer_Master = async (req, res) => {
    // RUN TOKEN FUNCTION ONCE
    await generatingToken()

    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);

    try {
        const { rows } = await connectToOracleDB(Customer_Master_Query)

        // const data = await axios.post(apiList.customerAPI, rows,
        //     { headers: { 'Authorization': `Bearer ${_token}` } }
        // )

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.categoryAPI, start_time = new Date())

        console.log(`Ran function Customer_Master, data length: ${rows.length}`);

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Customer_Master', error.code);
    }
}


exports.Customer_Sites = async (req, res) => {
    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Customer_Sites_Query)

        // const data = await axios.post(apiList.customerSite,
        //     rows,
        //     { headers: { 'Authorization': `Bearer ${_token}` } }
        // )
        console.log(`Ran function Customer_Sites, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.customerSite, start_time = new Date())

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Customer_Sites', error);
    }
}

exports.Invoice_Header = async (req, res) => {

    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);
    try {
        const { rows } = await connectToOracleDB(Invoice_Header_Query)

        // const data = await axios.post(apiList.invoiceProductAPI, rows, { headers: { 'Authorization': `Bearer ${_token}` } })

        console.log(`Ran function Invoice_Header, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.invoiceProductAPI, start_time = new Date())

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Invoice_Header', error.code);
    }
}

exports.Invoice_Details = async (req, res) => {

    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);
    try {
        const { rows } = await connectToOracleDB(Invoice_Details_Query)


        const data = await axios.post(apiList.invoiceProductAPI, rows, { headers: { 'Authorization': `Bearer ${_token}` } })

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.invoiceProductAPI, start_time = new Date())

        console.log(`Ran function Invoice_Details, data length: ${rows.length}`);

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Invoice_Details', error.code);
    }
}

exports.Item_Categories = async (req, res) => {

    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Item_Categories_Query)
        const result = rows

        // const data = await axios.post(apiList.categoryAPI, rows,
        //     { headers: { 'Authorization': `Bearer ${_token}` } }
        // )

        console.log(`Ran function Item_Categories, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.categoryAPI, start_time = new Date())

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Item_Categories', error.code);
    }
}


exports.Item_Master = async (req, res) => {

    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Item_Master_Query)

        // const data = await axios.post(apiList.productAPI,
        //     rows,
        //     { headers: { 'Authorization': `Bearer ${_token}` } })

        console.log(`Ran function Item_Master, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.productAPI, start_time = new Date())

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Item_Master', error.code);
    }
}

// WORKING WITH TOKEN
exports.Organization_Master = async (req, res) => {

    const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Organization_Master_Query)

        // const data = await axios.post(apiList.organizationAPI,
        //     rows,
        //     { headers: { 'Authorization': `Bearer ${_token}` } }
        // )

        console.log(`Ran function Organization_Master, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = "POST", original_url = apiList.organizationAPI, start_time = new Date())

        req && res.json({
            rows
        })

    } catch (error) {
        console.log('error in Organization_Master', error);
    }
}

exports.Price_List = async (req, res) => {
    // const _token = fs.readFileSync('./token.txt', { encoding: 'utf8' });
    // console.log(_token);
    try {

        // let arrOfList = []
        // rows.map(row => {
        //     Object.values(row).map(val => {
        //         return arrOfList.push(val)
        //     })
        // })
        // console.log(arrOfList);

        // const values = await connectToOracleDB(Price_List_Query(arrOfList[0]))

        // console.log(values.rows.length);

        const { rows } = await connectToOracleDB(Price_List_Query)

        // await axios.post(url, req.body, { headers: { 'Authorization': `Bearer ${_token}` } })    

        // console.log(`Ran function Price_List, data length: ${rows.length}`);

        await this.Logger(data_length = rows.length, method = "POST", original_url = apiList.categoryAPI, start_time = new Date())

        req && res.json({
            result: rows
        })

    } catch (error) {
        console.log('error in Price_List', error);
    }
}

// SUB FUNCTIONS
async function generatingToken() {
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
        fs.writeFileSync('token.txt', access_token, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("token written successfully");
            }
        })
        return access_token

    } catch (error) {
        console.log('error in Token Generation', error);
    }

}


async function connectToOracleDB(query) {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: process.env.PROD_USER,
            password: process.env.PROD_PASSWORD,
            connectString: process.env.PROD_CONNECTION_STRING,
        });
        const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        return result
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


exports.Logger = async (data_length, method, original_url, start_time) => {
    if (data_length, method, original_url, start_time) {
        try {
            await logger_model.create({
                data_length,
                method,
                original_url,
                start_time: new Date(start_time).toISOString()
            })

        } catch (error) {
            return console.log('error in logger');
        }
    }
}


