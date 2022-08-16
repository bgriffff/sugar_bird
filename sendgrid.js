const sendgrid = require('@sendgrid/mail');

    const SENDGRID_API_KEY = "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"

    sendgrid.setApiKey(SENDGRID_API_KEY)

    const msg = {
       to: 'allison.griffiths00@gmail.com',
     // Change to your recipient
       from: 'brandonjosephgriffiths@gmail.com',
     // Change to your verified sender
       subject: 'Sending with SendGrid Is Fun',
       text: 'and easy to do anywhere, even with Node.js',
       html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sendgrid
       .send(msg)
       .then((resp) => {
         console.log('Email sent\n', resp)
       })
       .catch((error) => {
         console.error(error)
     })