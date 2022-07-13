import { Router } from 'express'
import Controller from '../controllers/userController'
import jwtChecker from '../middlewares/jwtChecker'
import { UserValidator } from '../middlewares/validators'

const router = Router()

router.post('/register', UserValidator.checkRegister(), Controller.registerUser)
router.post('/login', UserValidator.checkLogin(), Controller.loginUser)
router.get('/getInfo', jwtChecker, Controller.getUserInformation)
router.put(
  '/edit',
  jwtChecker,
  UserValidator.checkEditUser(),
  Controller.editUser
)
router.delete('/delete', jwtChecker, Controller.deleteUser)
router.put(
  '/changePassword',
  jwtChecker,
  UserValidator.checkChangePassword(),
  Controller.changePasswordUser
)
router.get('/refreshToken', jwtChecker, Controller.refreshToken)
router.post('/loginAdmin', UserValidator.checkLogin(), Controller.loginAdmin)

export default router
