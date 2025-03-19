import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        // 📌 Leer el JSON enviado por el formulario
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        const resend = new Resend("re_HaGfZ28A_2efxsV3grnc2BH6dnUCB42gf");

        await resend.emails.send({
            from: 'onboarding@resend.dev', // Debes verificar este dominio en Resend
            to: 'nicolas981112@gmail.com', // Cambia esto al correo donde recibirás los leads
            subject: `Nuevo lead de ${firstName} ${lastName}`,
            text: `Nombre: ${firstName} ${lastName}\nCorreo: ${email}\nMensaje: ${message}`
        });

        return res.status(200).json({ message: 'Correo enviado exitosamente' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error enviando el correo', error });
    }
}
