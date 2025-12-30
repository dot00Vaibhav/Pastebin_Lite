const Paste = require("../models/Paste");
const crypto = require("crypto");

const generateShortId = () => {
  return crypto.randomBytes(6).toString("base64url");
};

// CREATE PASTE
exports.createPaste = async (req, res) => {
  try {
    const { content, expiryMinutes, maxViews } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }

    let shortId;
    for (let i = 0; i < 10; i++) {
      shortId = generateShortId();
      if (!(await Paste.findOne({ shortId }))) break;
    }

    const paste = new Paste({
      shortId,
      content,
      expiresAt: expiryMinutes ? new Date(Date.now() + expiryMinutes * 60000) : null,
      maxViews: maxViews || null,
    });

    await paste.save();

    res.status(201).json({
      success: true,
      shortId,
      url: `${req.protocol}://${req.get("host")}/${shortId}`
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to create paste" });
  }
};

// GET PASTE
exports.getPaste = async (req, res) => {
  try {
    const { shortId } = req.params;
    const paste = await Paste.findOne({ shortId });

    if (!paste) return res.status(404).json({ error: "Paste not found" });

    if (paste.expiresAt && paste.expiresAt <= new Date()) {
      await Paste.deleteOne({ shortId });
      return res.status(404).json({ error: "Paste expired" });
    }

    paste.viewCount++;
    await paste.save();

    res.json({
      content: paste.content,
      viewCount: paste.viewCount,
      expiresAt: paste.expiresAt
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch paste" });
  }
};
