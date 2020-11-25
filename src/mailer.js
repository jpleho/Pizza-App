const nodemailer = require("nodemailer");

const noReplyMail = "no-reply@pizza.d1gital.net";

const transporter = nodemailer.createTransport({
    host: "smtp.stackmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: noReplyMail,
        pass: "Yd6fad416",
    },
});

const sendMail = ({ body, res }) => {
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);

            return;
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const { restaurant, user, data } = body;

    console.log(body);

    Promise.all([
        // Send mail to user
        transporter.sendMail({
            from: `"${restaurant}" <${noReplyMail}>`,
            to: "biscan.karlo@gmail.com",
            subject: `Your Order from ${restaurant} is coming!`,
            html: `
                <p>Thank you for ordering!</p>
                <p>Your order will arrive in: 42min</p>
                <p>Here are your order details:</p>
                <ul>
                ${data.map(item => `
                    <li>
                        <strong>${item.name} - ${item.price}<strong>
                        <p>${item.toppings.map(topping => `
                            ${topping.name}
                        `)}</p>
                    </li>
                `)}
                </ul>
                <br>
                <p>Kind regards.</p>
            `
        }),
        // Send mail back to office
        transporter.sendMail({
            from: `"${restaurant}" <${noReplyMail}>`,
            to: `"${user.name}" <biscan.karlo@gmail.com>`,
            // to: `"Pizza shop" <jan.pleho@gmail.com>`,
            subject: `Order by ${user.name}`,
            html: `
                <p>Name: <strong>${user.name}</strong></p>
                <p>Address: <strong>${user.address}</strong></p>
                <p>Phone: <strong>${user.phone}</strong></p>
                <p>Order:</p>
                <ul>
                ${data.map(item => `
                    <li>
                        <strong>${item.name} - ${item.price}<strong>
                        <p>${item.toppings.map(topping => `
                            ${topping.name}
                        `)}</p>
                    </li>
                `)}
                </ul>
            `
        })
    ])
        .then(() => res.status(200).end('Email sent'))
        .catch(() => res.status(500).end('Error sending email'))
};

module.exports = sendMail;
