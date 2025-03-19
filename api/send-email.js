import nodemailer from 'nodemailer';

export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { name, email, message } = req.body;

    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Puedes usar otro servicio SMTP si no usas Gmail
        auth: {
            user: 'nicolas981112@gmail.com', // Cambia esto por tu correo
            pass: 'nbomE.@121010242768' // Usa variables de entorno en producción
        }
    });

    const mailOptions = {
        from: email,
        to: 'nicolas981112@gmail.com', // Cambia esto al correo de la empresa
        subject: `Nuevo lead de ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error enviando el correo', error });
    }
}
