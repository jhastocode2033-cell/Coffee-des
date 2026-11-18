
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <main className="min-h-screen bg-[#f1f0ee]">

            {/* Navbar */}
            <nav className="bg-[#6f4e37] px-6 sm:px-12 py-5 flex items-center justify-between">
                <h1
                    onClick={() => navigate("/")}
                    className="text-white text-xl font-bold cursor-pointer"
                >
                    COFFEA
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-white text-[#6f4e37] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e2d9c8] transition"
                >
                    Logout
                </button>
            </nav>

            {/* Welcome Section */}
            <section className="w-[90%] max-w-6xl mx-auto py-12">

                <div className="mb-10">
                    <p className="text-[#8b735f] text-sm tracking-widest mb-2">
                        YOUR ACCOUNT
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-bold text-[#6f4e37]">
                        Welcome Back!
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Manage your account and enjoy your coffee.
                    </p>
                </div>

                {/* Account Details */}
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <h3 className="text-xl font-semibold text-[#6f4e37] mb-5">
                        Account Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium text-gray-800 break-all">
                                {currentUser?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Account ID</p>
                            <p className="font-medium text-gray-800 break-all">
                                {currentUser?.uid}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Email Verified</p>
                            <p className="font-medium text-gray-800">
                                {currentUser?.emailVerified ? "Yes" : "No"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Actions */}
                <h3 className="text-xl font-semibold text-[#6f4e37] mb-5">
                    Quick Actions
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h4 className="font-semibold text-lg text-[#6f4e37] mb-2">
                            Explore Coffee
                        </h4>
                        <p className="text-gray-500 text-sm mb-5">
                            Browse our hot and cold coffee collection.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#6f4e37] text-white px-5 py-2 rounded-lg hover:bg-[#543a2a] transition"
                        >
                            Browse Coffee
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h4 className="font-semibold text-lg text-[#6f4e37] mb-2">
                            My Orders
                        </h4>
                        <p className="text-gray-500 text-sm mb-5">
                            Your order history will appear here.
                        </p>
                        <button
                            disabled
                            className="bg-gray-300 text-gray-600 px-5 py-2 rounded-lg cursor-not-allowed"
                        >
                            I'll Build this Later
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h4 className="font-semibold text-lg text-[#6f4e37] mb-2">
                            Favourites
                        </h4>
                        <p className="text-gray-500 text-sm mb-5">
                            Keep track of the coffee you love.
                        </p>
                        <button
                            disabled
                            className="bg-gray-300 text-gray-600 px-5 py-2 rounded-lg cursor-not-allowed"
                        >
                            I cant find the Api for this so nah
                        </button>
                    </div>

                </div>

            </section>
        </main>
    );
}
