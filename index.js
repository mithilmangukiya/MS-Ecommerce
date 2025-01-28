const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cartRoutes = require('./routes/cartRoutes.js');
const connectionDb=require("./db/MongoDB");
const userRoutes = require("./routes/userRoute");
const roleRoutes = require("./routes/roleRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const categoryRoutes = require("./routes/Category_Routes") 
const productRouter = require('./routes/productRouter')
const wishlist = require('./routes/wishlistRoutes')

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
app.use(express.urlencoded({ extended: true }));

app.use('/api', wishlist)
app.use("/api", require("./routes/orderRoutes"));
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/auth', passwordRoutes);
app.use("/api/category", categoryRoutes)
app.use("/product" , productRouter)

app.use('/api/cart', cartRoutes);

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
