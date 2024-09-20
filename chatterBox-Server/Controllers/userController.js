const UserModel  = require('../Models/userModel')
const expressAsyncHandler = require("express-async-handler");
const generateToken = require('../Config/generateToken')

// Registration function
const registerController = expressAsyncHandler(async (req,res) => {

    const {name,email,password} = req.body;

    // makes sure all fields are field
    if(!name || !email || !password){

        res.send(400)
        throw Error("All necessary inputs have not been fullfield")
    }

    // for a user already existing

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      // res.send(405);
      throw new Error("User already Exists");
    }

    //if a userName is already Taken
    const userNameExist = await UserModel.findOne({ name });
    if (userNameExist) {
        // res.send(406);
        throw new Error("UserName already taken");
    }

    const user = await UserModel.create({ name, email, password });

    if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Registration Error");
      }

})

// LogIn function
const loginController = expressAsyncHandler( async(req,res) => {

    const { name, password } = req.body;

    const user = await UserModel.findOne({ name });
  
    console.log("fetched user Data", user);
    console.log(await user.matchPassword(password));
    
    if (user && (await user.matchPassword(password))) {
      const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      };
      console.log(response);
      res.json(response);
    } else {
      res.status(401);
      throw new Error("Invalid UserName or Password");
    }

})

// Fetches all users to display on users component board

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = {registerController, loginController, fetchAllUsersController};
