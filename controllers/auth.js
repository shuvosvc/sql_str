const bcrypt = require("bcrypt");
const { Authorities } = require("../models");

const createToken = require("../util/generateToken");

exports.create = async function (req, res) {
  try {
    const { name, email, password, role } = req.body;
    const isAdmin = await Authorities.findOne({ email: req.user.email });

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

    const hashedPassword = bcrypt.hashSync(
      password.toString(),
      parseInt(process.env.BCRYPT_SALT)
    );

    const newauthority = await Authorities.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    return res.status(200).json({
      message: " created successfuly",
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        err: "This mail is already used!",
      });
    } else {
      return res.status(500).json({
        err: "Internal server error!",
      });
    }
  }
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const isExist = await Authorities.findOne({ email });

    if (!isExist) {
      return res.status(404).json({
        err: "User does no exist!",
      });
    }
    const isValidPassword = bcrypt.compareSync(password, isExist.password);

    if (!isValidPassword) {
      return res.status(403).json({
        err: "Wrong password!",
      });
    }

    const token = createToken.generateToken(isExist);
    return res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      err: "Internal server error!",
    });
  }
};

exports.update = async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(404).json({
        err: "User does not exist!",
      });
    }
    const isAdmin = await Authorities.findOne({ email: req.user.email });

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
    if (req.body.role === "admin") {
      return res.status(401).json({
        err: "Unauthorized",
      });
    }
    const updated = await Authorities.update(
      {
        ...req.body,
      },
      { where: { id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({
        err: "User does no exist!",
      });
    }
    return res.status(200).json({
      message: "Updated successfully!",
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        err: "This mail is already used!",
      });
    } else {
      return res.status(500).json({
        err: "Internal server error!",
      });
    }
  }
};

exports.delete = async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(404).json({
        err: "User does not exist!",
      });
    }
    const isAdmin = await Authorities.findOne({ email: req.user.email });

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

    await Authorities.destroy({
      where: {
        email: req.user.email,
      },
    });

    return res.status(200).json({
      message: " deleted successfuly",
    });
  } catch (err) {
    return res.status(500).json({
      err: "Internal server error!",
    });
  }
};

//dddsss
