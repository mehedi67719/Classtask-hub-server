const express = require('express')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.json())


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/tasks', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})