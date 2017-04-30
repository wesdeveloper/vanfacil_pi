 const config = require('../config/config');
 const nodemailer = require('nodemailer');

 const indexController = {
	// Route Index
	index: (req, res, next) => {
		res.render('index');
	},
	sendemail: (req, res, next) => {

		// Data about email
		const name = req.body.name;
		const email_sender = req.body.email;
		const message = req.body.message;

		// create transporter
		let transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: config.email,
				pass: config.senha
			}
		});

		// setup email
		let mailOptions = {
			from: email_sender,
			to: config.email,
			subject: 'Send by ' + name,
			html: message
		};

		// send email with defined transport object	
		transporter.sendMail(mailOptions, (err, info) => {
			if(err) {
				res.send('erro ao enviar email');
			}
			res.redirect('back');
		});

	}
}

module.exports = indexController;