import express from 'express';
import { OwnerE } from './enum/owner'
import { OwnerController } from '../controller/owner'

export default express.Router()
.get('/' + OwnerE.plural, new OwnerController().getAllOwner)
.get('/', new OwnerController().getAOwner)
.post('/' + OwnerE.post , new OwnerController().addOwner)
.post('/' + OwnerE.loginOwner, new OwnerController().loginUser)
.delete('/' + OwnerE.delete, new OwnerController().deleteOwner)
.patch('/' + OwnerE.patch, new OwnerController().updateOwner)
