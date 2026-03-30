import express from 'express'

const test = express()

test.use(express.json())

test.get('/', (req, res) => {
  res.send('Hello World')
})

test.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})


let users = [];

test.post('/use', (req,res) => {
    const {name, age, grade} = req.body;
    const user = {name, age, grade};
     if (!name || !age || !grade) {
        return res.status(400).json({error: "Please provide name, age, and grade"});
     }
    users.push(user);
    res.status(200).json({message: "user added successfully", user});
    
})

test.get('/useget', (req,res) => {
    if (users.length === 0) {
        return res.status(404).json({error: "No users found"});
    }
    res.status(200).json(users);
})

test.get('/useget/:name', (req,res) => {
    const {name} = req.params;
    let user = users.find(u => u.name === name);
    
    if (!user) {
        return res.status(404).json({error: "user not found"});
    }
    res.status(200).json(user);
})

test.patch('/useput/:name', (req,res) => {
    const {name} = req.params;
    const {age, grade} = req.body;
    let user = users.find(u => u.name === name);

    if (!user) {
        return res.status(404).json({error: "user not found"});
    }
    user.age = age;
    user.grade = grade;
    res.status(200).json({message: "Successfully updated", user});
})  

test.delete('/usedel/:name', (req,res) => {
    const {name} = req.params;
    let userIndex = users.findIndex(s => s.name === name);

    if (userIndex === -1) {
        return res.status(404).json({error: "user not found"});
    }

    users.splice(userIndex, 1);
    res.status(200).json({message: "user deleted successfully"});
})

//main ready here