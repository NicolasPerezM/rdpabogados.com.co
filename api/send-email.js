import nodemailer from 'nodemailer';

export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    // 📌 Recibe los datos del formulario
    const { firstName, lastName, email, message } = req.body;

    // 📌 Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Puedes usar otro servicio SMTP si lo deseas
        auth: {
            user:  "nicolas981112@gmail.com", // Usa variables de entorno para seguridad
            pass: "nbomE.@121010242768"
        }
    });

    // 📌 Configuración del correo
    const mailOptions = {
        from: email,
        to: 'nicolas981112@gmail.com', // Cambia esto por el correo donde recibirás los leads
        subject: `Nuevo lead de ${firstName} ${lastName}`,
        text: `Nombre: ${firstName} ${lastName}\nCorreo: ${email}\nMensaje: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error enviando el correo', error });
    }
}
