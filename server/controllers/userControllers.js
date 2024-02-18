import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { registerValidator } from "../validator/user-validator.js";
import {
  emailVerification,
  changePassVerification,
} from "../verification/emailVerification.js";

//Register user
export const handleRegister = async (req, res) => {
  try {
    const saltRounds = 10;
    const { error, value } = registerValidator(req.body);

    if (error) {
      return res.status(400).json({ message: error.details });
    }

    const { username, email, password } = value;

    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECTER_KEY,
      {
        expiresIn: "1d",
      }
    );
    emailVerification(token, newUser.email);

    res.send({ success: true, newUser });
    console.log("New user created successfully:", newUser);
  } catch (error) {
    console.error("Error creating the user");
    res.status(500).json({ success: false, error: error.message });
  }
};
//Sign in user
export const handleSignIn = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({
        success: false,
        error: "User not found",
      });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched || !user)
      return res.status(400).send({
        success: false,
        error: "Email or password is wrong",
      });

    if (!user.verified)
      return res.status(400).send({
        success: false,
        error: "Email is not verified, please check your email",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1d",
    });
    res.send({ success: true, token, user });
  } catch (error) {
    console.log("Error sign in:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//logged user
export const loggedUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    res.send({ success: true, user });
  } catch (error) {
    console.log("Error logged user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Delete profile
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const findUser = await User.findById(userId);
    if (findUser.image) {
      const filePath = "uploads/prfim/" + findUser.image;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
        console.log("File deleted successfully");
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        error: "User not found.",
      });
    }

    res.send({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Error deleting the user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//find a user
export const findUser = async (req, res) => {
  try {
    const userId = req.params.todoId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.send({ success: false, message: "User not found" });
    }

    res.send({ success: true, user });
  } catch (error) {
    console.error("Error finding the user", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Update a user
export const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (req.file) {
      const findUser = await User.findById(userId);
      if (findUser.image) {
        const filePath = "uploads/prfim/" + findUser.image;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully");
        });
      }
      req.body.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ success: false, message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);
    res.send({
      success: true,
      user: updatedUser,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updating the user", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
//email confirmation
export const emailConfirm = async (req, res) => {
  try {
    const token = jwt.verify(req.params.token, process.env.JWT_SECTER_KEY);

    if (token) {
      const user = await User.findByIdAndUpdate(
        token.userId,
        { verified: true },
        { new: true }
      );
    }

    res.send({ success: true });
  } catch (error) {
    console.log("Error in email confirmation:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};

export const forgotPass = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (!user)
      return res.status(400).send({
        success: false,
        error: "User not found, please type the correct email",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1h",
    }); // generate a one hour validity token
    console.log("token:", token);

    changePassVerification(token, user.email);

    res.send({ success: true }, user, token);
  } catch (error) {
    console.log("Error in forgotPass:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};

export const changePass = async (req, res) => {
  try {
    const token = jwt.verify(req.body.token, process.env.JWT_SECTER_KEY);

    const saltRounds = 10;

    const hashedpassword = await bcrypt.hash(req.body.password, saltRounds);

    //req.body.password = hashedpassword;

    const user = await User.findByIdAndUpdate(
      token.id,
      { password: hashedpassword },
      { new: true }
    );
    console.log("🚀 ~ user change pass:", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ error in changePass:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};
