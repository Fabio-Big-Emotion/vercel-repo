import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

console.log('🔐 MJ_APIKEY_PUBLIC (MAILJET_API_KEY) :', process.env.MAILJET_API_KEY?.slice(0, 4) + '...');

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY || '',
    process.env.MAILJET_API_SECRET || ''
);

export async function POST(req: Request) {
    const body = await req.json();
    const { toEmail, name, variables } = body;

    console.log('📩 Email reçu pour envoi :', toEmail);
    console.log('👤 Nom du destinataire :', name);
    console.log('📦 Variables de template :', variables);

    try {
        const result = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: "nexusgang666@gmail.com",
                        Name: "Fabio Test"
                    },
                    To: [
                        {
                            Email: toEmail,
                            Name: name,
                        },
                    ],
                    TemplateID: 6900186,
                    TemplateLanguage: true,
                    Subject: 'My First Mailing',
                    Variables: variables || {},
                },
            ],
        });

        console.log('✅ Mailjet a répondu :', result.body);
        return NextResponse.json({ success: true, data: result.body });

    } catch (error) {
        console.error('❌ Erreur d’envoi Mailjet :', error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
