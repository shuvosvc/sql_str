const { Authority } = require("../models");

const createToken = require("../util/generateToken");

// exports.create = async function (req, res) {
//   try {
//     const { name, email, password, role, company } = req.body;
//     const isAdmin = await Authority.findOne({ email: req.user.email });

//     if (!isAdmin) {
//       return res.status(404).json({
//         err: "User does no exist!",
//       });
//     }

//     if (isAdmin.role !== "admin") {
//       return res.status(401).json({
//         err: "Unauthorized",
//       });
//     }
//     if (role === "coadmin") {
//       const newAdmin = new Authority({
//         email,
//         password,
//         name,
//         role,
//       });
//       await newAdmin.save();
//     }
//     if (role === "user") {
//       if (!isObjId.isValidId(company)) {
//         return res.status(404).json({
//           err: "Company does not exist!",
//         });
//       }
//       const com = await Company.findOne({ _id: company });
//       if (!com) {
//         return res.status(404).json({
//           err: "Company does no exist!",
//         });
//       }
//       const newAdmin = new Authority({
//         email,
//         password,
//         name,
//         role,
//         company,
//       });
//       await newAdmin.save();
//     }

//     return res.status(200).json({
//       message: " created successfuly",
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(409).json({
//         err: "This mail already used!",
//       });
//     } else {
//       console.log(err);
//       return res.status(500).json({
//         err: "Internal server error!",
//       });
//     }
//   }
// };

// exports.update = async function (req, res) {
//   try {
//     const _id = req.params._id;
//     if (!isObjId.isValidId(_id)) {
//       return res.status(404).json({
//         err: "User does not exist!",
//       });
//     }
//     const isAdmin = await Authority.findOne({ email: req.user.email });

//     if (!isAdmin) {
//       return res.status(404).json({
//         err: "User does no exist!",
//       });
//     }

//     if (isAdmin.role !== "admin") {
//       return res.status(401).json({
//         err: "Unauthorized",
//       });
//     }
//     if (req.body.role || req.body.company) {
//       return res.status(401).json({
//         err: "Unauthorized",
//       });
//     }
//     const updated = await Authority.updateOne(
//       { _id },
//       {
//         $set: req.body,
//       }
//     );
//     if (updated.matchedCount === 0) {
//       return res.status(404).json({
//         err: "User does no exist!",
//       });
//     }
//     return res.status(200).json({
//       message: "Updated successfully!",
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(409).json({
//         err: "This mail already used!",
//       });
//     } else {
//       console.log(err);
//       return res.status(500).json({
//         err: "Internal server error!",
//       });
//     }
//   }
// };

// exports.delete = async function (req, res) {
//   try {
//     const _id = req.params._id;
//     if (!isObjId.isValidId(_id)) {
//       return res.status(404).json({
//         err: "User does not exist!",
//       });
//     }
//     const isAdmin = await Authority.findOne({ email: req.user.email });

//     if (!isAdmin) {
//       return res.status(404).json({
//         err: "User does no exist!",
//       });
//     }

//     if (isAdmin.role !== "admin") {
//       return res.status(401).json({
//         err: "Unauthorized",
//       });
//     }

//     const deleted = await Authority.deleteOne({ _id });
//     if (deleted.deletedCount === 0) {
//       return res.status(404).json({
//         err: "User does not exist!",
//       });
//     }
//     return res.status(200).json({
//       message: " deleted successfuly",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       err: "Internal server error!",
//     });
//   }
// };

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const isExist = await Authority.findAll();

    if (!isExist) {
      return res.status(404).json({
        err: "User does no exist!",
      });
    }
    // const isValidPassword = bcrypt.compareSync(password, isExist.password);

    // if (!isValidPassword) {
    //   return res.status(403).json({
    //     err: "Wrong password!",
    //   });
    // }

    // const token = createToken.generateToken(isExist);
    return res.status(200).json({
      message: "Login successful!",
      isExist,
      // token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};
//dddsss
