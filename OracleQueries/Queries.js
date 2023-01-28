const { checkSchedulerEngine } = require('../Scheduler/SchedulerEngine')
const arr_value = [...checkSchedulerEngine()]
const start_time = arr_value[0]
const end_time = arr_value[1]
const today_date = arr_value[2]

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
and ROWNUM <= 1
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
and ROWNUM <= 1
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
    AWL_COPS.COPS_INVOICE_DETAILS
    WHERE ROWNUM <= 1
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
    and ROWNUM <= 1
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
     ROWNUM <= 1
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
where ROWNUM <= 2
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
WHERE ROWNUM <= 1
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
and ROWNUM <= 1

`
exports.COPS_ADJUSTMENT = `
SELECT * FROM awl_sf.AWLSF_ADJUSTMENT WHERE ROWNUM <= 1
`
exports.COPS_SALES_INDENT_HEADERS = `
SELECT * FROM awl_sf.AWLSF_SALES_INDENT_HEADERS WHERE ROWNUM <= 1
`
exports.COPS_SALES_INDENT_LINES = `
SELECT * FROM awl_sf.AWLSF_ADJUSTMENT WHERE ROWNUM <= 1
`

