"use client"

import { useState } from 'react';

export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isSuccess, setIsSuccess] = useState(false)
    const [mailboxName, setMailboxName] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMailboxName(getMailboxName(formData.email))
                setIsSuccess(true)
            } else {

            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const getMailProvider = (email: string) => {
        const domain = email.split('@')[1];
        switch (domain) {
            case 'gmail.com':
                return 'https://mail.google.com';
            case 'yahoo.com':
                return 'https://mail.yahoo.com';
            case 'outlook.com':
            case 'hotmail.com':
                return 'https://outlook.com';
            default:
                return 'https://mail.' + domain;
        }
    };

    const getMailboxName = (email: string) => {
        const domain = email.split('@')[1];
        switch (domain) {
            case 'gmail.com':
                return 'Gmail';
            case 'yahoo.com':
                return 'Yahoo Mail';
            case 'outlook.com':
                return 'Outlook';
            case 'hotmail.com':
                return 'Hotmail';
            default:
                return domain;
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen text-black">
            {isSuccess
                ? <p className='text-xl text-white text-center'>Registration successful.
                    <br></br>Please check your mailbox to activate your profile.<br></br>
                    <a href={getMailProvider(formData.email)} target="_blank" rel="noopener noreferrer" className='underline font-bold'>Go to {mailboxName}</a>
                </p>
                : <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  text-black
                rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Register
                    </button>
                </form>}
        </div>
    );
}