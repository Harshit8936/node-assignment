const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const fetchUser = require('../middleware/fetchUser')

router.post('/amountcredited',fetchUser,paymentController.creditAmount);
router.post('/amounttransfer',fetchUser,paymentController.transferAmount);
router.get('/paymenthistory',fetchUser,paymentController.getTranscationHistory);
router.get('/new/transfer',fetchUser,paymentController.getpaymentpage);



module.exports = router;