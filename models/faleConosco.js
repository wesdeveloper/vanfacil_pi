const mongoose      = require('mongoose')
mongoose.connect('mongodb://vanfacil:vanfacil@ds133582.mlab.com:33582/vanfacil_fale_conosco')

const Schema        = mongoose.Schema

const FaleConoscoSchema    = new Schema({
	name:   String,
	email:  String,
	message:String,
})

module.exports = mongoose.model('FALECONOSCO', FaleConoscoSchema)
