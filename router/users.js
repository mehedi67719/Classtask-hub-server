module.exports = (supabase) => {
  const router = require("express").Router();

router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { data, error } = await supabase
      .from("profile")
      .select("id, name, email, role")
      .eq("email", email)
      .maybeSingle(); 

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ user: data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



  return router;
};