const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectionDb=require("./db/MongoDB");
const userRoutes = require("./routes/userRoute");
const roleRoutes = require("./routes/roleRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const categoryRoutes = require("./routes/Category_Routes") 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", require("./routes/orderRoutes"));
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/auth', passwordRoutes);

app.use("/api/category", categoryRoutes)

connectionDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      "Fail to start server  due to connection error : ",
      error.message
    );
    process.exit(1);
  });