const config = require('../config/config')
const nodemailer = require('nodemailer')

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
				user: 'process.env.CRAWLER_MAIL',
				pass: 'process.env.CRAWLER_PWD'
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

		const message = `O usuário ${name}, que possui o telefone: ${telefone} e email:${email_sender}. Deseja ir para ${localDestino}`

		// create transporter
		let transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'process.env.CRAWLER_MAIL',
				pass: 'process.env.CRAWLER_PWD'
			}
		})

		// setup email
		let mailOptions = {
			to: 'process.env.CRAWLER_MAIL',
			subject: 'Send by ' + name,
			text: 'Solicitação de vaga',
			html: message
		}
		
		// send email with defined transport object	
		transporter.sendMail(mailOptions, (err, info) => {
			if(err) {
				console.warn(err)
				res.send('erro ao enviar email')
			} else {
				console.log(info)
				transporter.close()
				res.redirect('back')
			}
			
		})
	}
}

module.exports = indexController
