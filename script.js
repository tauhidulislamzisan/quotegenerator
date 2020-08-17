const quoteText = document.getElementById('quote-text');
const author = document.getElementById('author');
const btnTwiiter = document.getElementById('twitter');
const btnNewQuote = document.getElementById('new-quote');
const quoteBox = document.getElementById('quote-box');
const loader = document.getElementById('loader');
//show loading
 const loading= ()=>{
     loader.hidden=false;
     quoteBox.hidden=true;
 }
 const complete = () =>{
     if (!loader.hidden) {
         quoteBox.hidden = false;
         loader.hidden = true;
     }
 }


//getting the quote
async function getQuote(){
    loading();
    const apiUrl ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const respone = await fetch('https://cors-anywhere.herokuapp.com/'+apiUrl);
            const data = await respone.json();
            //if author = null
            if (data.quoteAuthor != '') {
                author.innerText = '-'+data.quoteAuthor;
            } else {
                author.innerText = '- Unknown';
            }
            //if quote is long
            if (data.quoteText.length > 120) {
                quoteText.classList.add('long-quote')
            }else{
                quoteText.classList.remove('long-quote')
            }
            quoteText.innerText = data.quoteText;
            complete();
        }
        catch (error) {
        console.log(error);
        // quoteText.innerText = 'Future is not set. Set your future.'
        // author.innerText = 'T I Zisan';
        getQuote();
    }
}
const tweetQuote = () =>{
    const text = quoteText.innerText;
    const authorName = author.innerText;
    const tweet = `https://twitter.com/intent/tweet?text="${text}" \n
- ${authorName}&via=zisan13407`
    window.open(tweet, '_blank')
}
//Onclick newquote generate
btnNewQuote.addEventListener('click', getQuote)
//Onclick tweet button
btnTwiiter.addEventListener('click', tweetQuote)

//onLoad
getQuote();
