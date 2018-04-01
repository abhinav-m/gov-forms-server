const moment = require('moment');

const Aadhar = require('../models/Aadhar');
const License = require('../models/License');

const getAllDocuments = (user = '', Type) => Type.find({});

exports.getAll = (req, res) => {
  Promise.all([getAllDocuments('', Aadhar), getAllDocuments('', License)])
    .then((values) => {
      const documents = Object.assign({}, ...values);
      res.status(200).send(documents);
    })
    .catch(e => res.status(400).send());
};

const createDocument = (user = '', Type, details) => {
  const formDoc = new Type(details);
  return formDoc.save();
};

exports.create = (req, res) => {
  debugger; //eslint-disable-line
  const { typeIdx, details } = req.body;
  const dob = moment(details.dob);
  details.dob = dob;
  const validTypes = [Aadhar, License];

  const type = validTypes[typeIdx];

  createDocument(req.user, type, details)
    .then(doc => res.send(doc))
    .catch((e) => {
      console.log(e);
      res.status(400).send();
    });
};
