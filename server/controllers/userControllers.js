import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidator } from "../validator/user-validator.js";
import emailVerification from "../verification/emailVerification.js";

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

    if (!user) return res.status(404).send("User not found");

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched || !user)
      return res.status(400).send("Wrong username or password");

    /* if (!user.verified)
      return res.status(400).send({
        success: false,
        error: "Email is not verified",
      }); */

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

export const updateUserProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const { filename } = req.file;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: filename },
      { new: true }
    );
    if (!updatedUser) {
      return res.send({ success: false, message: "User not found" });
    }

    res.send({
      success: true,
      user: updatedUser,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile picture:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//Delete profile
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  await User.findByIdAndDelete(userId);
  res.json({ message: "User deleted successfully!" });
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
    if (req.file) req.body.image = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ success: false, message: "Usernot found" });
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

// node eimailer
