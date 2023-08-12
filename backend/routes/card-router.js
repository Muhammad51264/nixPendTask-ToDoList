const express = require("express");
const {getCards,addCard,deleteCard,updateCard ,addColumn} = require("../controllers/cards-controller");

const router = express.Router();


router.get('/',getCards);

router.post('/add',addCard);

router.post('/addcolumn',addColumn);

router.delete('/delete/:id',deleteCard);

router.put('/edit/:id',updateCard);


module.exports = router;

