const mongoose = require('mongoose')

const Schema = mongoose.Schema

const electricSchema = new Schema(
  {
    fecha: {type: String},
    hora: {type: Number},
    consumo: {type: Number},
    precio: {type: String},
    coste: {type: String}
}, { versionKey: false})


const Electric = mongoose.model('Electric', electricSchema) 

module.exports = Electric

