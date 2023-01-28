const { default: axios } = require("axios")
const FormData = require('form-data')
const oracledb = require('oracledb');
const { Customer_Master_Query, Customer_Sites_Query, Invoice_Details_Query, Invoice_Header_Query, Item_Categories_Query, Item_Master_Query, Organization_Master_Query, Price_List_Query } = require("../OracleQueries/Queries");
const { apiList } = require("../SalesForceAPI/API");
require("dotenv").config({ path: "./.env" });
const { logger_model } = require('../models')

// from ADOR TO SALESFORCE

// WORKING WITHOUT TOKEN
exports.Customer_Master = async (req, res) => {

    const _token = await generatingToken()
    console.log(_token);

    try {
        const { rows } = await connectToOracleDB(Customer_Master_Query)

        const data = await axios.post('https://adorweldingdemo2021--devai22.sandbox.my.salesforce-sites.com/Products/services/apexrest/CustomerAccount', rows,
            // { headers: { 'Authorization': `Bearer ${_token}` } }
        )

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        console.log(`Ran function Customer_Master, data length: ${rows.length}`);

        res.json({
            rows
        })

    } catch (error) {
        console.log('error', error);
    }
}



// WORKING WITHOUT TOKEN
exports.Customer_Sites = async (req, res) => {
    const _token = await generatingToken()
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Customer_Sites_Query)
        const data = await axios.post("https://adorweldingdemo2021--devai22.sandbox.my.salesforce-sites.com/Products/services/apexrest/Customersite ",
            rows,
            // { headers: { 'Authorization': `Bearer ${_token}` } }
        )
        console.log(`Ran function Customer_Sites, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        res.json({
            rows
        })

    } catch (error) {
        console.log('error', error);
    }
}


exports.Invoice_Details = async (req, res) => {

    const _token = await generatingToken()
    try {
        const { rows } = await connectToOracleDB(Invoice_Details_Query)

        /*
        const data = await axios.post(url, rows,
            { headers: { 'Authorization': `Bearer ${_token}` } }
            )
            */
        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        console.log(`Ran function Invoice_Details, data length: ${rows.length}`);

        res.json({
            rows
        })

    } catch (error) {
        console.log('error', error);
    }
}



exports.Invoice_Header = async (req, res) => {

    const _token = await generatingToken()
    try {

        const { rows } = await connectToOracleDB(Invoice_Header_Query)
        const result = rows

        // const data = await axios.post(url, req.body, { headers: { 'Authorization': `Bearer ${_token}` } })

        console.log(`Ran function Invoice_Header, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        res.json({
            result
        })

    } catch (error) {
        console.log('error', error.response.data);
    }
}


// WORKING WITHOUT TOKEN
exports.Item_Categories = async (req, res) => {

    const _token = await generatingToken()
    try {

        const { rows } = await connectToOracleDB(Item_Categories_Query)
        const result = rows

        const data = await axios.post('https://adorweldingdemo2021--devai22.sandbox.my.salesforce-sites.com/Products/services/apexrest/Category', rows,
            // { headers: { 'Authorization': `Bearer ${_token}` } }
        )

        console.log(`Ran function Item_Categories, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        res.json({
            rows
        })

    } catch (error) {
        console.log('error', error.response.data);
    }
}



// WORKING
exports.Item_Master = async (req, res) => {

    const _token = await generatingToken()
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Item_Master_Query)

        const data = await axios.post("https://adorweldingdemo2021--devai22.sandbox.my.salesforce-sites.com/Products/services/apexrest/Products",
            rows,
            { headers: { 'Authorization': `Bearer ${_token}` } })

        console.log(`Ran function Item_Master, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        res.json({
            rows
        })

    } catch (error) {
        console.log('error', error);
    }
}



// WORKING WITHOUT TOKEN
exports.Organization_Master = async (req, res) => {

    const _token = await generatingToken()
    console.log(_token);
    try {

        const { rows } = await connectToOracleDB(Organization_Master_Query)

        const data = await axios.post("https://adorweldingdemo2021--devai22.sandbox.my.salesforce-sites.com/Products/services/apexrest/Organization",
            rows,
            // { headers: { 'Authorization': `Bearer ${_token}` } }
        )

        console.log(`Ran function Item_Master, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        res.json({
            rows
        })

    } catch (error) {
        console.log('error', error);
    }
}



exports.Price_List = async (req, res) => {

    const _token = await generatingToken()
    try {

        const { rows } = await connectToOracleDB(Price_List_Query)
        const result = rows

        // const data = await axios.post(url, req.body, { headers: { 'Authorization': `Bearer ${_token}` } })

        console.log(`Ran function Price_List, data length: ${rows.length}`);

        await Logger(data_length = rows.length, method = req.method, original_url = req.originalUrl, start_time = req._startTime)

        res.json({
            result
        })

    } catch (error) {
        console.log('error', error);
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
        console.log('error', error);
    }

}


async function connectToOracleDB(query) {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: process.env.DEV_USER,
            password: process.env.DEV_PASSWORD,
            connectString: process.env.DEV_CONNECTION_STRING,
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


async function Logger(data_length, method, original_url, start_time) {
    // console.log(data_length, method, original_url, start_time);
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
