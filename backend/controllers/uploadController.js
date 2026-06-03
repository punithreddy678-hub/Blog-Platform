const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const result = await cloudinary.uploader.upload_stream(
            { folder: "blog-platform" },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error });
                }

                res.json({
                    url: result.secure_url
                });
            }
        );

        result.end(req.file.buffer);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { uploadImage };