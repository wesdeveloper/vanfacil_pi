const config = require('../config/config')
const nodemailer = require('nodemailer')
const EMAIL = require('../models/email')

const indexController = {
	// Route Index
	index: (req, res) => {
		res.render('index')
	},
	sendemail: (req, res) => {

		// Data about email
		const name = req.body.name
		const email_sender = req.body.email
		const message = req.body.message

		// create transporter
		let transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: config.email,
				pass: config.senha
			}
		})

		// setup email
		let mailOptions = {
			from: email_sender,
			to: config.email,
			subject: 'Send by ' + name,
			html: message
		}

		// send email with defined transport object	
		transporter.sendMail(mailOptions, (err) => {
			if(err) {
				console.log(err)
				res.send('erro ao enviar email')
			}
			res.redirect('back')
		})

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
