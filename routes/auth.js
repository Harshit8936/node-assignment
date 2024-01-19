const router = require('express').Router();
const userController = require('../controllers/userController')
const fetchUser = require('../middleware/fetchUser')

router.post('/signup',userController.createUser);
router.post('/signin',userController.signInUser);
router.post('/loggedUser/details',fetchUser,userController.loggedUser);
router.get('/',userController.home);
router.get('/newuser',userController.signUp);
router.get('/loginuser',userController.signIn);


module.exports = router;