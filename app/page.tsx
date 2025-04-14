'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubscribe = async () => {
        setStatus('Inscription en cours...');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus(data.message);
            } else {
                setStatus(`Erreur : ${data.error || '❌'}`);
            }
        } catch (err) {
            setStatus(`Erreur : ${err}`);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Inscription à la newsletter</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleSubscribe} className="bg-blue-600 text-white px-4 py-2 rounded">
                S’inscrire
            </button>
            {status && <p className="mt-4">{status}</p>}
        </div>
    );
}
