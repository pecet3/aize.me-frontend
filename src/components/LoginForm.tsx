"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setTimeout(() => (
                router.push("/dashboard")
            ), 300)
        } else {
        }

    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 text-black rounded shadow-md w-96">
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-black
                         border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                Login
            </button>
            <Link href="/auth/register" className="text-center flex m-auto justify-center text-blue-800">
                Register
            </Link>
        </form>
    );
}