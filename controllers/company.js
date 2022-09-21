const Authority = require("../models/authority");
const Company = require("../models/company");

const isObjId = require("../util/isObjId");

exports.createCompany = async function (req, res) {
  try {
    const isAdmin = await Authority.findOne({ email: req.user.email });

    if (!isAdmin) {
      return res.status(404).json({
        err: "User does no exist!",
      });
    }

    if (isAdmin.role !== "admin") {
      return res.status(401).json({
        err: "Unauthorized",
      });
    }

    const newCompany = new Company(req.body);
    await newCompany.save();

    return res.status(200).json({ message: "Created successfuly" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        err: "This company already used!",
      });
    } else {
      console.log(err);
      return res.status(500).json({
        err: "Internal server error!",
      });
    }
  }
};
exports.updateCompany = async function (req, res) {
  try {
    const _id = req.params._id;
    if (!isObjId.isValidId(_id)) {
      return res.status(404).json({
        err: "Company does not exist!",
      });
    }

    const isAdmin = await Authority.findOne({ email: req.user.email });

    if (!isAdmin) {
      return res.status(404).json({
        err: "User does no exist!",
      });
    }

    if (isAdmin.role !== "admin") {
      return res.status(401).json({
        err: "Unauthorized",
      });
    }

    const updated = await Company.updateOne(
      { _id },
      {
        $set: req.body,
      }
    );
    if (updated.matchedCount === 0) {
      return res.status(404).json({
        err: "Company does no exist!",
      });
    }
    return res.status(200).json({ message: "Updated successfuly" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        err: "This company already used!",
      });
    } else {
      console.log(err);
      return res.status(500).json({
        err: "Internal server error!",
      });
    }
  }
};
exports.getAllCommpany = async function (req, res) {
  try {
    const isAdmin = await Authority.findOne({ email: req.user.email });

    if (!isAdmin) {
      return res.status(404).json({
        err: "User does no exist!",
      });
    }

    if (isAdmin.role !== "admin") {
      return res.status(401).json({
        err: "Unauthorized",
      });
    }

    const company = await Company.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          description: 1,
        },
      },

      {
        $lookup: {
          from: "authorities",
          localField: "_id",
          foreignField: "company",

          pipeline: [{ $project: { _id: 1, email: 1, name: 1 } }],

          as: "users",
        },
      },
      // { $sort: { w: -1 } },
    ]);

    return res.status(200).json({ company });
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
};
