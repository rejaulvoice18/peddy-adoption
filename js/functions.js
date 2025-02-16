

//Here menu data loaded by calling API
const loadMenuData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayMenu(data.categories))
    .catch(error => console.log(error))
}

// Remove active class function

const removeActiveClass = () => {
    const menus = document.getElementsByClassName('category-menu');

    for(let btn of menus){
        btn.classList.remove('active');
    }
}

//Loaded single category pet by ID API
const loadSingleCategoryImage = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => {
        
        //removed active class frome every menus by clalling this function
        removeActiveClass()

        // adding active class to the current menu
        const activeButton = document.getElementById(`btn-${id}`);
        activeButton.classList.add('active');
        // spinner mechanism blocking the div and loding the pets card after 2 seconds
        document.getElementById('spiner').style.display = "block"
        document.getElementById('image_card_container').style.display = "none"
        document.getElementById("right_side_bar").style.display = "none"

        setTimeout(() => {
            displayPetsData(data.data)
            document.getElementById("right_side_bar").style.display = "block"
        },2000)
    })
    .catch(error => console.log(error))
}

// Data Sorting in Descending order
const sortData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {
      let single = data.pets
      single.sort((a, b) => (a.price > b.price ? -1 : 1));
      displayPetsData(data.pets);
    })
    .catch(error => console.log(error))
}


//Load single image details by calling API
const loadPetsDetails = async (details) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${details}`
    const res = await fetch(uri);
    const data = await res.json();
    displayPetsDetails(data.petData)
}

//Load single image details by calling API
const loadPetsImage = async (petImg) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petImg}`
    const res = await fetch(uri);
    const data = await res.json();
    displayLikedPet(data.petData);
}

// Display pets details this function
const displayPetsDetails = (singleDetail) =>{
    const petDetailsContainer = document.getElementById('modal-content');

    
    petDetailsContainer.classList = "card card-compact p-3 border rounded-lg"
    petDetailsContainer.innerHTML = `
        <figure class="h-[200px]">
                <img
                src=${singleDetail.image}
                class="h-full w-full object-cover rounded-lg"
                alt="Shoes" />
            </figure>
            <div class="px-0 py-2">
                <h1 class="text-xl font-bold text-[#131313]">${singleDetail.pet_name}</h1>
                <div class="flex gap-5">
                    <div class="flex items-center -ml-3">
                        <img class="w-[40px] h-[40px]" src="./images/bread.png" />
                        <p>Breed: ${singleDetail.breed}</p>
                    </div>
                    <div class="flex items-center -ml-3">
                        <img class="w-[40px] h-[40px]" src="./images/birth.png" />
                        <p>Birth: ${singleDetail.date_of_birth}</p>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex items-center -ml-3">
                        <img class="w-[40px] h-[40px]" src="./images/gender.png" />
                        <p>Gender: ${singleDetail.gender}</p>
                    </div>
                    <div class="flex items-center -ml-3">
                        <img class="w-[40px] h-[40px]" src="./images/price.png" />
                        <p>Price: ${singleDetail.price}</p>
                    </div>
                </div>
                <div class="flex items-center -ml-3">
                        <img class="w-[40px] h-[40px]" src="./images/gender.png" />
                        <p>Vaccinated status: ${singleDetail.price}</p>
                    </div>
                <div class="card-actions border-t pt-5">
                   <div>
                        <h2 class="text-xl font-bold">Details Information</h2>
                        <p class="mt-3">${singleDetail.pet_details}</p>
                   </div>
                </div>
            </div>
    `
    
    document.getElementById('custom_modal').showModal();
}


// Display adopted modal
const adoptThePet2 = async (adopt) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${adopt}`)
    .then(res => res.json())
    .then(data => {
        const displayBtn = document.getElementById(`disableBtn-${adopt}`);
        displayBtn.classList.add('disable');
    })
    .catch(error => console.log(error))
  
    const countElement = document.getElementById('count');
    const closeBtn = document.getElementById('closeBtn')

    let num = 3;
    let clockId = setInterval(() => {
        if(num <= 1){

           setTimeout(()=>{
                clearInterval(clockId);
                //Automatically close the modal once the task is done
                closeBtn.click();
           },1001)
        }
        countElement.innerHTML = num;
        num--;
    }, 1000)
    document.getElementById('custom_modal_2').showModal();
    // let count = document.getElementById('count_down').countDown();
}



// Display liked data by this function
const displayLikedPet = (petImage) => {
    const petImageContainer = document.getElementById('image-container');
    
    const imageWrap = document.createElement('div');
    imageWrap.innerHTML = `
        <img class="rounded-lg" src=${petImage.image} />
    `
    petImageContainer.append(imageWrap);
}
// loaded all pictures and data by calling API here
const loadPetAllData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayPetsData(data.pets))
    .catch(error => console.log(error))
}

// By this function displaying the every single pets details
const displayPetsData = pets => {
    // spinner
    document.getElementById('spiner').style.display = "none"
    document.getElementById('image_card_container').style.display = "block";
    const imageContainer = document.getElementById('images-and-details');
    imageContainer.innerHTML = "";

    // Display empty data message

    if(pets.length == 0){
        imageContainer.classList.remove("grid");
        imageContainer.innerHTML = `
            <div class="bg-gray-200 p-7 rounded-lg min-h-[300px] flex flex-col justify-center items-center space-y-5 text-center">
                <img src="./images/error.webp" />
                <h2 class="text-2xl font-bold">No Information Available</h2>
                <p>It is a long established fact that a reader will be distracted by the readable 
                content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a</p>
            </div>
        `
        return;
    }
    else{
        imageContainer.classList.add("grid");
    }

    

    // loading and showing every single image by forEach
    pets.forEach(singleImage => {

        //creating a card
        const card = document.createElement('div');
        card.classList = 'card card-compact gap-5 p-3 border rounded-lg'
        card.innerHTML = `
            <figure class="h-[200px]">
                <img
                src=${singleImage.image}
                class="h-full w-full object-cover rounded-lg"
                alt="Shoes" />
            </figure>
            <div class="px-0 py-2">
                <h1 class="text-xl font-bold text-[#131313]">${singleImage.pet_name}</h1>
                <div class="flex items-center -ml-3">
                    <img class="w-[40px] h-[40px]" src="./images/bread.png" />
                    <p>Breed: ${singleImage.breed ? singleImage.breed : "Not available"}</p>
                </div>
                <div class="flex items-center -ml-3">
                    <img class="w-[40px] h-[40px]" src="./images/birth.png" />
                    <p>Birth: ${singleImage.date_of_birth ? singleImage.date_of_birth : "Not Available"}</p>
                </div>
                <div class="flex items-center -ml-3">
                    <img class="w-[40px] h-[40px]" src="./images/gender.png" />
                    <p>Gender: ${singleImage.gender ? singleImage.gender : "Not Available"}</p>
                </div>
                <div class="flex items-center -ml-3">
                    <img class="w-[40px] h-[40px]" src="./images/price.png" />
                    <p>Price: ${singleImage.price == null ? "Not Available" : singleImage.price}</p>
                </div>
                <div class="card-actions border-t pt-5">
                   <div class="flex gap-2">
                         <button onclick="loadPetsImage(${singleImage.petId})" class="btn btn-outline px-2 py-0"><i class="px-2 text-xl fa-regular fa-thumbs-up"></i></button>
                         <button id="disableBtn-${singleImage.petId}" onclick="adoptThePet2(${singleImage.petId})" class="btn btn-outline px-2 py-0 text-[#0E7A81]">Adopt</button>
                         <button onclick="loadPetsDetails(${singleImage.petId})" class="btn btn-outline px-2 py-0 text-[#0E7A81]">Details</button>
                   </div>
                </div>
            </div>
        `
        imageContainer.append(card);
    })
}


//This is a function to display menu on website
const displayMenu = menu => {
    const menuContainer = document.getElementById('menu-data');
   
    
    //showing menu one by one by forEach
    menu.forEach( singleMenu => {
   
        // creating a div
     
        const menuRapper = document.createElement('div');
        menuRapper.innerHTML = `
            
            <button id="btn-${singleMenu.category}" onclick='loadSingleCategoryImage("${singleMenu.category}")' class="btn category-menu px-6"><img class="w-[24px] h-[25px]" src=${singleMenu.category_icon} /> ${singleMenu.category}</button>
        `
        // I have just passed the ${singleMenu.category} without double cotation and
        // I got a error lik this "uncaught ReferenceError: Dog is not defined". 
        // After using Double couttation it got resolved
        // appending the rapper to the menu caontainer
        menuContainer.append(menuRapper);
    })
}

// From here calling menu function to display menu on website
loadMenuData();
loadPetAllData();