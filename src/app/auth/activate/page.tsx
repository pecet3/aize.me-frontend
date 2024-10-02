"use client"

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const activateAccount = async () => {
            const id = searchParams.get('code');
            if (id) {
                const response = await fetch(`/api/v1/auth/activate/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    setTimeout(() => (
                        router.push('/auth/login')
                    ), 500)
                }
            }
        };
        activateAccount();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Activating an account...</p>
        </div>
    );
}