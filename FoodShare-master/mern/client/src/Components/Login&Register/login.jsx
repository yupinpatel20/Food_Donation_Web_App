import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../config/firebase-config"; // Import Firebase configuration
import "../css/login.css";

// Initialize Firebase
const auth = getAuth();

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = formData.email;
        const password = formData.password;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                // Store user data in local storage
                window.localStorage.setItem("user", JSON.stringify(user));
                // Navigate to the dashboard page
                navigate("/dashboard");
            })
            .catch((error) => {
                // Handle errors
                setError("An error occurred while signing in");
                console.error("Error signing in:", error);
            });
    };

    const switchToSignup = () => {
        navigate("/register");
    };

    return (
        <div className="loginMain">
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login">Login Form</div>
                </div>
                <div className="form-container">
                    <div className="form-inner">
                        <form onSubmit={handleSubmit} className="login">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                            {error && <div className="error">{error}</div>}
                            <div className="signup-link">
                                Not a member?{" "}
                                <Link to="/register">Signup now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
