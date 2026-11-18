
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { signUp } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        try {
            await signUp(email, password);
            navigate("/");
        } catch (error) {
            setError("Could not create account. Check your details and try again.");
            console.error(error);
        }
    }

    return (
        <main className="min-h-screen bg-[#f1f0ee] flex items-center justify-center px-5 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#6f4e37]">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Join us and enjoy your favourite coffee.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-[#e2d9c8] rounded-lg p-3 outline-none focus:border-[#6f4e37] focus:ring-1 focus:ring-[#6f4e37]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full border border-[#e2d9c8] rounded-lg p-3 outline-none focus:border-[#6f4e37] focus:ring-1 focus:ring-[#6f4e37]"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#6f4e37] hover:bg-[#543a2a] text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#6f4e37] font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>

                <Link to="/" className="block text-center text-sm text-gray-500 mt-5 hover:text-[#6f4e37]">
                    ← Back to Home
                </Link>

            </div>
        </main>
    );
}
