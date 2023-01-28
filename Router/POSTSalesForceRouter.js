const express = require('express')
const { Customer_Master, Customer_Sites, Invoice_Details, Invoice_Header, Item_Categories, Item_Master, Organization_Master, Price_List, } = require('../Controller/POSTSalesForceController')
const Router = express.Router()

Router.route('/generate/token/send/customer_master').post(Customer_Master)
Router.route('/generate/token/send/customer_sites').post(Customer_Sites)
Router.route('/generate/token/send/invoice_details').post(Invoice_Details)
Router.route('/generate/token/send/invoice_header').post(Invoice_Header)
Router.route('/generate/token/send/item_categories').post(Item_Categories)
Router.route('/generate/token/send/item_master').post(Item_Master)
Router.route('/generate/token/send/organization_master').post(Organization_Master)
Router.route('/generate/token/send/price_list').post(Price_List)


module.exports = Router