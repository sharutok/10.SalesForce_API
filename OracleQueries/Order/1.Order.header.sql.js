const connectToOracleDB = require('../../Oracle Connection/config')
const moment = require('moment')
exports.OrderHeader = async (data) => {
    const CREATED_AT = moment().format('YYYY/MM/DD HH:mm:ss')

    try {
        data.map(async x => {
            const {
                SALES_INDENT_ID,
                ACCOUNT_NUMBER,
                SHIP_TO_ORG_ID,
                INVOICE_TO_ORG_ID,
                CUST_PO_NUMBER,
                ENQUIRY_ID,
                APPROVAL_DATE,
                OPERATING_UNIT_ID,
                FREIGHT_TERMS_CODE,
                AMOUNT,
                PLANT_ID,
                FOB_POINT_CODE,
                ORDER_COMMENTS,
                SHIPPING_AND_HANDLING
            } = x

            const sql = `INSERT INTO awl_sf.order_header(
            SALES_INDENT_ID, 
            ACCOUNT_NUMBER, 
            SHIP_TO_ORG_ID, 
            INVOICE_TO_ORG_ID, 
            CUST_PO_NUMBER, 
            ENQUIRY_ID, 
            APPROVAL_DATE, 
            OPERATING_UNIT_ID, 
            FREIGHT_TERMS_CODE, 
            AMOUNT, 
            PLANT_ID, 
            FOB_POINT_CODE, 
            ORDER_COMMENTS, 
            SHIPPING_AND_HANDLING,
             CREATED_AT 
            )
            VALUES (
              '${SALES_INDENT_ID}',
              '${ACCOUNT_NUMBER}',
              '${SHIP_TO_ORG_ID}',
              '${INVOICE_TO_ORG_ID}',
              '${CUST_PO_NUMBER}',
              '${ENQUIRY_ID}',
              TO_DATE('${CREATED_AT}', 'yyyy/mm/dd HH24:MI:ss'),
              '${OPERATING_UNIT_ID}',
              '${FREIGHT_TERMS_CODE}',
              '${AMOUNT}',
              '${PLANT_ID}',
              '${FOB_POINT_CODE}',
              '${ORDER_COMMENTS}',
              '${SHIPPING_AND_HANDLING}',
              TO_DATE('${CREATED_AT}', 'yyyy/mm/dd HH24:MI:ss')
              )`;
            //   '${APPROVAL_DATE}', 
            const result = await connectToOracleDB(sql)
            console.log(result);
        })
        console.log(`value inserted in order header sql`);
        return [1, data.length]
    } catch (error) {
        console.log(`error in order header sql`, error);
        return [0, 0]
    }
}