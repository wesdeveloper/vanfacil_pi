const config = require('../config/config')
const nodemailer = require('nodemailer')
const helper = require('sendgrid').mail

const indexController = {
	// Route Index
	index: (req, res, next) => {
		res.render('index')
	},
	sendemail: (req, res, next) => {

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
		transporter.sendMail(mailOptions, (err, info) => {
			if(err) {
				console.log(err)
				res.send('erro ao enviar email')
			}
			res.redirect('back')
		})

	},
	solicitaVaga: (req, res, next) => {
		console.log('solicitando vaga')
		// Data about email
		const name = req.body.name
		const email_sender = req.body.email
		const telefone = req.body.telefone
		const localDestino = req.body.localDestino

		let  fromEmail = new helper.Email(email_sender)
		let toEmail = new helper.Email(config.email)
		let subject = 'Send by ' + name
		let content = new helper.Content('text/plain', `O usuário ${name}, que possui o telefone: ${telefone} e email:${email_sender}. Deseja ir para ${localDestino}`)
		let mail = new helper.Mail(fromEmail, subject, toEmail, content)

		let sg = require('sendgrid')('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')

		let request = sg.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mail.toJSON()
		})

		sg.Api(request, (err, response) => {
			if(err) {
				console.warn(err)
				res.send('erro ao enviar email')
			} else {
				console.log(info)
				res.redirect('back')
			}
		})			
	}
}

module.exports = indexController
