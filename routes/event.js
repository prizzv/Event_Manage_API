var express = require('express');
var router = express.Router();

const EventController = require('../controllers/eventController');
const upload = require('../middleware/imageUpload');

/* GET event page. */
router.get('/events', EventController.getEventData);
router.post('/events', upload.single('image'), EventController.createEvent);
router.put('/events/:id', upload.single('image'), EventController.updateEvent);
router.delete('/events/:id', EventController.deleteEvent);

module.exports = router;
