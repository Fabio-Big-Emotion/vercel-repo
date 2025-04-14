'use client';

import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const handleSend = async () => {
        setStatus('Envoi en cours...');
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toEmail: email,
                    name,
                    variables: {
                        name,
                        code: 'ABC123'
                    }
                }),
            });

            if (response.ok) {
                setStatus('✅ Email envoyé avec succès !');
            } else {
                const error = await response.json();
                setStatus(`❌ Erreur : ${error.message || 'inconnue'}`);
            }
        } catch (err) {
            setStatus(`❌ Erreur : ${err}`);
        }
    };

    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Test d’envoi d’email Mailjet</h1>
            <input
                type="email"
                placeholder="Email du destinataire"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                type="text"
                placeholder="Nom du destinataire"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Envoyer l’email
            </button>
            {status && <p className="mt-4">{status}</p>}
        </main>
    );
}
