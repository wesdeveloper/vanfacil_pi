const mongoose      = require('mongoose')
mongoose.connect('mongodb://vanfacil:vanfacil@ds133192.mlab.com:33192/vanfacil_solicita_vaga')
const Schema        = mongoose.Schema

var EmailSchema    = new Schema({
	name:         String,
	email:  String,
	telefone:  String,
	localDestino:  String,
})

module.exports = mongoose.model('EMAIL', EmailSchema)
