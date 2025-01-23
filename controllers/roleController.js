const adminDashboard = (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
};

const customerServiceDashboard = (req, res) => {
    res.status(200).json({ message: 'Welcome to the customer service dashboard' });
};

const customerDashboard = (req, res) => {
    res.status(200).json({ message: 'Welcome to the customer dashboard' });
};

const managerDashboard = (req, res) => {
    res.status(200).json({ message: 'Welcome to the manager dashboard' });
};

module.exports = { adminDashboard, customerServiceDashboard, customerDashboard ,managerDashboard};
