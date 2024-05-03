import { getDatabase, ref, onValue } from 'firebase/database';

export const getRoleCounts = (callback) => {
    try {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        onValue(usersRef, (snapshot) => {
            const userData = snapshot.val();

            let volunteerCount = 0;
            let donorCount = 0;
            let recipientCount = 0;

            if (userData) {
                Object.values(userData).forEach((user) => {
                    const role = user.account_type || ''; 
                    if (role.toLowerCase() === 'volunteer') {
                        volunteerCount++;
                    } else if (role.toLowerCase() === 'donor') {
                        donorCount++;
                    } else if (role.toLowerCase() === 'recipient') {
                        recipientCount++;
                    }
                });
            }

            console.log('Volunteer Count:', volunteerCount);
            console.log('Donor Count:', donorCount);
            console.log('Recipient Count:', recipientCount);

            const countsArray = [volunteerCount, donorCount, recipientCount];

            console.log('Counts Array:', countsArray);
            if (typeof callback === 'function') {
                callback(countsArray);
            }
        });
    } catch (error) {
        console.error('Error fetching role counts:', error);
    }
};
