import Admin from "../models/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerAdminValidator } from "../validator/user-validator.js";

//Register admin
export const handleRegisterAdmin = async (req, res) => {
  try {
    const saltRounds = 10;
    const { error, value } = registerAdminValidator(req.body);

    if (error) {
      return res.status(400).json({ message: error.details });
    }

    const { username, password } = value;

    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      username,
      password: hashedpassword,
    });
    await newAdmin.save();

    res.send({ success: true, newAdmin });
    console.log("New user created successfully:", newAdmin);
  } catch (error) {
    console.error("Error creating the user");
    res.status(500).json({ success: false, error: error.message });
  }
};

//Sign in Admin
export const handleSignInAdmin = async (req, res) => {
  try {
    const { password, username } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin)
      return res.status(400).send({
        success: false,
        error: "User not found",
      });

    const isMatched = await bcrypt.compare(password, admin.password);

    if (!isMatched || !admin)
      return res.status(400).send({
        success: false,
        error: "Email or password is wrong",
      });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1d",
    });
    res.send({ success: true, token, admin });
  } catch (error) {
    console.log("Error sign in:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//logged admin
export const loggedAdmin = async (req, res) => {
  try {
    const adminId = req.admin.adminId;
    // const userId = req.params.id;
    const admin = await Admin.findOne({ _id: adminId });
    res.send({ success: true, admin });
  } catch (error) {
    console.log("Error logged admin:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//deleteAdmin
export const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).send({
        success: false,
        error: "Admin not found.",
      });
    }

    res.send({ message: "Admin deleted successfully!" });
  } catch (error) {
    console.log("Error deleting the admin:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};
