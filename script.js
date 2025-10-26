let quoteSection = document.getElementById("quote");
let quoteInput =  document.getElementById("quote-input");

quoteInput.addEventListener("copy", (e) => e.preventDefault());
quoteInput.addEventListener("cut", (e) => e.preventDefault());
quoteInput.addEventListener("paste", (e) => e.preventDefault());

let quote = "";
let time = 600;
let timer = "";
let mistakes = 0;
let totalMistakes = 0;
let charactersWritten = 0;

const quotesArray = [
    "Ο ανώτερος άνθρωπος είναι σκληρός με τον εαυτό του. Ο κατώτερος άνθρωπος είναι σκληρός με τους άλλους.", //Λέων Τολστόι
    "Ο άνθρωπος μοιάζει με κλάσμα όπου ο αριθμητής είναι ο πραγματικός εαυτός του και ο παρονομαστής η ιδέα που έχει για τον εαυτό του. Όσο μεγαλύτερος ο παρονομαστής, τόσο μικρότερη η αξία του κλάσματος. Και όσο ο παρανομαστείς διογκώνεται προς το άπειρο, τόσο το κλάσμα τείνει προς το μηδέν.", //Λέων Τολστόι
    "Όταν δυο άνθρωποι μαλώνουν, φταίει εκείνος που είναι πιο έξυπνος.", //Βόλφγκανγκ Γκαίτε
    "Ο έξυπνος άνθρωπος αλλάζει γνώμη. Ο ηλίθιος ποτέ.", //Βόλφγκανγκ Γκαίτε
    "Στη δουλειά σου να είσαι σοβαρός και στη ζωή σου τρελός.", //Αριστοτέλης Ωνάσης
    "Ο θάνατος δεν θα πρέπει να μας απασχολεί, επειδή όταν εμείς υπάρχουμε, ο θάνατος δεν είναι παρών και όταν ο θάνατος είναι παρών, εμείς δεν υπάρχουμε.", //Επίκουρος
    "Μερικές φορές αναρωτιέμαι αν τον κόσμο κυβερνούν κάποιοι έξυπνοι που μας δουλεύουν ή κάποιοι ηλίθιοι που μιλάνε σοβαρά.", //Laurence J. Peter
    "Σε συμβουλεύω να παντρευτείς. Αν βρεις μια καλή γυναίκα, θα είσαι ευτυχισμένος. Αν όχι, θα γίνεις φιλόσοφος.", //Σωκράτης
    "Δεν μου αρέσει να μου δίνουν συμβουλές. Μπορώ να κάνω και μόνος μου λάθη.", //Όσκαρ Ουάιλντ
    "Η στάση απέναντι στην εξουσία πρέπει να είναι ίδια με τη στάση απέναντι στη φωτιά: να μη στέκεσαι ούτε πολύ κοντά, για να μην καείς, ούτε πολύ μακριά για να μην ξεπαγιάσεις.", //Διογένης
    "Όλα τα πράγματα είναι δύσκολα, προτού γίνουν εύκολα.", //Dr. Thomas Fuller
    "Το να μην κάνεις τίποτα είναι καλύτερο από το να είσαι πολυάσχολος κάνοντας τίποτα", //Λάο Τσε
    "Το κρασί αυξάνει την επιθυμία αλλά μειώνει το αποτέλεσμα.", //Γουίλιαμ Σαίξπηρ
    "Ακτιβιστής δεν είναι αυτός που λέει ότι το ποτάμι είναι βρόμικο. Ακτιβιστής είναι αυτός που καθαρίζει το ποτάμι.", //Ross Perot
    "Καλύτερα να σφάλλεις τολμώντας παρά να σφάλλεις όντας προσεκτικός.", //Alvin Toffler
    "Δεν είναι ότι επειδή τα πράγματα είναι δύσκολα που δεν προσπαθούμε, αλλά είναι ότι επειδή δεν προσπαθούμε που τα πράγματα είναι δύσκολα.", //Σενέκας
    "Σύμπτωση είναι το γνωστό αποτέλεσμα αγνώστων αιτιών.", //Βολταίρος
    "Το να μπω στη διαδικασία να αποδείξω ότι έχω δίκιο, θα σήμαινε ότι θα μπορούσα να έχω άδικο.", //Caron de Beaumarchais
    "Η Ιστορία γράφεται από τους νικητές.", //Napoleon Bonaparte
    "Τον έξυπνο και τεμπέλη τον κάνεις αρχηγό, τον έξυπνο και εργατικό τον κάνεις επιτελάρχη, τον βλάκα και τεμπέλη τον κάνεις στρατιώτη, τον βλάκα και εργατικό τον εκτελείς επί τόπου.", //Napoleon Bonaparte
    "Οι άνθρωποι αγωνίζονται πιο σκληρά για τα συμφέροντά τους παρά για τα δικαιώματά τους", //Napoleon Bonaparte
    "Πρέπει να είσαι ο εαυτός σου και όχι αυτός που θέλουν οι άλλοι.", //Friedrich Wilhelm Nietzsche
    "Αυτό που η κάμπια ονομάζει τέλος του κόσμου, η ζωή το λέει πεταλούδα.", //Λάο Τσε
    "Αν νιώθεις θλιμμένος, ζεις στο παρελθόν. Αν είσαι ανήσυχος, ζεις στο μέλλον. Αν είσαι γαλήνιος, ζεις στο παρόν.", //Λάο Τσε
    "Το να ξέρεις ότι δεν ξέρεις είναι το καλύτερο. Το να υποκρίνεσαι ότι ξέρεις, ενώ δεν ξέρεις, είναι αρρώστια.", //Λάο Τσε
    "Προκαλεί κανείς το ίδιο μίσος με τις καλές πράξεις όσο και με τις κακές.", //Niccolò Machiavelli
    "Ο άνθρωπος είναι το μόνο ζώο που τρώει χωρίς να πεινάει, πίνει χωρίς να διψάει και μιλάει χωρίς να έχει τίποτα να πει.", //Mark Twain
    "Καλοί τρόποι είναι η συμφιλίωση της μεγάλης ιδέας που έχουμε για τον εαυτό μας με τη μικρή ιδέα που έχουμε για τους άλλους.", //Mark Twain
    "Καλύτερα πρώτος στο χωριό παρά δεύτερος στη Ρώμη.", //Gaius Julius Caesar
    "Κάθε άνθρωπος είναι δημιούργημα της εποχής του. Πολλοί λίγοι είναι αυτοί που μπορούν να ανυψωθούν πάνω από τις ιδέες του καιρού τους.", //Voltaire
];

const originalQuotesArray = [...quotesArray];

const shuffleArray = (quotesArray) => {
    for(let i = quotesArray.length -1; i > 0; i--){
        const randomQuote = Math.floor(Math.random() * (i + 1));
        [quotesArray[i], quotesArray[randomQuote]] = [quotesArray[randomQuote], quotesArray[i]];
    };
};

const renderQuote = async() => {
    shuffleArray(quotesArray);
    quote = quotesArray[0];

    let arr = quote.split("").map(value =>{
        return "<span class='quote-chars'>" + value + "</span>";
    });

    quoteSection.innerHTML += arr.join("");
};

window.onload = () => {
    quoteInput.value = "";
    document.getElementById("start").style.display = "block"; 
    document.getElementById("stop").style.display = "none";
    quoteInput.disabled = true; 
    //renderQuote();
};

quoteInput.addEventListener("input", () => {
    let quoteChars = Array.from(document.querySelectorAll(".quote-chars"));
    let quoteInputChars = quoteInput.value.split("");

    quoteChars.forEach((char, index) => {
        if(quoteInputChars[index] == null){
            char.classList.remove("success", "fail");
        }else if(char.innerText === quoteInputChars[index]){
            char.classList.add("success");
            char.classList.remove("fail");
        }else{
            char.classList.add("fail");
            char.classList.remove("success");
        };
    });

    mistakes = document.querySelectorAll(".fail").length;
    if(totalMistakes == 0){
    document.getElementById("mistakes").innerText = mistakes;
    }else{
        document.getElementById("mistakes").innerText = mistakes + totalMistakes;
    };

    /*let check = quoteChars.every(element=>{
        return element.classList.contains("success");
    });*/

    if(quoteInput.value.length == quote.length){
        quote = "";
        quoteSection.innerHTML = "";
        charactersWritten = charactersWritten + quoteInput.value.length;
        totalMistakes = totalMistakes + mistakes;
        quoteInput.value = "";
        quotesArray.shift();
        if(quotesArray.length == 0){
            displayResult();
        }else{
            renderQuote();
        };
    };

    /*if(check){
        displayResult();
    };*/
    
});

function updateTimer(){
    if(time == 0){
        displayResult();
    }else{
        document.getElementById("timer").innerText = --time + "s";
    };    
};

const timeReduce = () => {
    time = 600;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    document.getElementById("restart").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop").style.display = "none";
    quoteInput.disabled = true;
    let timeTaken = 1;
    let endTime = Date.now();
    if(time != 0){
        timeTaken =(endTime - startTime) / 1000 / 60;
    };
    if(charactersWritten == 0){
        charactersWritten = quoteInput.value.length;
        totalMistakes = mistakes;

        document.getElementById("characters").innerText = charactersWritten;
        document.getElementById("time-taken").innerText = ((endTime-startTime)/1000).toFixed(2) + "s"
        document.getElementById("mistake").innerText = totalMistakes;
        document.getElementById("accuracy").innerText = (((charactersWritten - totalMistakes) / charactersWritten) * 100).toFixed(2) + "%";
        document.getElementById("speed").innerText = (charactersWritten / timeTaken).toFixed(2) + " (CPM)";

    }else{

        document.getElementById("characters").innerText = (charactersWritten + quoteInput.value.length);
        document.getElementById("time-taken").innerText = ((endTime-startTime)/1000).toFixed(2) + "s"
        document.getElementById("mistake").innerText = (totalMistakes+mistakes);
        document.getElementById("accuracy").innerText = ((((charactersWritten + quoteInput.value.length) - (totalMistakes+mistakes)) / (charactersWritten + quoteInput.value.length)) * 100).toFixed(2) + "%";
        document.getElementById("speed").innerText = (charactersWritten / timeTaken).toFixed(2) + " (CPM)";

    }

};

const startTest = () => {

    mistakes = 0;
    totalMistakes = 0;
    charactersWritten = 0;
    quote = "";
    time = 600;
    clearInterval(timer);
    
    document.getElementById("start").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("stop").style.display = "block";
    document.getElementById("mistakes").innerText = 0;
    document.getElementById("timer").innerText = time + "s";
    document.querySelector(".result").style.display = "none";
    quoteSection.innerHTML = "";
    quoteInput.value = "";

    quotesArray.length = 0;
    quotesArray.push(...originalQuotesArray);

    quoteInput.disabled = false;
    startTime = Date.now();
    timeReduce();
    renderQuote();
}


