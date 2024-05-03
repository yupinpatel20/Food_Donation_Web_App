import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import '../css/personal_Info.css';

export default function PersonalInfo() {
    const navigate = useNavigate();

    function writeUserData(userId, f_name, l_name, address, phone, gender, accType) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            user_id: userId,
            first_name: f_name,
            last_name: l_name,
            location: address,
            phone: phone,
            gender: gender,
            account_type: accType,
        });
    }

    const handleProceed = async (e) => {
        e.preventDefault();
        const user = JSON.parse(window.localStorage.getItem('user'));
        console.log(user);
        const formData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value,
            accType: document.getElementById('accType').value,
        };
        console.log(formData);
        try {
            writeUserData(
                user.uid,
                formData.firstname,
                formData.lastname,
                formData.address,
                formData.phone,
                formData.gender,
                formData.accType,
            );
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
                    <form action="#" method="POST" onSubmit={handleProceed}>
                        <div className="formbold-input-flex">
                            <div>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    className="formbold-form-input"
                                />
                                <label htmlFor="firstname" className="formbold-form-label"> First name </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    className="formbold-form-input"
                                />
                                <label htmlFor="lastname" className="formbold-form-label"> Last name </label>
                            </div>
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Home, Street, area, etc."
                                    className="formbold-form-input"
                                />
                                <label htmlFor="address" className="formbold-form-label"> Address </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="XXXX XXXXXXX"
                                    className="formbold-form-input"
                                />
                                <label htmlFor="phone" className="formbold-form-label"> Phone Number </label>
                            </div>
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <select id="gender" className="formbold-form-input">
                                    <option value="Select Gender">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unidentified">Prefer Not to say</option>
                                </select>
                                <label htmlFor="gender" className="formbold-form-label"> Gender </label>
                            </div>
                            <div>
                                <select id="accType" className="formbold-form-input">
                                    <option value="Select Account Type">Select Account Type</option>
                                    <option value="volunteer">Volunteer</option>
                                    <option value="donor">Donor</option>
                                    <option value="recipient">Recipient</option>
                                </select>
                                <label htmlFor="accType" className="formbold-form-label"> Account Type </label>
                            </div>
                        </div>

                        <button type="submit" className="formbold-btn">Proceed</button>
                    </form>
                </div>
            </div>
        </>
    )
}
