//Подключаем модули
const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register',
   [ //Валидация почты и пароля 
     check('email', 'Некорректный email').isEmail(),
     check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
   ],
   async (req, res) => { //Процесс регистрации
   try { 
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
     return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
    })
   }

   const {email, password} = req.body
   
   const candidate = await User.findOne({email: email})

   if (candidate){ //Проверка на уникальность 
    return res.status(400).json({message: 'Такой пользователь уже существует'})
   }

   const hashedPassword = await bcrypt.hash(password, 12) //шифрование полученного пароля
   const user = new User({email, password: hashedPassword})

   await user.save()

   res.status(201).json({message: 'Пользователь создан'})

   } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так'})
   }
})

// /api/auth/login
router.post('/login',
[
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').exists()  
],
async (req, res) => {
    try { 

        const errors = validationResult(req)
     
        if (!errors.isEmpty()) {
          return res.status(400).json({
             errors: errors.array(),
             message: 'Введены некорректные данные'
         })
        }
     
        const {email,password} = req.body

        const user = await User.findOne({email})

        if (!user) { //Проверка на правльность введеного email
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password) //сравнивание паролей

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

        } catch (e) {
         res.status(500).json({message: 'Что-то пошло не так'})
        }
})

module.exports = router