import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "../css/login.css";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = formData.email;
        const password = formData.password;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);

                // Store additional user data in Firestore
                const db = getFirestore();
                const userData = {
                    email: user.email,
                    // Add additional fields here
                };
                setDoc(doc(db, "users", user.uid), userData);

                window.localStorage.setItem("user", JSON.stringify(user));
                navigate("/personal-info");
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
                setError(err.message); // Display error message to the user
            });
    };

    const switchToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="loginMain">
            <div className="wrapper">
                <div className="title-text">
                    <div className="title signup">Signup Form</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input
                            type="radio"
                            name="slide"
                            id="login"
                            checked={false}
                            onChange={switchToLogin}
                        />
                        <input
                            type="radio"
                            name="slide"
                            id="signup"
                            checked={true}
                            onChange={() => { }}
                        />
                        <label htmlFor="login" className="slide login">
                            Login
                        </label>
                        <label htmlFor="signup" className="slide signup">
                            Signup
                        </label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form onSubmit={handleSubmit} className="signup">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input
                                    type="submit"
                                    value="Signup"
                                />
                            </div>
                            {error && <div className="error">{error}</div>}
                            <div className="signup-link">
                                Already a member?{" "}
                                <a href="#" onClick={switchToLogin}>
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
