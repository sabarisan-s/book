const express = require("express");
const {
    postBook,
    getBook,
    getBookById,
    putBook,
    deleteBook,
} = require("../controllers/bookControllers");
const router = express.Router();

router.route("/books").get(getBook);
router.route("/book/:id").get(getBookById);
router.route("/book").post(postBook);
router.route("/book/:id").put(putBook);
router.route("/book/:id").delete(deleteBook);

module.exports = router;
