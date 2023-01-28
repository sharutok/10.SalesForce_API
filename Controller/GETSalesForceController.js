const { COPS_ADJUSTMENT, COPS_SALES_INDENT_HEADERS, COPS_SALES_INDENT_LINES } = require('../OracleQueries/Queries')
const oracledb = require('oracledb')
require("dotenv").config({ path: "./.env" });

exports.Sales = async (req, res) => {
    const data = {
        SALES_INDENT_ID: 9003,
        ORDER_SOURCE_NAME: 'COPSW',
        ORIG_SYS_DOCUMENT_REF: 'EQUIPMENT_9003',
        REQUEST_DATE: "2016-11-12T06:27:00.000Z",
        ACCOUNT_NUMBER: 1541141,
        SHIP_TO_ORG_ID: 79730,
        INVOICE_TO_ORG_ID: 79729,
        CUST_PO_NUMBER: '002',
        ENQUIRY_ID: 11003,
        STATUS: 'Cancelled',
        SALESREP_ID: '14535',
        IS_APPROVED: 'N',
        APPROVAL_DATE: "2016-11-25T10:06:21.000Z",
        OPERATING_UNIT_ID: null,
        OWNER_ID: 33,
        CREATED_BY: 33,
        CREATION_DATE: "2016-11-11T06:30:41.000Z",
        LAST_UPDATED_BY: 33,
        LAST_UPDATE_DATE: "2016-11-25T10:06:21.000Z",
        ATTRIBUTE1: null,
        ATTRIBUTE2: null,
        ATTRIBUTE3: '1',
        ORDER_NUMBER: null,
        HEADER_ID: null,
        FREIGHT_TERMS_CODE: 'Due',
        CARRIER_ID: null,
        CATEGORY_NAME: 'EQUIPMENT',
        ORDER_TYPE_ID: null,
        AMOUNT: 229770,
        IS_LOCKED: 'Y',
        FOB_POINT_CODE: 'CUSTOMER SITE',
        ATTRIBUTE4: 'CANCELLED',
        ATTRIBUTE5: null,
        IS_OTHER_ORDER: 'N',
        PLANT_ID: 0,
        PAYMENT_REF_NO: null,
        PAYMENT_DATE: null,
        IS_ON_HOLD: 'N',
        HOLD_REASON: null,
        HOLD_STATUS: null,
        RELEASE_REASON: null,
        CUSTOMER_CLASSIFICATION_CODE: null,
        CUST_CLASSIFICATION_MEANING: null
    }
    try {
        const data = await connectToOracleDB(COPS_SALES_INDENT_HEADERS)

        console.log("kkk");
        console.log(data.rows);
    } catch (error) {
        console.log(error);
    }
}
// this.Sales()


async function connectToOracleDB(query) {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: process.env.AWL_SF_DEV_USER,
            password: process.env.AWL_SF_DEV_PASSWORD,
            connectString: process.env.AWL_SF_DEV_CONNECTION_STRING,
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
