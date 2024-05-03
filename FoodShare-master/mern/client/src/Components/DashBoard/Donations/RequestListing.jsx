import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DonationHeader from "./DonationHeader";
import Footer from '../../Footer/footer';
import '../../css/RequestForm.css';
import "../../css/donationHeader.css";
import firebaseApp from '../../../config/firebase-config';

const RequestListing = ({ dashboardView, handleLocationClick }) => {
    const [showForm, setShowForm] = useState(false);
    const [userName, setUserName] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        expirationDate: '',
        foodType: '',
        foodQuantity: '',
        foodWeight: '',
        pickupDateTime: '',
    });
    const [tableData, setTableData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const requestsRef = ref(db, 'donationRequests');

        // Fetch data from Firebase on component mount
        onValue(requestsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const requestsArray = Object.entries(data).map(([requestId, requestData]) => ({
                    requestId,
                    ...requestData
                }));

                // Apply filter based on status
                const filteredRequests = requestsArray.filter(request => request.status !== "received");

                console.log("Filtered Requests:", filteredRequests);

                setTableData(dashboardView ? filteredRequests.slice(-5) : requestsArray);
            }
        });
    }, [dashboardView]);

    useEffect(() => {
        // Listen for changes in authentication state
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();
                    console.log(userData);
                    if (userData && userData.account_type) {
                        setUserRole(userData.account_type);
                        setUserName(capitalizeFirstLetter(userData.first_name));
                    }

                    // Store user data in Firebase if it doesn't exist
                    const userDataRef = ref(db, `users/${user.uid}`);
                    set(userDataRef, {
                        uid: user.uid,
                        email: user.email,
                        // Add other user data you want to store
                    });
                });
            } else {
                setUserId(null);
                setUserRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getStatusButtonText = (status) => {
        console.log(status);
        switch (status) {
            case "pending":
                return "Pending";
            case "received":
                return "Received";
            case "deliver":
                return "To Deliver";
            default:
                return "Unknown Status";
        }
    };

    const handleAccept = (requestId) => {
        if (userRole === "volunteer") {
            const db = getDatabase();
            const requestRef = ref(db, `donationRequests/${requestId}`);

            set(requestRef, {
                ...tableData.find(data => data.requestId === requestId),
                status: "pending",
                deliveredBy: userId, // Save the user ID of the volunteer who accepted
            })
                .then(() => {
                    const updatedTableData = tableData.map((data) => {
                        if (data.requestId === requestId) {
                            return { ...data, status: "pending", deliveredBy: userId };
                        }
                        return data;
                    });

                    setTableData(updatedTableData);
                })
                .catch((error) => {
                    console.error("Error updating status:", error);
                });
        }
    };

    const handlePending = (requestId, status) => {
        console.log('handlePending function called');
        if (userRole === "recipient" && status === "pending") {
            const db = getDatabase();
            const requestRef = ref(db, `donationRequests/${requestId}`);

            // Update the status to "received" in the database
            set(requestRef, {
                ...tableData.find(data => data.requestId === requestId),
                status: "received",
                receivedBy: userId, // Save the user ID of the recipient
            })
                .then(() => {
                    // Remove the item from the local state only if it is a dashboard view
                    if (dashboardView) {
                        const updatedTableData = tableData.filter((data) => data.requestId !== requestId);
                        setTableData(updatedTableData);
                    }

                    alert("Delivery received! Status updated to received.");
                })
                .catch((error) => {
                    console.error("Error updating status:", error);
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const db = getDatabase();
        const requestsRef = ref(db, 'donationRequests');

        // Add the new data to the 'requests' node in Firebase
        const newRequestRef = push(requestsRef);
        const currentTime = new Date();
        set(newRequestRef, {
            ...formData,
            userId: userId,
            userRole: userRole,
            donatedBy: userId,
            deliveredBy: "",
            receivedBy: "",
            status: "deliver",
            time: currentTime.toISOString(),
        });

        // Reset the form data and hide the form
        setFormData({
            title: '',
            description: '',
            expirationDate: '',
            foodType: '',
            foodQuantity: '',
            foodWeight: '',
            pickupDateTime: '',
        });
        setShowForm(false);
    };

    const columnsForDashboard = [
        'title',
        'description',
        'foodType',
        'pickupDateTime',
    ];

    const columnsForDonationsPage = [
        'title',
        'description',
        'expirationDate',
        'foodQuantity',
        'foodWeight',
        'pickupDateTime',
    ];

    const displayedColumns = dashboardView ? columnsForDashboard : columnsForDonationsPage;

    return (
        <div className="container-fluid pb-3">
            <div className="row">
                {!dashboardView && <DonationHeader />}
                <div className={'col-md-12 pt-3'}>
                    {dashboardView && (
                        <h5 className="title mb-3 text-secondary" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Donation Requests
                            {userRole === "donor" && (
                                <button
                                    className="btn btn-primary mb-3 mt-3"
                                    onClick={() => setShowForm(true)}
                                >
                                    Donate
                                </button>
                            )}
                        </h5>
                    )}
                    {showForm && (
                        <div className="form-popup">
                            <div className="form-container">
                                <form className="row g-3" onSubmit={handleFormSubmit}>
                                    <div className="col-md-6">
                                        <label htmlFor="inputTitle" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter a title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className='form-control'
                                        />
                                        <label htmlFor="inputExpirationDate" className="form-label mb-1 mt-2">Expiration Date</label>
                                        <input
                                            type="date"
                                            name="expirationDate"
                                            value={formData.expirationDate}
                                            onChange={handleInputChange}
                                            className='form-control'
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputDescription" className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            placeholder="Describe the donation"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={7}
                                            className='form-control'
                                        ></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputQuantity" className="form-label ">Quantity</label>
                                        <input
                                            type="text"
                                            name="foodQuantity"
                                            placeholder="Enter quantity"
                                            value={formData.foodQuantity}
                                            onChange={handleInputChange}
                                            className='form-control'
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputWeight" className="form-label">Weight</label>
                                        <input
                                            type="text"
                                            name="foodWeight"
                                            placeholder="Enter weight in kg"
                                            value={formData.foodWeight}
                                            onChange={handleInputChange}
                                            className='form-control'
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputTime" className="form-label">Pickup Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            name="pickupDateTime"
                                            value={formData.pickupDateTime}
                                            onChange={handleInputChange}
                                            className='form-control'
                                            required
                                        />
                                    </div>
                                    {/* Button */}
                                    <div className="col-6">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div >
                    )}
                    <div className="table-responsive " >
                        <table className="table table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>S.No</th>
                                    {displayedColumns.map((column, index) => (
                                        <th key={index}>
                                            {capitalizeFirstLetter(column)}
                                        </th>
                                    ))}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {tableData?.map((data, index) => (
                                    <tr key={index}>
                                        <td style={{ width: "50px" }}>{index + 1}</td>
                                        {displayedColumns.map((column, columnIndex) => (
                                            <td key={columnIndex} style={{ width: "216px" }}>
                                                {data[column]}
                                            </td>
                                        ))}
                                        <td style={{ width: "216px" }}>
                                            {userRole === "volunteer" && (
                                                <div className="btn-group" role="group">
                                                    <button
                                                        type="button"
                                                        className={`btn ${data.status === "pending" ? "btn-warning" : "btn-primary"}`}
                                                        onClick={() => handleAccept(data.requestId)}
                                                        disabled={data.status === "pending"}
                                                    >
                                                        {getStatusButtonText(data.status)}
                                                    </button>
                                                </div>
                                            )}
                                            {userRole === "recipient" && (
                                                <div className="btn-group" role="group">
                                                    {console.log('Button rendering')}
                                                    <button
                                                        type="button"
                                                        className={`btn ${data.status === "pending"
                                                            ? "btn-warning"
                                                            : data.status === "deliver"
                                                                ? "btn-primary"
                                                                : data.status === "received"
                                                                    ? "btn-success"
                                                                    : ""
                                                            }`}
                                                        onClick={() => handlePending(data.requestId, data.status)}
                                                    >
                                                        {getStatusButtonText(data.status)}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >
                {!dashboardView && <Footer />}
            </div>
        </div>
    );
};

export default RequestListing;
