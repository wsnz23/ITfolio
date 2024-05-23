const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/Users');
const bcrypt=require("bcryptjs");
const Education = require('./models/Education');
const Skill = require('./models/Skill');
const Award = require('./models/Award');
const WorkHistory = require('./models/WorkHistory');
const jwt=require("jsonwebtoken");
const JWT_SECRET="hvdvay6ert7283()gvgdgvdgdergvdvdt345565868xcbjy@#$";
const MajorModel = require('./models/chart'); 
const Interest = require('./models/interest');
const bodyParser = require('body-parser');
const Checkbox= require('./models/Checkbox');
const Contact = require('./models/Contact');
var nodemailer=require('nodemailer');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb+srv://wasansubaihi16:JtkTeMagKrOrtUTL@cluster0.ouwavxd.mongodb.net/ITfolio?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/getuseradmin', async (req, res) => {
  try {
    const users = await UserModel.find({ case: { $ne: "admin" } }).select('-Username');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/user-checkboxes/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userCheckboxes = await Checkbox.findOne({ username: username });

    if (!userCheckboxes) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userCheckboxes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.delete('/api/contact/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    // Assuming you're using Mongoose for MongoDB interaction
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.put("/updatestatus/:id", async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters
  const { status } = req.body; // Extract status from the request body

  try {
    // Find the user by user ID
    let user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user status
    user.status = status;

    await user.save(); // Save the updated user document
    return res.json({ status: "User status updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters

  try {
    // Find the user by user ID and delete it
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});




app.post("/forget-password" , async(req,res)=>{
const{email}=req.body;
try{
  const olduser=await UserModel.findOne({Email: email});
  console.log(olduser)
if(!olduser){
return res.json({status:"user not exists!"})
}
const secret =JWT_SECRET + olduser.Password;
const token =jwt.sign({email:olduser.Email,id:olduser._id},secret,{expiresIn:'5m'});
console.log(token)
const link =`http://localhost:3001/reset-password/${olduser._id}/${token}`
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itfolio.ask@gmail.com',
    pass: 'bfde jevq dybu gqif'
  }
});

var mailOptions = {
  from: 'itfolio.ask@gmail.com',
  to: email,
  subject: 'Reset Password',
  text: link,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
console.log(link);

}catch(error){
}
})


app.get("/reset-password/:id/:token", async(req,res)=>{
const {id,token}=req.params;
console.log(req.params);
const olduser=await UserModel.findOne({_id: id});
if(!olduser){
return res.json({status:"user not exists!"})
}
const secret =JWT_SECRET + olduser.Password;
try{
const verify=jwt.verify(token,secret);
res.render("index",{email:verify.email,status:"not verified"})
}catch(error){
res.send("not verified")
}
})

app.post("/reset-password/:id/:token", async(req,res)=>{
  const {id,token}=req.params;
  const {password}=req.body;

  const olduser=await UserModel.findOne({_id: id});
  if(!olduser){
  return res.json({status:"user not exists!"})
  }
  const secret =JWT_SECRET + olduser.Password;
  try{
  const verify=jwt.verify(token,secret);
  const encryptedpassword=await bcrypt.hash(password,10);
  await UserModel.updateOne({
_id:id,
  },
  {
    $set:{
      Password:encryptedpassword,
    },
  }
  );


 res.render("index",{email:verify.email,status:"verified"})
  }catch(error){
    res.json({status:"something went wrong"})
  }
  })
  






  app.get('/api/contact', async (req, res) => {
    try {
      // Assuming Contact is your Mongoose model
      const contacts = await Contact.find();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  


app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/usercheckboxes', async (req, res) => {
  try {
    const { username, checkboxes } = req.body;

    // Find the existing document by username
    let existingUserCheckboxes = await Checkbox.findOne({ username });

    if (!existingUserCheckboxes) {
      // If the document doesn't exist, create a new one
      existingUserCheckboxes = new Checkbox({
        username: username,
        checkboxes: checkboxes
      });
    } else {
      // If the document exists, update the checkboxes array
      existingUserCheckboxes.checkboxes.push(...checkboxes);
    }

    // Save the updated user checkboxes to the database
    const savedCheckboxes = await existingUserCheckboxes.save();

    // Log success message and respond with the updated document
    console.log('User checkboxes updated successfully:', savedCheckboxes);
    res.status(200).json(savedCheckboxes);
  } catch (error) {
    // Log error and respond with internal server error status
    console.error('Error updating user checkboxes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/usercheckboxes/:username/:label', async (req, res) => {
  try {
    const { username, label } = req.params;
    const { isChecked } = req.body;

    // Find the user checkboxes document by username
    const userCheckboxes = await Checkbox.findOne({ username });

    if (!userCheckboxes) {
      // If the document doesn't exist, return an error
      return res.status(404).json({ error: 'User checkboxes document not found' });
    }

    // Find the checkbox with the specified label
    const checkboxIndex = userCheckboxes.checkboxes.findIndex(cb => cb.label === label);

    if (checkboxIndex === -1) {
      // If the label doesn't exist in the checkboxes array, return an error
      return res.status(404).json({ error: 'Label not found in user checkboxes' });
    }

    // Update the isChecked value of the label
    userCheckboxes.checkboxes[checkboxIndex].isChecked = isChecked;

    // Save the updated user checkboxes document
    await userCheckboxes.save();

    // Respond with success message
    res.status(200).json({ message: 'Label isChecked value updated successfully' });
  } catch (error) {
    // Log error and respond with internal server error status
    console.error('Error updating label isChecked value:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.delete('/usercheckboxes/:username/:label', async (req, res) => {
  try {
    const { username, label } = req.params;

    // Find the user checkboxes document by username
    const userCheckboxes = await Checkbox.findOne({ username });

    if (!userCheckboxes) {
      // If the document doesn't exist, return a not found error
      return res.status(404).json({ error: 'User checkboxes not found' });
    }

    // Find the index of the checkbox with the specified label
    const index = userCheckboxes.checkboxes.findIndex(checkbox => checkbox.label === label);

    if (index === -1) {
      // If the label doesn't exist in the checkboxes array, return a not found error
      return res.status(404).json({ error: 'Checkbox label not found' });
    }

    // Remove the checkbox with the specified label from the checkboxes array
    userCheckboxes.checkboxes.splice(index, 1);

    // Save the updated user checkboxes to the database
    const savedCheckboxes = await userCheckboxes.save();

    // Respond with the updated document
    res.status(200).json(savedCheckboxes);
  } catch (error) {
    // Log error and respond with internal server error status
    console.error('Error deleting checkbox label:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/usercheckboxes/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user checkboxes document by username
    const userCheckboxes = await Checkbox.findOne({ username });

    if (!userCheckboxes) {
      // If the document doesn't exist, return an empty array
      return res.status(200).json([]);
    }

    // Filter out the checked checkboxes
    const checkedCheckboxes = userCheckboxes.checkboxes.filter(checkbox => checkbox.isChecked);

    // Respond with the checked checkboxes
    res.status(200).json(checkedCheckboxes);
  } catch (error) {
    // Log error and respond with internal server error status
    console.error('Error retrieving user checkboxes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});













// Get all interests
app.get('/interest', async (req, res) => {
  try {
    const interests = await Interest.find();
    res.status(200).json(interests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new interest
app.post('/interest', async (req, res) => {
  const { username, interest } = req.body;
  try {
    const newInterest = new Interest({ username, interest });
    await newInterest.save();
    res.status(201).json(newInterest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a specific interest
app.delete('/interest/:id', async (req, res) => {
  try {
    const result = await Interest.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Interest not found' });
    }
    res.json({ message: 'Interest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.get('/award', async (req, res) => {
  try {
    const awards= await Award.find();
    res.json(awards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/award', async (req, res) => {
  const award = new Award({
      username:req.body.username,
      name: req.body.name,
      source: req.body.source,
  });

  try {
    const newsaward= await award.save();
    res.status(201).json(newsaward);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/award/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (award == null) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    if (req.body.name != null) {
      award.name = req.body.name;
    }
    if (req.body.source != null) {
      award.source = req.body.source;
    }
    const updatedaward = await award.save();
    res.json(updatedaward);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/award/:id', async (req, res) => {
  try {
    const result = await Award.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'WorkHistory record not found' });
    }
    res.json({ message: 'Education record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});








app.get('/skill', async (req, res) => {
  try {
    const skills= await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/skill', async (req, res) => {
  const skills = new Skill({
      username:req.body.username,
      name: req.body.name,
      source: req.body.source,
  });

  try {
    const newskills= await skills.save();
    res.status(201).json(newskills);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/skill/:id', async (req, res) => {
  try {
    const skills = await Skill.findById(req.params.id);
    if (skills == null) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    if (req.body.name != null) {
      skills.name = req.body.name;
    }
    if (req.body.source != null) {
      skills.source = req.body.source;
    }
    const updatedskill = await skills.save();
    res.json(updatedskill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/skill/:id', async (req, res) => {
  try {
    const result = await Skill.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'WorkHistory record not found' });
    }
    res.json({ message: 'Education record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});









app.get('/work', async (req, res) => {
    try {
      const work = await WorkHistory.find();
      res.json(work);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/work', async (req, res) => {
    const work = new WorkHistory({
        username:req.body.username,
        company: req.body.company,
        position: req.body.position,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });
  
    try {
      const newwork = await work.save();
      res.status(201).json(newwork);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.patch('/work/:id', async (req, res) => {
    try {
      const work = await WorkHistory.findById(req.params.id);
      if (work == null) {
        return res.status(404).json({ message: 'Education record not found' });
      }
      if (req.body.company != null) {
        work.company = req.body.company;
      }
      if (req.body.position != null) {
        work.position = req.body.position;
      }
      if (req.body.startDate != null) {
        work.startDate = req.body.startDate;
      }if (req.body.endDate != null) {
        work.endDate = req.body.endDate;
      }
      const updatedwork = await work.save();
      res.json(updatedwork);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete('/work/:id', async (req, res) => {
    try {
      const result = await WorkHistory.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'WorkHistory record not found' });
      }
      res.json({ message: 'Education record deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




app.get('/education', async (req, res) => {
    try {
      const education = await Education.find();
      res.json(education);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/education', async (req, res) => {
    const education = new Education({
        username:req.body.username,
      university: req.body.university,
      major: req.body.major,
      graduationDate: req.body.graduationDate,
      gpa:req.body.gpa,
    });
  
    try {
      const newEducation = await education.save();
      res.status(201).json(newEducation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.patch('/education/:id', async (req, res) => {
    try {
      const education = await Education.findById(req.params.id);
      if (education == null) {
        return res.status(404).json({ message: 'Education record not found' });
      }
      if (req.body.university != null) {
        education.university = req.body.university;
      }
      if (req.body.major != null) {
        education.major = req.body.major;
      }
      if (req.body.graduationDate != null) {
        education.graduationDate = req.body.graduationDate;
      }
      if (req.body.gpa != null) {
        education.gpa = req.body.gpa;
      }
      const updatedEducation = await education.save();
      res.json(updatedEducation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete('/education/:id', async (req, res) => {
    try {
      const result = await Education.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Education record not found' });
      }
      res.json({ message: 'Education record deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  
  
app.post("/createMajor", async (req, res) => {
    const { username, major, submenu } = req.body;
    try {
        // Create a new major document
        const newMajor = new MajorModel({
            username,
            major,
            submenu
        });

        // Save the new document to the database
        await newMajor.save();

        res.json({ status: "ok" });
    } catch (error) {
        console.error("Error creating major:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/updateMajor/:username", async (req, res) => {
    const { username } = req.params; // Get the username from the request parameters
    const { courseName, rate } = req.body; // Get the course name and rate from the request body

    try {
        // Find the major document by username
        const major = await MajorModel.findOne({ username });

        if (!major) {
            return res.status(404).json({ error: "Major not found" });
        }

        // Find the submenu item containing the course to update
        const courseToUpdate = major.submenu.find(submenuItem =>
            submenuItem.courses.some(course => course.name === courseName)
        );

        if (!courseToUpdate) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Find the index of the course within the submenu item
        const courseIndex = courseToUpdate.courses.findIndex(course => course.name === courseName);

        if (courseIndex === -1) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Update the rate of the course at the found index
        courseToUpdate.courses[courseIndex].rate = rate;

        // Save the updated major document
        const updatedMajor = await major.save();

        res.json(updatedMajor); // Return the updated major document
    } catch (error) {
        console.error("Error updating major:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.get("/getchart", async (req, res) => {
    try {
        const majors = await MajorModel.find({});
        res.json(majors);
    } catch (error) {
        console.error("Error fetching majors:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/getuser", async (req, res) => {
     await UserModel.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
});

app.put("/updateusers/:username", async (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
  
  try {
    // Find the user by username
    let user = await UserModel.findOne({ Username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user information if provided in the request body
    if (req.body.FullName) user.FullName = req.body.FullName;
    if (req.body.Email) user.Email = req.body.Email;
    if (req.body.Major) user.Major = req.body.Major;
    if (req.body.languages) user.languages = req.body.languages;
    if (req.body.country) user.country = req.body.country;
    if (req.body.city) user.city = req.body.city;
    if (req.body.birthday) user.birthday = req.body.birthday;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;

    // Check if password is provided and encrypt it
    if (req.body.Password) {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      user.Password = hashedPassword;
    }

    await user.save(); // Save the updated user document
    return res.json({ status: "User information updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



app.post("/createusers", async (req, res) => {
    const { FullName,Email,Username, Password,Major, languages, country, city, birthday, phone, gender, profilePicture } = req.body;
    const encryptedpassword=await bcrypt.hash(Password,10)
    try{
const olduser= await UserModel.findOne({ Username });
if(olduser){
   return res.json({error:"user existed"});
}
    await UserModel.create(
        {
            FullName,
            Email,
            Username,
            Password:encryptedpassword,
            Major,
            languages,
            country,
            city,
            birthday,
            phone,
            gender,
            profilePicture
        }
    )
    res.send({status:"ok"})
    }catch(error){
res.send({status:"error"})
    }
});

app.post("/login", async (req, res) => {
    const { username, pass } = req.body;
    const user = await UserModel.findOne({ Username: username });

    if (!user) {
        return res.status(404).json({ error: "User Not found" });
    }

    if (await bcrypt.compare(pass, user.Password)) {
        const token = jwt.sign({ username: user.Username }, JWT_SECRET);
        return res.status(200).json({ status: "ok", data: token });
    }

    // If password is incorrect
    return res.status(401).json({ status: "error", error: "Invalid password" });
});


app.post("/userdata", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token payload:", user); // Log the decoded token payload
        const userData = await UserModel.findOne({ Username: user.username }); // Use user.username
        if (userData) {
            res.send({ status: "ok", data: userData });
        } else {
            res.send({ status: "error", data: "User not found" });
        }
    } catch (error) {
        res.send({ status: "error", data: error.message });
    }
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

