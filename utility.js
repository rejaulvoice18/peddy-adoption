// Save/store currently fetched pets data
let storedPetsData = []
// Loading spinner
const loadingSpinner = show => {
    const spinner = document.getElementById('loader');
    if (show) {
        spinner.classList.remove('hidden')
        document.getElementById('all-pets').innerHTML = ''
        // First a petContainers k empty rakhte hobe noy intialy j data thake oitar pasapashi 
        // specific category er data o load hoye jay. tai nicher tric ta kora hoiche
    } else {
        spinner.classList.add('hidden')
    }
}

// Remove active button styles
const removeActiveClasses = () =>{
    //category button theke sob active class remove  korar jonno .category-btn class ta k dhora hoiche
    const allButtons = document.querySelectorAll('.category-btn')
    for(btn of allButtons){
        btn.classList.remove('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border-2')
        btn.classList.add('rounded-xl')
    }
}

// Add active classes
const addActiveClasses = category =>{
    const activeButton = document.getElementById(`btn-${category}`)
    activeButton.classList.remove('rounded-xl');
    activeButton.classList.add('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border-2')
}

// handle like button
const like = imgUrl =>{
    const imageContainer = document.getElementById('liked-pets');
    const div = document.createElement('div');
    div.innerHTML = `<img  src="${imgUrl}" class="rounded-lg" />`
    imageContainer.appendChild(div)
}

// handle sort data
const sort = () =>{
    // loadingSpinner ta call kora hoiche karon displaypets ta khali korar jonno
    loadingSpinner(true);
    const sortedData = storedPetsData.sort((a, b) => b.price - a.price);
    setTimeout(()=>{
        loadingSpinner(false)
        displayPets(sortedData)
    }, 500)
}