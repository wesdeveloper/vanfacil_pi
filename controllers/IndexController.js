const EMAIL = require('../models/email')
const FALECONOSCO = require('../models/faleConosco')

const indexController = {
	// Route Index
	index: (req, res) => {
		res.render('index')
	},
	sendemail: (req, res) => {

		// Data about email
		const email = {
			name: req.body.name,
			email_sender: req.body.email,
			message: req.body.message
		}

		const faleConosco = new FALECONOSCO()

		faleConosco.name = email.name
		faleConosco.email = email.email_sender
		faleConosco.message = email.message

		faleConosco.save((err) => err ? res.send('erro ao enviar email') : res.redirect('back'))
	},
	solicitaVaga: (req, res) => {
		console.log('solicitando vaga')
		// Data about email
		const email = {
			name: req.body.name,
			email_sender: req.body.email,
			telefone: req.body.telefone,
			localDestino: req.body.localDestino
		}

		let createEmail = new EMAIL()

		createEmail.name = email.name
		createEmail.email = email.email_sender
		createEmail.telefone = email.telefone
		createEmail.localDestino = email.localDestino

		createEmail.save((err) => err ? res.send(err) : res.redirect('back'))

	}
}

module.exports = indexController
