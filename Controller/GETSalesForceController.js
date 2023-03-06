require("dotenv").config({ path: "./.env" });
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { OrderHeader } = require('../OracleQueries/Order/1.Order.header.sql');
const { OrderLine } = require('../OracleQueries/Order/2.Order.line.sql');
const { OrderAdjustment } = require('../OracleQueries/Order/3.Order.adjustment.sql');
const { v4: uuidv4 } = require('uuid');
const { Logger } = require("./POSTSalesForceController");

exports.CreateJWT = async (req, res) => {
    const { ador_username, ador_password } = req.body
    if (ador_username === process.env.AUTH_USERNAME && ador_password === process.env.AUTH_PASSWORD) {
        const _token_ = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: process.env.JWT_DATA,
        }, process.env.JWT_SECRET_KEY);

        return res.status(200).json({
            _token: _token_
        })
    }
    return res.status(404).json({
        message: "something went wrong"
    })
}

exports.OrderSales = async (req, res) => {
    try {
        if (req.headers.authorization.split(" ")[0] === 'Bearer' && (jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_KEY).data === process.env.JWT_DATA)) {
            const _token = req.headers.authorization.split(" ")[1]
            console.log(_token);

            let data = []
            req.body.constructor === Object ? data.push(req.body) : data = [...req.body];

            let order_line_adjust_array = []
            data.map(x => {
                order_line_adjust_array = [...x['Order']['Order Items']];
            })

            let order_header_object = []
            data.map(y => {
                delete y['Order']['Order Items']
                order_header_object.push(y['Order'])
            })

            // for header
            let header_object = []
            let _SALES_INDENT_ID = ""

            order_header_object.map((x, i) => {
                _SALES_INDENT_ID = _uuidv4()
                header_object.push({
                    SALES_INDENT_ID: _SALES_INDENT_ID,
                    EMPLOYEE_ID: x["EMPLOYEE_ID"] || null,
                    REQUEST_DATE: x["EFFECTIVEDATE"] || null,
                    ACCOUNT_NUMBER: x["ERP_CUST_ACCOUNT_NO__C"] || null,
                    SHIP_TO_ORG_ID: x["SHIP_TO_ID__C"] || null,
                    INVOICE_TO_ORG_ID: x["BILL_TO_ID__C"] || null,
                    CUST_PO_NUMBER: x['CUST_PO_NUMBER'] || null,
                    ENQUIRY_ID: x["ORDERNUMBER"] || null,
                    SALESREP_ID: x["EMPLOYEE_NUMBER__C"] || null,
                    APPROVAL_DATE: x['APPROVAL_DATE'] || null,
                    OPERATING_UNIT_ID: x["WAREHOUSE_SK__C"] || null,
                    FREIGHT_TERMS_CODE: x["DELIVERY_TERMS__C"] || null,
                    AMOUNT: x["TOTAL_VALUE__C"] || null,
                    PLANT_ID: x["WAREHOUSE_SK__C"] || null,
                    FOB_POINT_CODE: x["DELIVERY_TERMS__C"] || null,
                    ORDER_COMMENTS: (x["REMARKS__C"]) || null,
                    SHIPPING_AND_HANDLING: x["SHIPPING_AND_HANDLING__C"] || null,
                    FOB_POINT_CODE: x["DELIVERY_TERMS__C"] || null,
                    AMOUNT: x['GRAND_TOTAL__C'] || null,
                    PLANT_ID: x["WAREHOUSE_SK__C"] || null,
                })
            }
            )

            // for line & adjustment
            let adjustment_object = []
            let line_object = []
            let _indent_line_id_array = []
            let _INDENT_LINE_ID = ""

            order_line_adjust_array.map((x, i) => {

                _INDENT_LINE_ID = _uuidv4()
                _indent_line_id_array.push(_INDENT_LINE_ID)

                line_object.push({
                    SALES_INDENT_ID: _SALES_INDENT_ID,
                    INDENT_LINE_ID: _INDENT_LINE_ID,
                    INVENTORY_ITEM_ID: x['ITEM_CODE__C'],
                    SHIP_TO_ORG_ID: x['SHIP_TO__C'],
                    INVOICE_TO_ORG_ID: x['BILL_TO__C'],
                    CUST_PO_NUMBER: x[''],
                    ORIG_SYS_LINE_REF: x[''],
                    UNIT_LIST_PRICE: x['SALES_PRICE__C'],
                    DISCOUNT_TYPE: x[''],
                    ORDERED_QUANTITY: x['QUANTITY__C'],
                    DISCOUNT: x['AD_VALUE1__C'],
                    LINE_TOTAL: x['TOTAL_PRICE__C'],
                    OPERATING_UNIT_ID: x['WAREHOUSE_SK__C'],
                    PRODUCT_UOM_CODE: x['UOM__C'],
                    PRICE_LIST_HEADERID: x[''],
                    ITEM_CODE: x['ITEM_CODE__C'],
                    PLANT_ID: x[''],
                })

                adjustment_object.push(
                    {
                        SALES_INDENT_ID: _SALES_INDENT_ID,
                        INDENT_LINE_ID: _indent_line_id_array[i],
                        ADJUSTMENT_ID: _uuidv4(),
                        DISCOUNT_TYPE: "PERCENTAGE",
                        DISCOUNT: x['TD__C'] || x['TD_MASTER__C'],
                        SCHEME_NAME: "Trade discount",
                        SEQUENCE: 1,
                        ITEM_RATE: x['AMOUNT_1__C']
                    },
                    {
                        SALES_INDENT_ID: _SALES_INDENT_ID,
                        INDENT_LINE_ID: _indent_line_id_array[i],
                        ADJUSTMENT_ID: _uuidv4(),
                        DISCOUNT_TYPE: "PERCENTAGE",
                        DISCOUNT: x['VD__C'] || x['VD_MASTER__C'],
                        SCHEME_NAME: "Value Discount",
                        SEQUENCE: 2,
                        ITEM_RATE: x['AMOUNT_2__C']
                    },
                    {
                        SALES_INDENT_ID: _SALES_INDENT_ID,
                        INDENT_LINE_ID: _indent_line_id_array[i],
                        ADJUSTMENT_ID: _uuidv4(),
                        DISCOUNT_TYPE: "PERCENTAGE",
                        DISCOUNT: x['CD1__C'] || x['CD_MASTER1__C'],
                        SCHEME_NAME: "Cash Discount",
                        SEQUENCE: 3,
                        ITEM_RATE: x['AMOUNT_3__C']
                    },
                    {
                        SALES_INDENT_ID: _SALES_INDENT_ID,
                        INDENT_LINE_ID: _indent_line_id_array[i],
                        ADJUSTMENT_ID: _uuidv4(),
                        DISCOUNT_TYPE: "PERCENTAGE",
                        DISCOUNT: x['AD1__C'] || x['AD_MASTER__C'],
                        SCHEME_NAME: "Additional discount",
                        SEQUENCE: 4,
                        ITEM_RATE: x['AD_VALUE1__C']
                    },
                    {
                        SALES_INDENT_ID: _SALES_INDENT_ID,
                        INDENT_LINE_ID: _indent_line_id_array[i],
                        ADJUSTMENT_ID: _uuidv4(),
                        DISCOUNT_TYPE: "VALUE",
                        DISCOUNT: x['AD_PER_VALUE__C'] || null,
                        SCHEME_NAME: "Additional discount",
                        SEQUENCE: 5,
                        ITEM_RATE: null
                    })
            })

            try {

                if (true) {
                    const responseHeader = await OrderHeader(header_object)
                    console.log(responseHeader, "Header");
                    const responseLine = await OrderLine(line_object)
                    console.log(responseLine, "Line");
                    const responseAdjustment = await OrderAdjustment(adjustment_object)
                    console.log(responseAdjustment, "Adjustment");
                    await Logger(data_length = `Header=${responseHeader[0], responseHeader[1]},Line=${responseLine[0], responseLine[1]},Adjustment=${responseAdjustment[0], responseAdjustment[1]}`, method = "GET", original_url = "apiList.OrderAPI", start_time = new Date())
                }

                res.json({
                    header_object,
                    line_object,
                    adjustment_object,
                })

            } catch (error) {
                console.log(error);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(403).json({
            message: "something went wrong..."
        })
    }
}


function _uuidv4() {
    return uuidv4()
}
















































