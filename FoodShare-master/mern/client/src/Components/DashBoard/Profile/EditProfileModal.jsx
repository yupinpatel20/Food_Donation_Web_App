import React, { useState } from 'react';

const EditProfileForm = ({ userInfo, onCancel, onSubmit }) => {
    const [editedUserInfo, setEditedUserInfo] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userRole: userInfo.userRole,
        phone: userInfo.phone,
        address: userInfo.address,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedUserInfo);
    };

    return (
        <div className="form-popup">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={editedUserInfo.firstName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={editedUserInfo.lastName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userRole" className="form-label">Account Type</label>
                        <input
                            type="text"
                            id="userRole"
                            name="userRole"
                            value={editedUserInfo.userRole}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={editedUserInfo.phone}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={editedUserInfo.address}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-12" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="col-5">
                            <button type="submit" className="btn btn-primary me-2">Save</button>
                        </div>
                        <div className="col-5">
                            <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;
