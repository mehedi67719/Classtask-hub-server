const express = require('express')
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)



const tasksrouter=require("./router/tasks")
const authentication=require('./router/authentication')




app.use('/task',tasksrouter(supabase))
app.use('/auth',authentication(supabase))


app.get('/', (req, res) => {
  res.send('Hello World!')
})






app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})