const config = require('../config/config')
const nodemailer = require('nodemailer')

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
			host: "smtp.gmail.com",
			service: 'Gmail',
			port: 587,
			secure: false, // secure:true for port 465, secure:false for port 587
			auth: {
				user: config.email,
				pass: config.senha
			}
		})

		// setup email
		// let mailOptions = {
		// 	to: config.email,
		// 	subject: 'Send by ' + name,
		// 	text: 'Solicitação de vaga',
		// 	html: message
		// }
		
		// send email with defined transport object	
		transporter.sendMail({
			from: `"Van facil" <${config.email}>`,
			to: `"Van facil" <${config.email}>`,
			subject: 'Send by ' + name,
			text: message
		}, (err, info) => {
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
