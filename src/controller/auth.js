import { registerSchema } from "../Schemas/auth";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const singup = async(req, res) => {
    //    lấy dữ liệu từ user gửi lên
    const { email, password, name, confirmPassword, age, avatar } = req.body;
    // kiểm tra xem dữ liệu có hợp lệ không
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map((message) => message.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }
    // kiểm tra xem username đã tồn tại chưa
    const exitEmail = await User.findOne({ email });
    if (exitEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }
    // mã hóa password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
    // lưu vào database
    const useName = req.body.name;
    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });
    User.password = undefined;
    return res.status(StatusCodes.CREATED).json({
        user,
    })
}
export const signin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: ["Email không tồn tại"],
        });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Mật khẩu không chính xác"],
        });
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "7d",
    });
    return res.status(StatusCodes.OK).json({
        user,
        token,
    });
};
export const logout = async(req, res) => {}