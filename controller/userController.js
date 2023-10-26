import User from "../models/user.js";

export async function createUser(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        req.session.user_id = user._id;
        res.json({
            status: true,
            data: { message: "User Created Succesfully" },
        });
    } catch (e) {
        const message = e.code == 11000 ? "Duplicate Email" : e.message;
        res.status(500).json({ status: false, data: { message: message } });
    }
}

export async function showUserById(req, res) {
    console.log(req.params.id);
    const user = await findById(req.params.id).populate({
        path: "posts",
        select: "body",
    });
    res.send(user);
}

export async function validateUser(req, res) {
    const { email, password } = req.body;
    if (req.session.user_id)
        return res.json({
            status: false,
            data: {
                message: "Already Logged In Logout First",
            },
        });

    try {
        const user = await User.findAndValidate(email, password);
        req.session.user_id = user._id;
        res.json({
            status: true,
            data: {
                message: `Succesfully logged in ${user.email}`,
            },
        });
    } catch (e) {
        res.status(e.statusCode).json({
            status: false,
            data: { message: e.message },
        });
    }
}

export async function logout(req, res) {
    if (!req.session.user_id)
        return res.json({ status: false, data: { message: "Login First" } });
    req.session.user_id = null;
    res.json({ status: true, data: { message: "Succesfully Logged Out" } });
}
