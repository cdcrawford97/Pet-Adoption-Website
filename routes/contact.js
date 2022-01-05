const router = require('express').Router();
const Message = require('./../models/contactMessage');

// GET Contact page
router.get('/', (req, res) => {
  res.render('contact', { page_name: 'contact', accountName: !req.user ? null : req.user.name  });
});

// POST Route for contact form
router.post('/',  async (req, res) => {

  const email = new Message(req.body);

  try {
    await email.save();
    res.status(200).redirect('/contact');
  } catch (err) {
    res.status(500).json(err);
  }

});


module.exports = router;