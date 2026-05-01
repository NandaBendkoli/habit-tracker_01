


export const createUser = async (req, res) => {
    const { name, email, mobile, password, gender } = req.body;

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "All Fields are mandatory!",
        })
    }
    

}