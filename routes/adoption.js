const router = require('express').Router();
const Advert = require('../models/advert');

/* GET adoption page. */
router.get('/', async (req, res) => {

  const { breed, type, age, location, keywords, petFriendly, childFriendly, specialNeeds} = req.query;
  let query = {};
  if(breed) {
     query.breed = breed;
  }
  if(type) {
     query.type = type;
  }
  if(age) {
    var ranges = age.split('-');
    var ageMin = ranges[0];
    var ageMax = ranges[1];
    query.age = { $gte: ageMin, $lte: ageMax };
  }
  if(location) {
    query.location = new RegExp(`^${location}$`, 'i');
  }
  if(keywords) {
    query.keywords = {'$regex': keywords, '$options': 'i'};
  }
  if(petFriendly) {
    query.petFriendly = petFriendly;
  }
  if(childFriendly) {
    query.childFriendly = childFriendly;
  }
  if(specialNeeds) {
    query.specialNeeds = specialNeeds;
  }

  // Number of adverts per page
  const PAGE_SIZE = 8;
  // getting the page number from request
  const page = parseInt(req.query.page || '0');
  
  try{
    // Querying MongoDB for data
    let total = await Advert.countDocuments(query)
    let adverts = await Advert.find(query)
      .sort({createdAt: 'descending'})
      .skip(PAGE_SIZE * page)
      .limit(PAGE_SIZE);

    if(req.query.sort == 'oldest') {
      total = await Advert.countDocuments(query)
      adverts = await Advert.find(query)
        .sort({createdAt: 'ascending'})
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE);
    }

    res.status(200).render('adoption', { 
      page_name: 'adoption', 
      adverts : adverts , 
      accountName: !req.user ? null : req.user.name,  
      breed: req.query.breed || '', 
      type: req.query.type || 'Pets', 
      age: req.query.age,
      location: req.query.location, 
      keywords: req.query.keywords || '',  
      childFriendly: req.query.childFriendly, 
      petFriendly: req.query.petFriendly,
      specialNeeds: req.query.specialNeeds, 
      sort: req.query.sort, 
      totalPages: Math.ceil(total / PAGE_SIZE), 
      total: total, page: page + 1
    });
    
  } catch(err) {
    res.status(500).json(err);
  }

});


/* GET thankyou page. */
router.get('/thankyou', (req, res) => {
  res.status(200).render('thankyouPage', { page_name: 'adoption', accountName: !req.user ? null : req.user.name});
});

module.exports = router;
