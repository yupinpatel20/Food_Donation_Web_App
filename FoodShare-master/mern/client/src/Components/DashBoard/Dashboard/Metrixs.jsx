import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const Metrics = () => {

    const [volunteers, setVolunteers] = useState(0);
    const [beneficiaries, setBeneficiaries] = useState(0);
    const [quantitySum, setQuantitySum] = useState(0);
    const [weightSum, setWeightSum] = useState(0);

    useEffect(() => {
        const db = getDatabase();
        const requestsRef = ref(db, 'donationRequests');
        const usersRef = ref(db, 'users');

        onValue(requestsRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            if (data) {
                const totalQuantity = Object.values(data).reduce((sum, request) => sum + (parseFloat(request.foodQuantity) || 0), 0);
                const totalWeight = Object.values(data).reduce((sum, request) => sum + (parseFloat(request.foodWeight) || 0), 0);

                setQuantitySum(totalQuantity);
                setWeightSum(totalWeight);
            }
        });

        onValue(usersRef, (snapshot) => {
            const usersData = snapshot.val();
            console.log(usersData);

            if (usersData) {
                const totalVolunteers = Object.values(usersData).filter(user => user.account_type === 'volunteer').length;
                const totalBeneficiaries = Object.values(usersData).filter(user => user.account_type === 'donor').length;

                setVolunteers(totalVolunteers);
                setBeneficiaries(totalBeneficiaries);
            }
        });
    }, []);


    return (
        <div>
            <div className="row mb-3 flex justify-center">
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                            <div className="rotate">
                                <i className="fa fa-apple-alt fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Food Items Donated</h6>
                            <h1 className="display-4">{quantitySum + "+"}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body bg-danger">
                            <div className="rotate">
                                <i className="fa fa-cutlery fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Meals Provided</h6>
                            <h1 className="display-4">{weightSum + " Kg"}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-info h-100">
                        <div className="card-body bg-info">
                            <div className="rotate">
                                <i className="fa fa-hands-helping fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Volunteers</h6>
                            <h1 className="display-4">{volunteers + "+"}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fa fa-users fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Donors</h6>
                            <h1 className="display-4">{beneficiaries + "+"}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Metrics;
