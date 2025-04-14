import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY || '',
    process.env.MAILJET_API_SECRET || ''
);

export async function POST(req: Request) {
    const body = await req.json();
    const { toEmail, name, variables } = body;

    try {
        const result = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'fabio.jorge@big-emotion.com',
                        Name: 'My First Mailing',
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
                    Variables: variables || {}, // Si tu veux passer des {{ name }}, etc.
                },
            ],
        });

        return NextResponse.json({ success: true, data: result.body });
    } catch (error) {
        console.error('Erreur d’envoi :', error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
