import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({})
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
}

export default isAuthenticated