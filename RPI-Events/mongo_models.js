const mongoose = require('mongoose');
const DESC_LIMIT = 200; //i just picked this randomly, idk how many characters we should limit descriptions to but it should definitely be limited
const TAGS = require('./tags');

// const usersSchema = {
//   email: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['Moderator', 'Organizer', 'Regular'],
//     default: 'Regular'
//   },
//   organization: [String],
//   registered_events: { //list of event ids
//     type: [Number],
//     default: []
//   }
// };
// const UserModel = mongoose.model("Users", usersSchema, "Users");

const organizationsSchema = {
  id: {
    type: Number,
    required: true,
    immutable: true
  },
  name: {
    type: String,
    required: true
  },
  members: { //need to make sure members are in Users collection and have proper roles (Organizer / Admin)
    type: [String],
    default: []
  },
  hosted_events: { //list of event ids
    type: [Number],
    default: []
  }
};
const OrganizationModel = mongoose.model("Organizations", organizationsSchema, "Organizations");

const eventsSchema = {
  id: {
    type: Number,
    required: true,
    immutable: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxLength: DESC_LIMIT,
    default: ''
  },
  duration: {
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    recurring: {
      type: String,
      enum: ['Not recurring', 'Daily', 'Weekly', 'Monthly', 'Annually'],
      default: 'Not recurring'
    }
  },
  image_filenames: {
    type: [String]
  },
  contact: {
    contact_type: {
      type: String,
      enum: ['Email', 'Phone', 'Discord', 'Slack', 'Instagram'],
      required: true
    },
    contact_info: {
      type: String,
      required: true
    }
  },
  seats: {
    unlimited: {
      type: Boolean,
      default: true
    },
    total_seats: { //necessary is unlimited = false
      type: Number
    },
    users_registered: {
      type: [String],
      default: []
    }
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: tagArr => { //add validation to check if there's at least one tag?
        for (let i = 0; i < tagArr.length; i++) {
          if (!TAGS.includes(tagArr[i])) {
            return false;
          }
        }
        return true;
      },
      message: props => `${props.value} is not a valid tag`
    }
  },
  form: {
    internal: { //true = internal, false = external
      type: Boolean,
      default: true
    },
    external_link: {
      type: String
    }
  },
  organization: {
    type: [String],
    required: true
  }
};
const EventModel = mongoose.model("Events", eventsSchema, "Events");

module.exports = {
  // UserModel,
  OrganizationModel,
  EventModel
};