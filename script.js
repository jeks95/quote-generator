const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById('quote');
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    removeLoadingSpinner();
    const apiUrl =  'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
     const response = await fetch(apiUrl);
     apiQuotes = await response.json();
     newQuote();
    } catch (error) {
        // Catch Error Here
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote),


// On Load
getQuotes();

