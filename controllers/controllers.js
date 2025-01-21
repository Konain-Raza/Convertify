import { convert } from "exchangenow";

const convertRate = async (req, res) => {
  const { from, to, amount = 1 } = req.body;
  try {
    const response = await convert(from, to, amount);
    res.json(response);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(400).json({ error: error.message });
  }
};

export { convertRate };
