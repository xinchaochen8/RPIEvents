const axios = require('axios');

async function testFetchEvents() {
  try {
    const response = await axios.get("http://localhost:3000/events");
    console.log(response.data);
  } catch (error) {
    for (let key in error) {
      console.log(key);
    }
    console.log(error.code);
    console.log(error.message);
  }
}

testFetchEvents();