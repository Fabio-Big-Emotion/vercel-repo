// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { email } = body;

    const res = await fetch('https://api.mailjet.com/v3/REST/contactslist/10531826/managecontact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Basic ' +
                Buffer.from(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_API_SECRET}`).toString('base64'),
        },
        body: JSON.stringify({
            Email: email,
            Action: 'addnoforce',
        }),
    });

    if (res.ok) {
        return NextResponse.json({ success: true, message: 'Inscription réussie ✅' });
    } else {
        const text = await res.text(); // on parse le texte brut si JSON fail
        console.error('Erreur Mailjet newsletter ❌ :', text);
        return NextResponse.json({ success: false, error: text }, { status: 500 });
    }
}
