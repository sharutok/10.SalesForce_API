const connectToOracleDB = require("../../Oracle Connection/config")
const moment = require('moment')

exports.OrderAdjustment = async (data) => {
  const CREATED_AT = moment().format('YYYY/MM/DD HH:mm:ss')

  try {
    (data.map(async x => {
      const {
        SALES_INDENT_ID,
        INDENT_LINE_ID,
        ADJUSTMENT_ID,
        DISCOUNT_TYPE,
        DISCOUNT,
        SCHEME_NAME,
        ATTRIBUTE1,
        ITEM_RATE
      } = x

      const sql = `INSERT INTO awl_sf.order_adjustment(
      SALES_INDENT_ID,
      INDENT_LINE_ID,
      ADJUSTMENT_ID,
      DISCOUNT_TYPE,
      DISCOUNT,
      SCHEME_NAME,
      ATTRIBUTE1,
      ITEM_RATE,
      CREATED_AT
      )
        VALUES (
        '${SALES_INDENT_ID}',
        '${INDENT_LINE_ID}',
        '${ADJUSTMENT_ID}',
        '${DISCOUNT_TYPE}',
        '${DISCOUNT}',
        '${SCHEME_NAME}',
        '${ATTRIBUTE1}',
        '${ITEM_RATE}',
        TO_DATE('${CREATED_AT}', 'yyyy/mm/dd HH24:MI:ss')
        )`

      // console.log(sql);

      const result = await connectToOracleDB(sql)
      console.log(result);
    }))
    console.log(`value inserted in order header sql`);
    return [1, data.length]
  } catch (error) {
    console.log(`error in order header sql`, error);
    return [0, 0]
  }

}
