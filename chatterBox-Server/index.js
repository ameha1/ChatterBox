
const express = require('express');
const dotenv = require('dotenv')

const app = express();

dotenv.config()

app.get('/',(req,res)=>{res.send('API is running in PORT 5000')});

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log('Server is running ...'))
