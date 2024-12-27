import bcrypt from "bcrypt";

const authenticateApiKey = async (apiKey) => {
      try {
    const isMatch = await bcrypt.compare(process.env.TOKEN, apiKey);
    return isMatch;
  } catch (error) {
    throw new Error("Error while comparing API key");
  }
};

const authenticateBearerToken = async (req, res, next) => {
  const bearerHeader = req.header("Authorization");

  if (!bearerHeader) {
    return res.status(401).json({ message: "No Authorization token provided" });
  }

  const apiKey = bearerHeader.split(" ")[1];

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "API key not found in Authorization header" });
  }

  try {
    const isMatch = await authenticateApiKey(apiKey);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid API key" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error while comparing API key" });
  }
};

export { authenticateApiKey, authenticateBearerToken };
