// const router = require('express').Router();
// let User = require('../models/user.model');
// const Workout = require('../models/workout.model');
// let User = require('../models/workout.model');
const server = require('express');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)



server.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = await db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    req.session.userId = user.id
    res.status(201)
    res.json(user)
})


// Check authentication middleware

server.use(async (req, res, next) => {
  const user = await db.user.findFirst({where: { id:  req.session.userId }})
  req.user = user
  next()
})

// Sign out route

server.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

// "Me" route

server.get("/me", async (req, res) => {
    res.status(200)
    res.json(req.user)
})