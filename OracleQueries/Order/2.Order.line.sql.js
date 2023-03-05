const connectToOracleDB = require("../../Oracle Connection/config")
const moment = require('moment')

exports.OrderLine = async (data) => {
  const CREATED_AT = moment().format('YYYY/MM/DD HH:mm:ss')

  try {
    data.map(async x => {
      const {
        SALES_INDENT_ID,
        INDENT_LINE_ID,
        INVENTORY_ITEM_ID,
        SHIP_TO_ORG_ID,
        INVOICE_TO_ORG_ID,
        CUST_PO_NUMBER,
        ORIG_SYS_LINE_REF,
        UNIT_LIST_PRICE,
        DISCOUNT_TYPE,
        ORDERED_QUANTITY,
        DISCOUNT,
        LINE_TOTAL,
        OPERATING_UNIT_ID,
        PRODUCT_UOM_CODE,
        PRICE_LIST_HEADERID,
        PLANT_ID
      } = x
      const sql = `insert into awl_sf.order_line(      
          SALES_INDENT_ID, 
          INDENT_LINE_ID, 
          INVENTORY_ITEM_ID, 
          SHIP_TO_ORG_ID, 
          INVOICE_TO_ORG_ID, 
          CUST_PO_NUMBER, 
          ORIG_SYS_LINE_REF, 
          UNIT_LIST_PRICE, 
          DISCOUNT_TYPE, 
          ORDERED_QUANTITY, 
          DISCOUNT, 
          LINE_TOTAL, 
          OPERATING_UNIT_ID, 
          PRODUCT_UOM_CODE, 
          PRICE_LIST_HEADERID, 
          PLANT_ID,
          CREATED_AT
          )
          VALUES (  
        '${SALES_INDENT_ID}',
        '${INDENT_LINE_ID}',
        '${INVENTORY_ITEM_ID}',
        '${SHIP_TO_ORG_ID}',
        '${INVOICE_TO_ORG_ID}',
        '${CUST_PO_NUMBER}',
        '${ORIG_SYS_LINE_REF}',
        '${UNIT_LIST_PRICE}',
        '${DISCOUNT_TYPE}',
        '${ORDERED_QUANTITY}',
        '${DISCOUNT}',
        '${LINE_TOTAL}',
        '${OPERATING_UNIT_ID}',
        '${PRODUCT_UOM_CODE}',
        '${PRICE_LIST_HEADERID}',
        '${PLANT_ID}',
        TO_DATE('${CREATED_AT}', 'yyyy/mm/dd HH24:MI:ss')
        )`
      const result = await connectToOracleDB(sql)
      console.log(result);
    })
    console.log(`value inserted in order header sql`);
    return [1, data.length]
  } catch (error) {
    console.log(error);
    console.log(`error in order header sql`, error);
    return [0, 0]
  }

}



