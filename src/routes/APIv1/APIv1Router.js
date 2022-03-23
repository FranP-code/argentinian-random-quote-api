const { default: axios } = require("axios");
const Express = require("express");
const getRandomQuotes = require("argentinian-random-quote");
const router = Express.Router();

async function getAllQuotes() {
	//Initialize return data
	const returnData = {};

	//Try get quotes from original github repository
	try {
		let response = await axios.get(
			"https://raw.githubusercontent.com/FranP-code/argentinian-random-quote/master/quotes.json"
		);

		returnData.status = response.status;

		if (response.status !== 200) {
			returnData.data = "Request failed";
		}

		console.log(response.data);
		returnData.data = response.data;
	} catch (error) {
		returnData.status = 400;
		returnData.data = error.message;
	}

	return returnData;
}

router.get("/all-quotes", async (req, res) => {
	const response = await getAllQuotes();
	res.status(response.status).json(response);
});

router.get("/random-quote", async (req, res) => {
	//Initialize response data
	let response = {};

	//Almacenate quantity
	const quantity = req.headers.quantity;
	//Almacenate repeated
	let repeated = req.headers.repeated;

	//Check headers
	if (!quantity) {
		res.status(400).json({
			data: "quantity header don't sended",
		});
		return;
	}

	if (!repeated) {
		res.status(400).json({
			data: "repeated header don't sended",
		});
		return;
	}

	//Get all quotes and almacenate it
	const quotes = await getAllQuotes();
	response.status = quotes.status;

	//In the case that all quotes are a successful request, pass it as third parameter of the getRandomQuotes function from argentian-random-quote npm module
	if (quotes.status === 200) {
		//Parse boolean header
		repeated = repeated.toLowerCase();
		repeated = repeated === "true" ? true : false;

		//Get random quotes
		response.data = getRandomQuotes(quantity, repeated, quotes.data);

		//In the case the quote are false...
		if (response.data.length === 1 && response.data[0].status === "error") {
			response.status = 400;
		}
	} else {
		response.data = quotes;
	}

	res.status(response.status).json(response.data);
});

module.exports = router;
