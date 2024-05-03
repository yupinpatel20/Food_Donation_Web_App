import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import '../css/personal_Info.css';

const PersonalInfo = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        gender: '',
        accType: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const writeUserData = (userId, userData) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), userData);
    };

    const handleProceed = async (e) => {
        e.preventDefault();
        const user = JSON.parse(window.localStorage.getItem('user'));
        const userData = {
            first_name: formData.firstname,
            last_name: formData.lastname,
            address: formData.address,
            phone: formData.phone,
            gender: formData.gender,
            account_type: formData.accType,
        };

        try {
            writeUserData(user.uid, userData);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="formbold-main-wrapper">
                <h1>Profile Information</h1>
                <div className="formbold-form-wrapper">
                    <form onSubmit={handleProceed}>
                        <div className="formbold-input-flex">
                            <div>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    className="formbold-form-input"
                                    required
                                />
                                <label htmlFor="firstname" className="formbold-form-label">
                                    First name
                                </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    className="formbold-form-input"
                                    required
                                />
                                <label htmlFor="lastname" className="formbold-form-label">
                                    Last name
                                </label>
                            </div>
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Home, Street, area, etc."
                                    className="formbold-form-input"
                                    required
                                />
                                <label htmlFor="address" className="formbold-form-label">
                                    Address
                                </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="XXXX XXXXXXX"
                                    className="formbold-form-input"
                                    required
                                />
                                <label htmlFor="phone" className="formbold-form-label">
                                    Phone Number
                                </label>
                            </div>
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <select
                                    name="gender"
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="formbold-form-input"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unidentified">Prefer Not to say</option>
                                </select>
                                <label htmlFor="gender" className="formbold-form-label">
                                    Gender
                                </label>
                            </div>
                            <div>
                                <select
                                    name="accType"
                                    id="accType"
                                    value={formData.accType}
                                    onChange={handleInputChange}
                                    className="formbold-form-input"
                                    required
                                >
                                    <option value="">Select Account Type</option>
                                    <option value="volunteer">Volunteer</option>
                                    <option value="donor">Donor</option>
                                </select>
                                <label htmlFor="accType" className="formbold-form-label">
                                    Account Type
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="formbold-btn">
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
