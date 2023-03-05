const { checkSchedulerEngine } = require('../Scheduler/SchedulerEngine')
const arr_value = [...checkSchedulerEngine()]
const start_time = arr_value[0]
// && '00:00'
const end_time = arr_value[1]
// && '24:52'
const today_date = arr_value[2]
// && '2016-10-27'

exports.Customer_Master_Query = `
SELECT ACCOUNT_NUMBER,
       CUST_ACCOUNT_ID,
       PARTY_NAME,
       ATTRIBUTE1 TYPE,
       CURRENCY_CODE,
       TRIM(PRIMARY_PHONE_NUMBER) PRIMARY_PHONE_NUMBER,
       TRIM(SECONDARY_PHONE_NUMBER) SECONDARY_PHONE_NUMBER,
       TRIM(EMAIL_ADDRESS) EMAIL_ADDRESS,
       TRIM(ADDRESS1) ADDRESS1,
       TRIM(ADDRESS2) ADDRESS2,
       TRIM(ADDRESS3) ADDRESS3,
       TRIM(ADDRESS4) ADDRESS4,
       TRIM(CITY) CITY,
       TRIM(STATE) STATE,
       TRIM(POSTAL_CODE) POSTAL_CODE,
       TRIM(COUNTRY) COUNTRY
FROM AWL_COPS.COPS_CUSTOMER_ACCOUNTS
WHERE currency_code = 'USD' 

`

exports.Customer_Sites_Query = `
SELECT
	ccs.CUST_ACCOUNT_ID,
    ccs.LOCATION_ID,
    ccs.LOCATION,
    ccs.SITE_USE_ID,
    ccs.SITE_USE_CODE,
    ccs.STATUS,
    ccs.ADDRESS1,
    ccs.ADDRESS2,
    ccs.ADDRESS3,
    ccs.ADDRESS4,
    ccs.CITY,
    ccs.STATE,
    ccs.POSTAL_CODE,
    ccs.COUNTRY,
    ccs.ATTRIBUTE1 TYPE,
    ccs.ATTRIBUTE2 GST,
    ccs.OPERATING_UNIT_ID
from
    AWL_COPS.COPS_CUSTOMER_SITES ccs,
    AWL_COPS.COPS_CUSTOMER_ACCOUNTS cca
    where 1=1
    and ccs.CUST_ACCOUNT_ID=cca.CUST_ACCOUNT_ID
    and cca.currency_code='USD' 
`

exports.Invoice_Header_Query = `
SELECT 
    cih.INVOICE_ID,
    cih.CUST_ACCOUNT_NUMBER,
    cih.CUST_ACCOUNT_ID,
    cih.CUST_ACCOUNT_NAME,
    cih.SHIP_TO_SITE_USE_ID,
    cih.BILL_TO_SITE_USE_ID,
    cih.TRX_NUMBER,
    cih.TRX_DATE,
    cih.CUSTOMER_PO_NUMBER,
    cih.HEADER_ID,
    cih.ORDER_ACCEPTANCE_NUMBER,
    cih.TOTAL_INVOICE_AMT
FROM 
    AWL_COPS.COPS_INVOICE_HEADER cih,
    AWL_COPS.COPS_CUSTOMER_ACCOUNTS cca
WHERE 1 = 1
    AND cih.CUST_ACCOUNT_ID = cca.CUST_ACCOUNT_ID
    AND cca.currency_code = 'USD' and ROWNUM <= 1

`

exports.Invoice_Details_Query = `
SELECT 
    INVOICE_LINE_ID,
    INVOICE_ID,
    INVENTORY_ITEM_ID,
    UNIT_SELLING_PRICE,
    INVOICED_QUANTITY,
    LINE_AMOUNT,
    LINE_TAX_AMOUNT,
    LINE_TOTAL_AMOUNT,
    SHIPMENT_REF_NUMBER,
    HEADER_ID,
    ORDER_ACCEPTANCE_NUMBER,
    LINE_ID
FROM 
    AWL_COPS.COPS_INVOICE_DETAILS where ROWNUM <=1
`

exports.Item_Categories_Query = `
SELECT
	CATEGORY_ID,
	MAIN_CATEGORY BUSINESS_VERTICAL,
	SEGMENT1 MAIN_PRODUCT_GROUP,
	SEGMENT2 PRODUCT_GROUP,
	SEGMENT3 PRODUCT_SUB_GROUP,
	SEGMENT4 PRODUCT_SUB_SUB_GROUP
FROM
	AWL_COPS.COPS_ITEM_CATEGORIES
 `

exports.Item_Master_Query = `
SELECT  aim.INVENTORY_ITEM_ID,
        aim.concatenated_segments ITEM_CODE,
        aim.DESCRIPTION,
        aim.ENABLED_FLAG,
        aim.PRIMARY_UOM_CODE,
        aim.CATEGORY_ID,
        aim.DELIVERY_LEAD_TIME,
        aim.METHOD_OF_PACKING,
        aim.PACKING_SIZE,
        aim.BRAND_NAME,
        aim.AWS_CLASSIFICATION,
        aim.LENGTH,
        aim.DIAMETER,
        aim.MODEL_DESCRIPTION,
        aim.MINIMUM_ORDER_QUANTITY
FROM
AWL_COPS.COPS_ITEM_MASTER aim
`

exports.Organization_Master_Query = `
SELECT
	OPERATING_UNIT_ID,
	ORGANIZATION_ID,
	ORGANIZATION_NAME,
	ORGANIZATION_CODE,
	ADDRESS_LINE_1,
	ADDRESS_LINE_2,
	ADDRESS_LINE_3,
	CITY,
	STATE,
	COUNTRY,
	POSTAL_CODE
FROM
	AWL_COPS.COPS_ORGANIZATION_DEFINITIONS
`

exports.Price_List_Query = `
SELECT
    LIST_HEADER_ID,
    NAME,
    CURRENCY_CODE,
    INVENTORY_ITEM_ID,
    LIST_PRICE,
    PRODUCT_UOM_CODE,
    START_DATE_ACTIVE,
    END_DATE_ACTIVE from AWL_COPS.COPS_PRICE_LIST_DETAILS where CURRENCY_CODE='USD' and rownum<=1
`


/*
exports.Customer_Master_Query = `
SELECT ACCOUNT_NUMBER,
       CUST_ACCOUNT_ID,
       PARTY_NAME,
       ATTRIBUTE1 TYPE,
       CURRENCY_CODE,
       PRIMARY_PHONE_NUMBER,
       SECONDARY_PHONE_NUMBER,
       EMAIL_ADDRESS,
       ADDRESS1,
       ADDRESS2,
       ADDRESS3,
       ADDRESS4,
       CITY,
       STATE,
       POSTAL_CODE,
       COUNTRY    
FROM AWL_COPS.COPS_CUSTOMER_ACCOUNTS
WHERE currency_code = 'USD' 
AND (TO_CHAR(CREATION_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
or TO_CHAR(LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
)`

exports.Customer_Sites_Query = `
SELECT 
    ccs.CUST_ACCOUNT_ID,
    ccs.LOCATION_ID,
    ccs.LOCATION,
    ccs.SITE_USE_ID,
    ccs.SITE_USE_CODE,
    ccs.STATUS,
    ccs.ADDRESS1,
    ccs.ADDRESS2,
    ccs.ADDRESS3,
    ccs.ADDRESS4,
    ccs.CITY,
    ccs.STATE,
    ccs.POSTAL_CODE,    
    ccs.COUNTRY,
    ccs.ATTRIBUTE1 TYPE,
    ccs.ATTRIBUTE2 GST,
    ccs.OPERATING_UNIT_ID
from
    AWL_COPS.COPS_CUSTOMER_SITES ccs,
    AWL_COPS.COPS_CUSTOMER_ACCOUNTS cca
    where 1=1 
    and ccs.CUST_ACCOUNT_ID=cca.CUST_ACCOUNT_ID
    and cca.currency_code='USD'
    AND (TO_CHAR(ccs.CREATION_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
    or TO_CHAR(ccs.LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
)`

exports.Invoice_Details_Query = `
SELECT 
    INVOICE_LINE_ID,
    INVOICE_ID,
    INVENTORY_ITEM_ID,
    UNIT_SELLING_PRICE,
    INVOICED_QUANTITY,
    LINE_AMOUNT,
    LINE_TAX_AMOUNT,
    LINE_TOTAL_AMOUNT,
    SHIPMENT_REF_NUMBER,
    HEADER_ID,
    ORDER_ACCEPTANCE_NUMBER,
    LINE_ID
FROM 
    AWL_COPS.COPS_INVOICE_DETAILS
    WHERE
    TO_CHAR(CREATION_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'

`

exports.Invoice_Header_Query = `
SELECT 
    cih.INVOICE_ID,
    cih.CUST_ACCOUNT_NUMBER,
    cih.CUST_ACCOUNT_ID,
    cih.CUST_ACCOUNT_NAME,
    cih.SHIP_TO_SITE_USE_ID,
    cih.BILL_TO_SITE_USE_ID,
    cih.TRX_NUMBER,
    cih.TRX_DATE,
    cih.CUSTOMER_PO_NUMBER,
    cih.HEADER_ID,
    cih.ORDER_ACCEPTANCE_NUMBER,
    cih.TOTAL_INVOICE_AMT
FROM 
    AWL_COPS.COPS_INVOICE_HEADER cih,
    AWL_COPS.COPS_CUSTOMER_ACCOUNTS cca
WHERE 1=1
    and cih.CUST_ACCOUNT_ID=cca.CUST_ACCOUNT_ID
    and cca.currency_code='USD'
    AND TO_CHAR(cih.LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'

`

exports.Item_Categories_Query = `
SELECT
    CATEGORY_ID,
    MAIN_CATEGORY BUSINESS_VERTICAL,
    SEGMENT1 MAIN_PRODUCT_GROUP,
    SEGMENT2 PRODUCT_GROUP,
    SEGMENT3 PRODUCT_SUB_GROUP,
    SEGMENT4 PRODUCT_SUB_SUB_GROUP
FROM
    AWL_COPS.COPS_ITEM_CATEGORIES
WHERE
    (TO_CHAR(CREATION_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
    or TO_CHAR(LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
)
 `

exports.Item_Master_Query = `
SELECT  aim.INVENTORY_ITEM_ID,
        aim.concatenated_segments ITEM_CODE,
        aim.DESCRIPTION,
        aim.ENABLED_FLAG,
        (select max(b.reporting_code) from 
        apps.jai_item_templ_hdr_v a,
        apps.jai_reporting_associations_v b
        where b.entity_id=a.template_hdr_id
        and b.effective_from is not null
        and b.effective_to is null
        and b.reporting_type_code='GST_HSN_CODE'
        and a.item_code= aim.concatenated_segments) hsn,
        aim.PRIMARY_UOM_CODE,
        aim.CATEGORY_ID,
        aim.DELIVERY_LEAD_TIME,
        aim.METHOD_OF_PACKING,
        aim.PACKING_SIZE,
        aim.BRAND_NAME,
        aim.AWS_CLASSIFICATION,
        aim.LENGTH,
        aim.DIAMETER,
        aim.MODEL_DESCRIPTION,
        aim.MINIMUM_ORDER_QUANTITY
FROM
AWL_COPS.COPS_ITEM_MASTER aim
where
    (TO_CHAR(CREATION_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
    or TO_CHAR(LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
)`

exports.Organization_Master_Query = `
SELECT
    OPERATING_UNIT_ID,
    ORGANIZATION_ID,
    ORGANIZATION_NAME,
    ORGANIZATION_CODE,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    ADDRESS_LINE_3,
    CITY,
    STATE,
    COUNTRY,
    POSTAL_CODE
FROM
    AWL_COPS.COPS_ORGANIZATION_DEFINITIONS
WHERE
    ( TO_CHAR(CREATION_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
    or TO_CHAR(LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
)
`

exports.Price_List_Query = `
SELECT 
    cpl.LIST_HEADER_ID,
    cpl.NAME,
    cpl.CURRENCY_CODE,
    cpl.INVENTORY_ITEM_ID,
    cim.DESCRIPTION,
    cpl.LIST_PRICE,
    cpl.PRODUCT_UOM_CODE,
    cpl.START_DATE_ACTIVE,
    cpl.END_DATE_ACTIVE
from 
    AWL_COPS.COPS_PRICE_LIST_DETAILS cpl,
    AWL_COPS.COPS_ITEM_MASTER cim
where cpl.CURRENCY_CODE='USD'
AND cpl.INVENTORY_ITEM_ID = cim.INVENTORY_ITEM_ID
AND TO_CHAR(cpl.LAST_UPDATE_DATE , 'yyyy-mm-dd HH24:MI') BETWEEN '${today_date} ${start_time}' AND '${today_date} ${end_time}'
`

*/