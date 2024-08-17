const users = require("../models/schema");
const moment = require("moment");
 const csv=require("fast-csv");
 const fs=require("fs");
const  BASE_URL  =process.env.BASE_URL;
   
 exports.userpost = async (req, res) => {
  const filename = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;
  if (
    !filename ||
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !location ||
    !status
  ) {
    res.status(401).json("All inputs is required");
  }
  try {
    const peruser = await users.findOne({ email: email }).lean();;
    if (peruser) {
      res.status(401).json("This user already exists in our database");
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        gender: gender,
        location: location,
        status: status,
        profile: filename,
        datecreated: datecreated,
      });
      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log(`catch block error ${error}`);
  }
};
exports.userget = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const item_per_page = 4;

  const query = {
    fname: { $regex: search, $options: "i" }
  };

  if (gender !== "All") {
    query.gender = gender;
  }

  if (status !== "All") {
    query.status = status;
  }

  try {
    const skip = (page - 1) * item_per_page;
    const count = await users.countDocuments(query);
    
    const userdata = await users
      .find(query)
      .sort({ datecreated: sort == "new" ? -1 : 1 })
      .limit(item_per_page)
      .skip(skip);

    const pageCount = Math.ceil(count / item_per_page);

    console.log(userdata);
    res.status(200).json({
      pagination: {
        count,
        pageCount
      },
      userdata
    });
  } catch (error) {
    res.status(401).json(error);
  }
};




exports.singleUserGetFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  }
  catch (error) {
    res.status(401).json(error)
  }
}

exports.userEdit = async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
  const file = req.file ? req.file.filename : user_profile;
  const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  try {
    const update = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        gender: gender,
        location: location,
        status: status,
        profile: file,
        datecreated
          : dateUpdate,
      },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(401).json(error);
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await users.findByIdAndDelete({ _id: id });

    res.status(200).json(del);

  }
  catch (error) {
    res.status(401).json("error");
  }
}

exports.userStatus=async (req,res)=>{
  const {id}=req.params;
  const {data}=req.body;
  console.log(data);
  try{
    const userstatusupdate=await  users.findByIdAndUpdate({_id:id},{status:data},{new:true});
     console.log(userstatusupdate)  
    res.status(200).json(userstatusupdate);

  }catch(error){
    res.status(401).json(error);
  }
}



// export user
// export user
exports.userExport = async (req, res) => {
  try {
    const usersdata = await users.find();

    const csvStream = csv.format({ headers: true });
    
    // Use fs.promises.mkdir to avoid callback-based pattern
    try {
      await fs.promises.mkdir("public/files/", { recursive: true });
      await fs.promises.mkdir("public/files/export", { recursive: true });
    } catch (mkdirError) {
      console.error("Error creating directories:", mkdirError);
    }

    const writableStream = fs.createWriteStream(
      "public/files/export/users.csv"
    );
    csvStream.pipe(writableStream);

    writableStream.on("finish", function () {
      res.json({
        downloadUrl: `${BASE_URL}/files/export/users.csv`,
      });
    });

    if (usersdata.length > 0) {
      usersdata.forEach((user) => {
        csvStream.write({
          FirstName: user.fname || "-",
          LastName: user.lname || "-",
          Email: user.email || "-",
          Phone: user.mobile || "-",
          Gender: user.status || "-",
          Status: user.status || "-",
          Profile: user.profile || "-",
           Location: user.location || "-",
          DateCreated: user.datecreated || "-",
          DateUpdated: user.dateUpdated || "-",
        });
      });
    }

    csvStream.end();
    writableStream.end(); // Corrected usage
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(401).json({ error: "An error occurred. Check the console for details." });
  }
};
