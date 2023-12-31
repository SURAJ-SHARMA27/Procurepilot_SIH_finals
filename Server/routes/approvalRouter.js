const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Approval = require('../models/approvalModel.js');
const { isAuth, isAdmin } = require('../utils.js');
const GFR = require('../models/gfrModel.js');

const approvalRouter = express.Router();

approvalRouter.post(
  '/editrule',
  expressAsyncHandler(async (req, res) => {
    try {
      const {
        editBy,
        editAt,
        dataOriginal,
        dataChanged,
        isDelete,
        isEdit,
        approval1,
        approval1Date,
        approval2,
        approval2Date,
        approval3,
        approval3Date,
        isApproval,
      } = req.body;

      // Validate dataChanged presence
      if (!dataChanged) {
        return res.status(400).json({ error: 'Data changed is required' });
      }

      // Add more validations if needed...

      const newApproval = new Approval({
        editBy,
        editAt,
        dataOriginal,
        dataChanged,
        isDelete,
        isEdit,
        approval1,
        approval1Date,
        approval2,
        approval2Date,
        approval3,
        approval3Date,
        isApproval,
      });
      
     const approvalResult = await newApproval.save();

      res.status(201).json(approvalResult);
    } catch (error) {
      console.error('Error submitting approval:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
);
approvalRouter.get('/getapprovaldata', async (req, res) => {
  // console.log('Reached /edit/:id endpoint');

    try {
      const data = await Approval.find();
      res.json({ success: true, data });
    
    } catch (error) {
      console.error('Error fetching GFR rules:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  approvalRouter.post(
    '/updateApproval/:rowId',
    expressAsyncHandler(async (req, res) => {

      try {
        const rowId = req.params.rowId;
        //console.log("reached update approval");
        // console.log(req.body);
        const { approvalField, name,status,isapproval,final} = req.body;
        // console.log(approvalField);
        if (!rowId || !approvalField || !name) {
          return res.status(400).json({ error: 'Invalid input' });
        }
  
        // Find the approval record by rowId
        const approval = await Approval.findById(rowId);
        // console.log(approval);
        // Check if the approval record exists
        if (!approval) {
          return res.status(404).json({ error: 'Approval record not found' });
        }
        //console.log(approval);
        // Update the specified approval field with the provided name
        if(status==="approved"){
          approval[approvalField] = name;
          const approvalDateField = `${approvalField}Date`;
        
          approval[approvalDateField] = new Date();
        }
        else{
          approval[approvalField] = "removedby_"+name;
          const approvalDateField = `${approvalField}Date`;
        
      approval[approvalDateField] = new Date();
        }
        
        
        // Save the updated approval record
       // console.log(isapproval)
        if(isapproval!==''){
          //console.log("suraj");
          approval["isApproval"]=isapproval;
        
        }
         //console.log(approval["isApproval"]);
      //  console.log(approval.dataOriginal.id)
      //  console.log(final)
      console.log(approval.isDelete);
     
       if (final === "true") {
        // console.log("true")
        if (approval.isDelete) {
          console.log("i am in")
          const rule = await GFR.findOneAndDelete({ _id: approval.dataOriginal.id });
          if (rule) {
            console.log('Rule deleted successfully.');
            // Now 'rule' contains the deleted document if you need to reference it
        } else {
            console.log('Rule not found.');
        }
      }
      else{
        const rule = await GFR.findOne({ _id: approval.dataOriginal.id });
        rule.description = approval.dataChanged.description;
        rule.rule = approval.dataChanged.rule;
        rule.heading = approval.dataChanged.title;
        await rule.save();
      }
        
        await Approval.deleteOne({ _id: approval._id }); // Use remove() to delete the record
        return res.status(200).json({ message: 'Approval record deleted successfully' });
      } 
      else if(final==='false'){
        // console.log("false")
        await Approval.deleteOne({ _id: approval._id }); // Use remove() to delete the record
        return res.status(200).json({ message: 'Approval record deleted successfully' });
        
      }
      else {
        const updatedApproval = await approval.save();
        res.status(200).json(updatedApproval);
      }
        
        // res.status(200).json(updatedApproval);
      } catch (error) {
        console.error('Error updating approval status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    })
  );
  approvalRouter.get('/compare/:id', async (req, res) => {
    console.log('Reached /edit/:id endpoint');
    try {
      const ruleId = req.params.id;
      const data = await Approval.findOne({ _id: ruleId });
      console.log("suraj");
      if (!data) {
        return res.status(404).json({ error: 'Rule not found' });
      }
  
      
  
      res.json({ rule: data });
    } catch (error) {
      console.error('Error fetching GFR rule by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = approvalRouter;
