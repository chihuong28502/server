const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(400).json({ msg: "Xác thực không hợp lệ." });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) return res.status(400).json({ msg: "Xác thực không hợp lệ." });

        const user = await Users.findOne({ _id: decoded.id });
        if (!user) return res.status(404).json({ msg: "Người dùng không tìm thấy." });

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: "Lỗi máy chủ: " + err.message });
    }
};

module.exports = auth;
