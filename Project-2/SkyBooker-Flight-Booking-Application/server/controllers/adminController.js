const User = require('../models/User');

const Approve = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.approval = 'approved';
    await user.save();

    res.json({ message: 'Flight operator approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const Reject = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.approval = 'rejected';
    await user.save();

    res.json({ message: 'Flight operator rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
};

const fetchOperators = async (req, res) => {
  try {
    const operators = await User.find({ usertype: 'flight-operator' });
    res.json(operators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching operators' });
  }
};

const updateOperatorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const operator = await User.findById(id);
    if (!operator) {
      return res.status(404).json({ message: 'Operator not found' });
    }
    
    if (operator.usertype !== 'flight-operator') {
      return res.status(400).json({ message: 'User is not an operator' });
    }
    
    operator.status = status;
    await operator.save();
    
    res.json({ message: 'Operator status updated successfully', operator });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { Approve, Reject, fetchUser, fetchAllUsers, fetchOperators, updateOperatorStatus };