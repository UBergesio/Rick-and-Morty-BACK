const { User } = require("../DB_connection");

const postUser = async (req, res) => {

  try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({error: "Faltan datos"});
      } else {
        const newUser = await User.create({ email, password });
        res.status(201).json(newUser);
      }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
