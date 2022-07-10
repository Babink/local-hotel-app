import express from 'express';
import { CustomerController } from '../controller/customer'
import { CustomerE } from './enum/customer'

export default express.Router()
.get('/' + CustomerE.plural, new CustomerController().getAllCustomers)
.get('/', new CustomerController().getACustomer)
.post('/add', new CustomerController().addCustomer)

