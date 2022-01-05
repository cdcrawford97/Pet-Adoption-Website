const router = require('express').Router();
const mongoose = require('mongoose');
const Advert = require('./../models/advert');
const Comment = require('./../models/comment');
const Application = require('./../models/application');
const multer = require('multer');
const { adminAuthenticated, sellerAuthenticated, userAuthenticatedComment, userAuthenticatedApplication } = require('../config/auth');
const e = require('connect-flash');

//Setting up multer for storing uploaded files
var storage = multer.diskStorage({
  //destination for files
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
  },
  //add back the extension
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});
var upload = multer({ storage: storage });

 
// GET advertise page
router.get('/', sellerAuthenticated, (req, res) => {
    res.status(200).render('adoptionAd', { page_name: 'advertise', advert: new Advert(), accountName: !req.user ? null : req.user.name });
});

// GET adoption application page
router.get('/:id/application', userAuthenticatedApplication, async (req, res) => {
  try{
    const advert = await Advert.findById(req.params.id);
    res.status(200).render('application', { 
      page_name: 'adoption', 
      user: req.user, 
      id: req.params.id, 
      advert: advert, 
      accountName: req.user.name
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET single adoption page 
router.get('/:id', async (req, res) => {
  try{
    const advert = await Advert.findById(req.params.id);
    const comments = await Comment.find( {advert : req.params.id} );
    if (advert == null ) res.redirect('/adoption');

    res.status(200).render('animalPage', { 
      page_name: 'adoption', 
      admin: req.user && req.user.admin ? true : false, 
      advert: advert, 
      comments: comments, 
      accountName: !req.user ? null : req.user.name 
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

//SUBMITS A POST for advert 
router.post('/', upload.array('images', 10), async (req, res, next) => {
  req.advert = new Advert(req.body);
  next();
}, saveAdvertAndRedirect('adoptionAd'));

//PUT ROUTE for EDIT
router.put('/:id', upload.array('images', 10), adminAuthenticated, async (req, res, next) => {
  try{
    req.advert = await Advert.findById(req.params.id);
    next();
  } catch(err) {
    res.status(500).json(err);
  }
}, saveAdvertAndRedirect('edit'));

//DELETES POST
router.delete('/:id', adminAuthenticated, async (req, res) => {
  try{
    await Advert.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/adoption');
  } catch(err) {
    res.status(500).json(err);
  }
});

//GET edit page for advert
router.get('/edit/:id', adminAuthenticated, async (req, res) => {
  try{
    const advert =  await Advert.findById(req.params.id);
    res.status(200).render('edit', { 
      page_name: 'advertise', 
      id: req.params.id, 
      advert: advert, 
      accountName: !req.user ? null : req.user.name 
    });
  } catch(err) {
    res.status(500).json(err);
  }
});


//POST ROUTE for Submitting comments
router.post('/:id', userAuthenticatedComment, async (req, res) => {
  
  const comment = new Comment({
    advert: req.params.id,
    username: req.user.name,
    comment: req.body.comment
  });

  try {
    await comment.save();
    res.status(201).redirect(`/advertise/${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }

});

//POST ROUTE for submitting comment replys
router.post('/:id/reply', userAuthenticatedComment, async (req, res) => {
  
  const comment = new Comment({
    advert: req.params.id,
    username: req.user.name,
    comment: req.body.commentReply,
    parentId: req.body.parentId
  });

  const _id = req.body.parentId;
  try{
    await Comment.findByIdAndUpdate(
      { _id },
      { $push: { childComments: comment } },
      {safe: true, upsert: true, new : true},
    );
    res.status(201).redirect(`/advertise/${req.params.id}`);
  } catch(err) {
    res.status(500).json(err);
  }
});

//POST ROUTE for submitting adoption application
router.post('/:id/application', userAuthenticatedApplication, async (req, res) => {
  
  const application = new Application(req.body);

  try {
    await application.save();
    Advert.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.advertId) },
      { adoptedBy: application, adopted: true },
      {safe: true, upsert: true, new : true},
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(201).json(result).redirect('/adoption/thankyou');
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }

});


function saveAdvertAndRedirect(path) {
  return async (req, res) => {
  
    //calculating age from pets dob
    let birthday = new Date(req.body.dob);
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let ageInYears = Math.abs(ageDate.getUTCFullYear() - 1970);
    let d = new Date();
    let calcAge;
    if(ageInYears === 0) {
      calcAge = (d.getMonth() - birthday.getMonth() + (12 * (d.getFullYear() - birthday.getFullYear())) + ' months');
    } else {
      calcAge = ageInYears + ' years';
    }

    // populate array with image filenames
    let filenameArray = [];
    const getFilenames = () => new Promise( (resolve) => {
      req.files.forEach(f => filenameArray.push(f.filename));
      resolve(filenameArray);
    });

    let advert = req.advert;
    advert.age = ageInYears;
    advert.ageString = calcAge;
    advert.images = await getFilenames();

    try {
      advert = await advert.save();
      res.status(200).redirect(`/advertise/${advert.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).render(`${path}`, { 
        page_name: 'advertise', 
        id: req.params.id, 
        advert: advert, 
        accountName: req.user.name 
      });
    }
  }
}

module.exports = router;
