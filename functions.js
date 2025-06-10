//function to fetch the category data
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories)
}
// loading pets by category
const loadPetsByCategory = async category=>{
    // Remove active button if exist
    removeActiveClasses()
    // Show active button
    addActiveClasses(category)
    loadingSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    
    setTimeout(()=>{
        displayPets(data.data);
        storedPetsData = data.data;
        // 2 second por spinner ta close kora hoche spinner er value false deuar karone
        loadingSpinner(false)
    }, 2000)
}

// Load Pets Details
const loadPetDetails = async id =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json();
    displayPetDetails(data.petData)
}

// display pet details
const displayPetDetails = data =>{
    const modalBody = document.getElementById('details-container')
    modalBody.innerHTML = `
    <img class="h-60 rounded-xl object-cover w-full" src="${data.image}"  />
    <h3 class="text-xl font-bold my-2">${data.pet_name}</h3>
    <div class="flex items-start gap-6">
        <div>
            <p class="text-gray-600 text-sm"><i class="fa-solid fa-paw"></i> Breed: ${data.breed ? data.breed : 'Not Available'}</p>
            <p class="text-gray-600 text-sm"><i class="fa-solid fa-venus-mars"></i> Gender: ${data.gender ? data.gender : 'Not Available'}</p>
            <p class="text-gray-600 text-sm"><i class="fa-solid fa-syringe"></i> Vaccinated Status: ${data.vaccinated_status ? data.vaccinated_status : 'Not Available'}</p>
        </div>
        <div>
        <p class="text-gray-600 text-sm"><i class="fa-solid fa-calendar-days"></i> Birth Date : ${data.date_of_birth ? data.date_of_birth : 'Not Available'}</p>
        <p class="text-gray-600 text-sm"><i class="fa-solid fa-dollar-sign"></i> Price: ${data.price ? "$" + data.price : 'Not Available'}</p>
        </div>
    </div>
    <hr class="my-2" />
    <h3 class="font-semibold text-md">Details Information</h3>
    <p class="text-sm text-gray-600">${data.pet_details ? data.pet_details : 'Not Available'}</p>
    `
    my_modal_2.showModal()
}

// showing category data on the ui
const displayCategories = data =>{
    const categoryContainer = document.getElementById('pet-categories')
    data.forEach(category => {
        console.log(category)
        const div = document.createElement('div')
        div.innerHTML = `
            <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex items-center gap-4
            rounded-xl border px-14 py-4 cursor-pointer h-full
            ">
                <img class="w-10" src="${category.category_icon}" alt=""/> <p class="text-xl font-bold">
                ${category.category}</p>
            </button>
        `
        categoryContainer.appendChild(div)
    })
}

// Loading all pets
const loadAllPets = async () =>{
    // spinner ta start kora hochee aikhane
    loadingSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    setTimeout(()=>{
        displayPets(data.pets);
        storedPetsData = data.pets;
        // 2 second por spinner ta close kora hoche spinner er value false deuar karone
        loadingSpinner(false)
    }, 2000)
}

// showing the single pets data by card
const displayPets = data => {
    const petContainers = document.getElementById('all-pets')
    // First a petContainers k empty rakhte hobe noy intialy j data thake oitar pasapashi 
    // specific category er data o load hoye jay. tai nicher tric ta kora hoiche
    // petContainers.innerHTML = '';

    if(data.length === 0){
        petContainers.classList.remove('grid')
        petContainers.innerHTML = `
            <div class="bg-gray-100 p-20 rounded-xl text-center space-y-4">
                <img class="mx-auto" src="./images/error.webp" />
                <h2 class="text-3xl font-semibold">No Data  Available<h2>
                <p class="text-gray-500">It is a long established fact that a reader will be distracted by the 
                readable content of a page when looking at its layout. The point of using 
                Lorem is that it it has a.</p>
            </div>
        `
        // data.length jodi empty thake taile aikhaner kaj sesh hoile r nicher kajgula jeno 
        // na kore tai return keyword ta use kora hoiche
        return
    }
    else{
        petContainers.classList.add('grid')
    }

    data.forEach(pet => {
        const div = document.createElement('div')
        div.classList.add('flex', 'flex-col', 'gap-2', 'p-4', 'border', 'rounded-xl', 'font-bold')

        div.innerHTML = `
            <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}" />
            <h3 class="text-xl">${pet.pet_name}</h3>
            <p class="text-sm text-gray-700">Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
            <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}</p>
            <p class="text-sm text-gray-700">Gender: ${pet.gender ? pet.gender : 'Not Available'}</p>
            <p class="text-sm text-gray-700">Price: ${pet.price ? "$"+ pet.price : 'Not Available'}</p>
            <hr class="my-2"/>

            <div class="flex justify-between items-center px-2">
                <button onclick="like('${pet.image}')" class="btn bg-white text-teal-700 border rounded-lg py-1"><i class="fa-regular fa-thumbs-up"></i></button>
                <button onclick="adoptModal(this)" class="btn bg-white text-teal-700 border rounded-lg py-1">Adopt</button>
                <button onclick="loadPetDetails('${pet.petId}')" class="btn bg-white text-teal-700 border rounded-lg py-1">Details</button>
            </div>

        `

        petContainers.appendChild(div)
    })
}

// adopt button functionality
const adoptModal = event => {
    let count = 3
    const countContainer = document.getElementById('countdown-container')
    countContainer.innerText = count
    my_modal_1.showModal()
    const interval = setInterval(() => {
        count--
        if(count !== 0) countContainer.innerText = count
        if(count < 1){
            clearInterval(interval)
            my_modal_1.close()
            event.textContent = 'Adopted'
            event.disabled = true
        }
    }, 1000)
}

// calling the function

loadCategories();
loadAllPets()