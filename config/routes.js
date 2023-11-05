const express = require('express')
const router = express.Router()
const userImgHandler = require('./userImgHandler')
const authorization = require('../app/services/middleware/userRole')
const { main, userCtrl, loginCtrl, courses, emailCtrl, passwordCtrl, moduleCtrl, assignmentCtrl } = require('../app/controllers/index')

//Login
router.post('/login', loginCtrl.loginHandle)

//User routes
router.get('/user', userCtrl.listUserHandle)
router.get('/user/:id', userCtrl.findUserByIdHandle)
router.post('/user/create/',
    authorization.authorizeAdmin,
    userCtrl.createUserHandle)
router.put('/user/update/:id',
    authorization.authorizeAll, 
    userImgHandler, userCtrl.updateUserHandle)
router.delete('/user/delete/:id', userCtrl.deleteUserHandle)

//User verify email
router.post('/send-verify/:id',
    authorization.authorizeAll,
    emailCtrl.sendEmailVerifyHandle)
router.post('/email-verify/:token_email_verify',
    authorization.authorizeAll,
    emailCtrl.emailVerifyHandle)

//User password handle
router.post('/send-forgot-password', passwordCtrl.sendForgotPasswordHandle)
router.post('/reset-password/:token_reset_password', passwordCtrl.resetPasswordHandle)
router.post('/change-password/:id',
    authorization.authorizeAll,
    passwordCtrl.changePasswordHandle)

//courses routes
// router.get('/course/:id', courses.getCourses)
// router.post('/course', courses.createCourse)
// router.put('/course/:id', courses.updateCourse)
// router.delete('/course/:id', courses.deleteCourse)

// module routes
router.get('/course/:courseId/module/', moduleCtrl.getAllModules)
router.get('/course/:courseId/module/:moduleId', moduleCtrl.getModuleDetail)
router.post('/course/:courseId/module', moduleCtrl.createNewModule)

// assignment routes
router.get('/module/:moduleId/assignment', assignmentCtrl.getAllAssignments)
router.get('/module/:moduleId/assignment/:assignmentId', assignmentCtrl.getAssignmentDetail)
router.post('/module/:moduleId/assignment', assignmentCtrl.createNewAssignment)

//api error handler
router.get('/', main.onUp)
router.use(main.onLost)
router.use(main.onError)

module.exports = router

