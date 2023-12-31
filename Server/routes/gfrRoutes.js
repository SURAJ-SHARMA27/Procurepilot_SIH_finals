const express = require('express');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const GFR = require('../models/gfrModel.js');
const { isAuth, isAdmin, generateToken} = require('../utils.js');

const gfrRouter = express.Router();

gfrRouter.get('/getGfrRule', async (req, res) => {
  //console.log('Reached /edit/:id endpoint');

    try {
      const rules = await GFR.find();
      const formattedRules = rules.map(({ _id,rule, heading, description, category }) => ({
        _id,
        rule,
        heading,
        description,
        category,
      }));
  
      res.json({ rules: formattedRules });
    } catch (error) {
      console.error('Error fetching GFR rules:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  gfrRouter.get('/edit/:id', async (req, res) => {
    console.log('Reached /edit/:id endpoint');
    try {
      const ruleId = req.params.id;
      const rule = await GFR.findOne({ _id: ruleId });
      // console.log("suraj");
      if (!rule) {
        return res.status(404).json({ error: 'Rule not found' });
      }
  
      const formattedRule = {
        id:ruleId, 
        rule: rule.rule,
        heading: rule.heading,
        description: rule.description,
        category: rule.category,
      };
  
      res.json({ rule: formattedRule });
    } catch (error) {
      console.error('Error fetching GFR rule by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
gfrRouter.post(
    '/addGfrRule',
    expressAsyncHandler(async (req, res) => {
      try {
        const newRule = new GFR({
          rule: req.body.rule,
          heading: req.body.heading,
          description: req.body.description,
          category: req.body.category,
        });
  
        const rule = await newRule.save();
        res.send({ message: 'New Rule Created', rule });
      } catch (error) {
        console.error('Validation Error:', error.message);
        res.status(400).json({ error: 'Validation Error', message: error.message });
      }
    })
  );
  gfrRouter.get('/getNewData', async (req, res) => {
    try {
      // Fetch data, sort by createdAt date in descending order, and limit to 3 items starting from the 2nd item
      const data = await GFR.find()
        .sort({ updatedAt: -1 })
        // .skip(2)
        .limit(3);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports=gfrRouter;

