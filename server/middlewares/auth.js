import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export default isAuthenticated = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ msg: 'Please login first' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
}