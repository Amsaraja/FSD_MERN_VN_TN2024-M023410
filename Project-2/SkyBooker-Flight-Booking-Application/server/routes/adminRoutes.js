const express = require('express');
const { Approve, Reject, fetchUser, fetchAllUsers, fetchOperators, updateOperatorStatus } = require('../controllers/adminController');

const router = express.Router();

router.post('/approve-operator', Approve);
router.post('/reject-operator', Reject);
router.get('/fetch-user/:id', fetchUser);
router.get('/fetch-users', fetchAllUsers);
router.get('/operators', fetchOperators);
router.put('/operators/:id/status', updateOperatorStatus);

module.exports = router;