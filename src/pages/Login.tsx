
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from =
        (location.state as { from?: string } | null)?.from ?? "/";

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            setError("Invalid email or password. Please try again.");
            console.error(error);
        }
    }

    return (
        <main className="min-h-screen bg-[#f1f0ee] flex items-center justify-center px-5 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#6f4e37]">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Sign in to continue enjoying your coffee.
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                        Sign In
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#6f4e37] font-semibold hover:underline">
                        Create Account
                    </Link>
                </p>

                <Link to="/" className="block text-center text-sm text-gray-500 mt-5 hover:text-[#6f4e37]">
                    ← Back to Home
                </Link>

            </div>
        </main>
    );
}
