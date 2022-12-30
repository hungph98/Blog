const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const postRoute = require("./routes/posts");
const muller = require("multer");


dotenv.config();
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>console.log("Connect Successfully"))
    .catch((err)=>console.log(err))

const storage = muller.diskStorage({
    destinaton: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = muller({ storage: storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been upload");
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);

app.listen(process.env.PORT || 5000, () =>{
    console.log(`App working http://localhost:${process.env.PORT}`)
})