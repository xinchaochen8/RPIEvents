const express = require('express');
const cookieParser = require('cookie-parser');

const axios = require('axios');
const fs = require('fs');
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const multer = require('multer');
const upload = multer();

const app = express();
app.use(cookieParser());


// app.use(bodyParser.json({ limit: '5mb' }));
// app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const path = require('path');

const port = 3000;

// mongoose.connect(); // need to enter the connection string
// const db = mongoose.connection;


const organizationSchema = new mongoose.Schema({
  name: String,
  members: [String],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  beginDate: Date,
  completeDate: Date,
  recurring: {
    frequency: String,
    specificDay: String,
  },
  images: Buffer,
  contactInfo: {
    email: String,
    phoneNumber: String,
    discordHandle: String,
  },
  seats: {
    totalSeats: Number,
    seatsRemaining: Number,
  },
  tags: [String],
  eventRegistration: {
    internalExternalForm: Boolean,
    externalFormLink: String,
    fields: {
      fullName: Boolean,
      email: Boolean,
      major: Boolean,
      classYear: Boolean,
    },
  },
  track: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

var admin = require("firebase-admin");
const { GoogleAuthProvider } = require("firebase/auth");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  emailVerified: Boolean,
  photo: Buffer,
  uid: String,
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: Date,
  role: {
    type: {
      Organizer: {
        Organizations: [String]
      },
      Student: {
        Organizations: [String]
      },
      Moderator: {
        AllOrganizationsAccess: Boolean
      }
    },
    default: {
      Organizer: { Organizations: [] },
      Student: { Organizations: [] },
      Moderator: { AllOrganizationsAccess: false }
    }
  },
  source: { type: String, default: "Google" },
  saved: { type: [String], default: [] },
  registered: { type: [String], default: [] }
});



const User = mongoose.model("User", UserSchema);

const Organization = mongoose.model("Organization", organizationSchema);
const Event = mongoose.model("Event", eventSchema);

// app.use(bodyParser.json());
const appBuild = path.join(__dirname, 'build');
app.use(express.static(appBuild));


const AuthProviderGoogle = new GoogleAuthProvider();
AuthProviderGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');

/*
firebase
*/
const serviceAccount = require('./.serviceAccountKey.json');
const { register } = require('module');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const mongoCredentials = process.env.MONGODB;
mongoose.connect(mongoCredentials);


const UserCredentials = mongoose.model('Users', UserSchema);

function sanitizer(content) {
  return content.replace(/[^a-zA-Z0-9]/g, '');
}

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies['session-token'];

    if (!token) {
      console.log('No token found');
      res.status(401).redirect('/login-signup?login');
      return;
    }

    const decodedIdToken = await admin.auth().verifySessionCookie(token);
    console.log('Decoded ID Token:', decodedIdToken);


    const user = {
      email: decodedIdToken.email,
      uid: decodedIdToken.uid,
      picture: decodedIdToken.picture
    };
    req.user = user;
    next();
  } catch (error) {
    console.error('Failed to authenticate', error);
    res.status(401).redirect('/login-signup?login');
  }
};

const authenticateCreateEvent = async (req, res, next) => {
  try {
    const token = req.cookies['session-token'];

    if (!token) {
      console.log('No token found');
      res.status(401).redirect('/login-signup?login');
      return;
    }

    const decodedIdToken = await admin.auth().verifySessionCookie(token);
    console.log('Decoded ID Token:', decodedIdToken);

    const user = await UserCredentials.findOne({ email: decodedIdToken.email });

    if (!user) {
      console.log('No user found with uid:', decodedIdToken.uid);
    } else {
      console.log('User found:', user);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Failed to authenticate', error);
    res.status(401).redirect('/login-signup?login');
  }
};


// create user with just email and password
// app.post('/signup', async (req, res) => {
//   if (!user.username || !user.email || !user.password || !user.confirmPassword) {
//     res.status(400).json({ message: 'All fields are required' });
//     return;
//   }
//   if (confirmPassword !== password) {
//     res.status(400).json({ message: 'Passwords do not match' });
//     return;
//   }
//   const user = {
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     confirmPassword: req.body.confirmPassword
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const userResponse = await admin.auth().createUser({
//     username: user.username,
//     email: user.email,
//     password: hashedPassword,
//     emailVerified: false,
//     disabled: false
//   });
//   res.status(200).json(userResponse);
// });

app.post('/users/login', async (req, res) => {
  try {
    const { idToken, csrfToken } = req.body;

    if (csrfToken !== req.cookies.csrfToken) {
      throw new Error('UNAUTHORIZED REQUEST!');
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, name, email, email_verified, picture } = decodedToken;

    if (!(new Date().getTime() / 1000 - decodedToken.auth_time < 10 * 60)) {
      throw new Error("Recent login required!");
    }

    const existingUser = await UserCredentials.findOne({ email });
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const expiresIn = 60 * 60 * 24 * 0.5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const options = { maxAge: expiresIn, httpOnly: true, secure: false };
    res.cookie('session-token', sessionCookie, options);
    console.log("User logged in:", existingUser);

    res.status(200).json({ status: 'success', email: email, redirect: '/dash' });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});


app.post('/users/signin', async (req, res) => {
  try {

    const { idToken } = req.body;
    if (!idToken) {
      throw new Error("Missing ID token");
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, name, email, email_verified, picture } = decodedToken;


    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }


    const imageResponse = await axios.get(picture, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(imageResponse.data, 'binary');

    const newUser = new UserCredentials({
      username: name || "",
      email: email || "",
      emailVerified: email_verified || false,
      photo: imageData,
      uid,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      source: "Google"
    });

    await newUser.save();

    console.log("New user created:", newUser);
    res.status(200).json({ status: "success", user: newUser });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(400).json({ status: "error", message: error.message });
  }

});

fs.readFile('./src/server/default_profile.jpeg', (err, data) => {
  if (err) {
    console.error("Error reading default profile image:", err);
    return;
  }

  // Convert the default profile image to base64
  const defaultProfileImageBase64 = Buffer.from(data).toString('base64');

  app.post('/users/signinWithPassword', async (req, res) => {
    try {
      const { idToken, csrfToken, profileImage } = req.body;

      console.log(idToken, csrfToken);

      if (csrfToken !== req.cookies.csrfToken) {
        throw new Error('UNAUTHORIZED REQUEST!');
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, name, email, email_verified, picture } = decodedToken;

      if (!(new Date().getTime() / 1000 - decodedToken.auth_time < 10 * 60)) {
        throw new Error("Recent login required!");
      }

      const existingUser = await UserCredentials.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ status: "error", message: "User already exists" });
      }

      let profileImageData = null;

      if (profileImage) {
        const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, '');
        profileImageData = Buffer.from(base64Data, 'base64');
      } else {
        profileImageData = Buffer.from(defaultProfileImageBase64, 'base64');
      }

      const newUser = new UserCredentials({
        username: email.split('@')[0] || "",
        email: email || "",
        emailVerified: email_verified || false,
        photo: profileImageData,
        uid,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        source: "Email"
      });

      await newUser.save();

      console.log("New user created:", newUser);
      res.status(200).json({ status: "success", message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ status: "error", message: error.message });
    }
  });
});


app.post('/user/sessionLogout', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  getAuth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return getAuth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch((error) => {
      res.redirect('/login');
    });
});

app.put('/users/updateUser', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const userResponse = await admin.auth().getUserByEmail(user.email);
  const token = await admin.auth().createCustomToken(userResponse.uid);

  res.status(200).json(token);

});

// return user data from database to dashboard for content generation
app.get('/users/dash', authenticate, async (req, res) => {
  const existingUser = await UserCredentials.findOne({ email: req.user.email });
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  } else {
    const user = {
      username: existingUser.username,
      email: existingUser.email,
      photo: existingUser.photo,
      uid: existingUser.uid,
      role: existingUser.role,
      saved: existingUser.saved,
      registered: existingUser.registered
    }
    res.status(200).json(user);

  }
});

// app.get('/user/registeredEvents', authenticate, async (req, res) => {
//   const user = await UserCredentials.findOne({ email: req.user.email });
//   try {
//     if (!user) {
//       throw new Error("Unable to find user");
//     }

//     res.status(200).json({ status: "success", events: user.registered });

//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// });

app.post('/user/registerEvent', authenticate, async (req, res) => {
  const eventid = req.body.eventid;
  const user = await UserCredentials.findOne({ email: req.user.email });
  try {
    if (!user) {
      throw new Error("Unable to find user");
    }
    const event = await Event.findById(eventid);
    if (!event) {
      throw new Error("Unable to find event");
    }

    user.registered.push(eventid);
    event.track.push(user._id);
    await user.save();
    await event.save();

    res.status(200).json({ status: "success", message: "Event registered successfully" });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }

});

app.post('/user/unregisterEvent', authenticate, async (req, res) => {
  const eventid = req.body.eventid;
  const user = await UserCredentials.findOne({ email: req.user.email });
  try {
    if (!user) {
      throw new Error("Unable to find user");
    }
    const event = await Event.findById(eventid);
    if (!event) {
      throw new Error("Unable to find event");
    }

    user.registered = user.registered.filter((id) => id !== eventid);

    //https://stackoverflow.com/questions/71600782/async-inside-filter-function-in-javascript
    const promises = event.track.map(async(id) => {
      const currUser = await UserCredentials.findById(id);
      return {
        value: id,
        include: currUser.email !== req.user.email 
      };
    });
    const data_with_includes = await Promise.all(promises);
    const filtered_data_with_includes = data_with_includes.filter(v => v.include);
    event.track = filtered_data_with_includes.map(data => data.value);
    
    await user.save();
    await event.save();

    res.status(200).json({ status: "success", message: "Event registered successfully" });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.post('/user/saveEvent', authenticate, async (req, res) => {
  const eventid = req.body.eventid;
  const user = await UserCredentials.findOne({ email: req.user.email });
  try {
    if (!user) {
      throw new Error("Unable to find user");
    }

    const event = await Event.findById(eventid);

    if (!event) {
      throw new Error("Unable to find event");
    }

    user.saved.push(eventid);
    await user.save();
    res.status(200).json({ status: "success", message: "Event saved successfully" });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }

});

app.post('/user/unsaveEvent', authenticate, async (req, res) => {
  const eventid = req.body.eventid;
  const user = await UserCredentials.findOne({ email: req.user.email });
  try {
    if (!user) {
      throw new Error("Unable to find user");
    }

    let oldLength = user.saved.length;
    user.saved.filter(id => id !== eventid);
    await user.save();
    if (oldLength === user.saved.length) {
      res.status(200).json({ status: "success", message: "No change since user didn't save given event" });
    } else {
      res.status(200).json({ status: "success", message: "Event unsaved successfully" });
    }

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});


app.get('/dash', authenticate, async (req, res) => {
  res.sendFile(path.join(appBuild, 'index.html'));
});

app.put('/users/updateProfileImage', authenticate, async (req, res) => {
  const { NewPhoto } = req.body;

  if (!NewPhoto) {
    return res.status(400).json({ message: 'Profile image is required' });
  }

  const base64Data = NewPhoto.replace(/^data:image\/\w+;base64,/, '');
  const profileImageData = Buffer.from(base64Data, 'base64');

  const existingUser = await UserCredentials.findOne({ email: req.user.email });
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  existingUser.photo = profileImageData;

  await existingUser.save();

  res.status(200).json({ status: 'success', message: 'User updated successfully' });
});

app.put('/user/updateUsernames', authenticate, async (req, res) => {
  const newUsername = req.body.NewUserName; // Correct field name
  console.log(newUsername);

  if (!newUsername) {
    return res.status(400).json({ message: 'New username is required' });
  }

  const existingUser = await UserCredentials.findOne({ email: req.user.email });

  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  existingUser.username = newUsername;

  await existingUser.save();
  res.status(200).json({ status: 'success', message: 'Username updated successfully' });
});

// GET endpoints

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const events = await Event.findById(id);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  const { api_token: apiToken } = req.query;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // let events = []; // will need to replace this with database

    if (!apiToken || user.apiToken !== apiToken) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { hashedPassword, ...userData } = user.toObject();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/organizations", async (req, res) => {
  try {
    const organizations = await Organization.find({}, "name");
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/organizations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findById(id).populate("events");
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/events/:eventid", async (req, res) => {
  const { eventid } = req.params;

  try {
    const event = await Event.findById(eventid);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST endpoints

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  const apiToken = generateToken();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      hashedPassword,
      apiToken,
      role: "Regular",
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/organizations", async (req, res) => {
  const { name, members, api_token: apiToken } = req.body;

  const adminUser = await User.findOne({ apiToken, role: "Admin" });
  if (!adminUser) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const newOrganization = new Organization({
      name,
      members,
    });

    await User.updateMany(
      { username: { $in: members } },
      { role: "Organizer" }
    );

    await newOrganization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

fs.readFile('./src/server/default_event_img.jpeg', (err, data) => {
  if (err) {
    console.error("Error reading default profile image:", err);
    return;
  }

  // Convert the default profile image to base64
  const defaultProfileImageBase64 = Buffer.from(data);

  app.post("/events", authenticate, async (req, res) => {
    const {
      eventName: title,
      eventDescription: description,
      eventLocation: location,
      eventStartDate: beginDate,
      eventEndDate: completeDate,
      eventRecurrence: recurring,
      totalSeats: seats,
      eventCategory: tags,
      eventInternalForm: eventRegistration,
      eventImage,
    } = req.body;

    const user = req.user;
    console.log(user);

    if (!user || (user.role && (user.role.Organizer.length > 0 || user.role.Moderator.AllOrganizationsAccess === true))) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    try {
      const newEvent = new Event({
        title,
        description,
        location,
        beginDate,
        completeDate,
        recurring,
        seats: { totalSeats: seats, seatsRemaining: seats },
        tags: [tags],
        eventRegistration: { internalExternalForm: eventRegistration === 'internal' },
        images: eventImage ? Buffer.from(eventImage, 'base64') : defaultProfileImageBase64,
      });

      console.log("newEvent", newEvent);
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

});
// PUT endpoints

app.put("/users/:username", async (req, res) => {
  const { username } = req.params;
  const {
    email,
    password,
    role,
    organization,
    events_registered,
    api_token: apiToken,
  } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!apiToken || (apiToken !== user.apiToken && user.role !== "Admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      if (password === "") {
        return res.status(400).json({ message: "Password cannot be empty" });
      }
      user.hashedPassword = await bcrypt.hash(password, 10);
    }

    if (role && user.role === "Admin") {
      user.role = role;
    }

    if (organization && user.role === "Admin") {
      user.organization = organization;
    }

    if (events_registered) {
      // Handle updating events_registered
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/organizations/:id", async (req, res) => {
  const { id } = req.params;
  const { name, members, api_token: apiToken } = req.body;

  try {
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    if (!apiToken || (apiToken !== user.apiToken && user.role !== "Admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (name) {
      organization.name = name;
    }

    if (members) {
      await User.updateMany(
        { organization: id },
        { organization: null, role: "Regular" }
      );
      await User.updateMany(
        { username: { $in: members } },
        { organization: id, role: "Organizer" }
      );
    }

    await organization.save();
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/events/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    start_date,
    end_date,
    recurring,
    images,
    contact_type,
    contact_info,
    unlimited_seats,
    total_seats,
    users_registered,
    tags,
    internal_form,
    form_link,
    organization,
    api_token: apiToken,
  } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // if (
    //   !apiToken ||
    //   (apiToken !== user.apiToken &&
    //     user.role !== "Admin" &&
    //     user.role !== "Organizer")
    // ) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    if (title) {
      event.title = title;
    }

    if (description) {
      event.description = description;
    }

    if (start_date) {
      event.start_date = start_date;
    }

    if (end_date) {
      event.end_date = end_date;
    }

    if (recurring) {
      event.recurring = recurring;
    }

    if (images) {
      event.images = images;
    }

    if (contact_type) {
      event.contact_type = contact_type;
    }

    if (contact_info) {
      event.contact_info = contact_info;
    }

    if (unlimited_seats !== undefined) {
      event.unlimited_seats = unlimited_seats;
    }

    if (total_seats) {
      event.total_seats = total_seats;
    }

    if (users_registered) {
    }

    if (tags) {
      event.tags = tags;
    }

    if (internal_form !== undefined) {
      event.internal_form = internal_form;
    }

    if (form_link) {
      event.form_link = form_link;
    }

    if (organization) {
      event.organization = organization;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE endpoints

app.delete("/users/:username", async (req, res) => {
  const { username } = req.params;
  const { api_token: apiToken } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!apiToken || (apiToken !== user.apiToken && user.role !== "Admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/organizations/:id", async (req, res) => {
  const { id } = req.params;
  const { api_token: apiToken } = req.body;

  try {
    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (!apiToken || (apiToken !== user.apiToken && user.role !== "Admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Event.updateMany({ organization: id }, { organization: null });
    await User.updateMany(
      { organization: id },
      { organization: null, role: "Regular" }
    );
    await organization.remove();
    res.json({ message: "Organization deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;
  const { api_token: apiToken } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!apiToken || (apiToken !== user.apiToken && user.role !== "Admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // need to remove event from user's registered events list and organization's hosted events list

    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// async function test() {
//   console.log(await Event.findById("6625937f8b34b3f91295205d"));
// }
// test();