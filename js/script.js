
// fetching all 
const fetchAllPets = async () => {
  try {
    showLoader();
    const url = 'https://openapi.programming-hero.com/api/peddy/pets';
    const res = await fetch(url);
    const data = await res.json();
    await delay(2000);
    displayAllPets(data.pets)
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

// fetching single specific pet details 
const FetchPetDetailsByID = async (petId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    showingSinglePetDetails(data.petData);
  } catch (error) {
    console.log(error);
  }
}

//fetching all Pet Categories
const fetchingAllPetCategories = async () => {
  try {
    const url = 'https://openapi.programming-hero.com/api/peddy/categories';
    const res = await fetch(url);
    const data = await res.json();
    showingAllPetCategories(data.categories);
  } catch (error) {
    console.log(error);
  }

}
//Fetch Pets by Category
const FetchPetsByCategory = async (category) => {

  try {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
    const res = await fetch(url);
    const data = await res.json();
    forActiveCategoryBtnRemove();
    const forActiveBtn = document.getElementById(`forActive-${category}`)
    forActiveBtn.classList.add('custom-active-btn')
    await delay(2000);
    displayAllPets(data.data);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

//for active category button remove
const forActiveCategoryBtnRemove = () => {
  const activeButton = document.getElementsByClassName('forRemoveActive');
  for (let btn of activeButton) {
    btn.classList.remove('custom-active-btn');
  }
}

//for like button and add image that specific pets
const forAddingThumbnail = (img) => {
  const addThumbnail = document.getElementById('thumbnail');
  const thumbnailDiv = document.createElement('div');
  thumbnailDiv.innerHTML = `
    <img src=${img} alt="" class="rounded-xl  w-full object-contain">
  `;
  addThumbnail.append(thumbnailDiv);
}

//for adopt modal
const adopting = (petId) => {
  const countNumber = document.getElementById('count-number');
  countNumber.innerText = '';
  let count = 3;
  document.getElementById('adoptingModal').showModal();
  const countId = setInterval(() => {
    countNumber.innerText = count;
    count--;
    if (count === 0) {
      clearInterval(countId);
      document.getElementById('closeBtn').click()
    }
  }, 1000)
  const disable = document.getElementById(`adoptDisable-${petId}`);
  disable.disabled = true;
}

//for display all pets.................
const displayAllPets = (pets) => {
  document.getElementById('shorting-price').addEventListener('click', function () {
    pets.sort((a, b,) => b.price - a.price);
    displayAllPets(pets);
  })
  const cards = document.getElementById('cards');
  cards.innerHTML = '';

  if (pets.length === 0) {
    cards.classList.remove('grid')
    cards.innerHTML = `
      <div class="flex flex-col justify-center items-center space-y-6 py-14 sm:py-28 rounded-3xl bg-[#13131305] text-center">
      <img src="images/error.webp" alt="">
      <h4 class="text-base sm:text-3xl font-bold text-[#131313]">No Information Available</h4>
      <p class="text-[#131313B3] w-10/12">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
  } else {
    cards.classList.add('grid')
  }

  pets.forEach(pet => {
    const card = document.createElement('div');
    card.classList.add('p-2', 'sm:p-5', 'border', 'border-solid', 'rounded-xl', 'border-[#13131319]')
    card.innerHTML = `
      
      <img src="${pet.image}" alt="" class="mb-6 rounded-xl w-full object-contain">
            <div class="space-y-1">
              <h6 class="text-xl font-bold text-[#131313]">${pet.pet_name}</h6>
              <p class="flex items-center gap-1">
                <img src="images/Frame.png" alt="">
                Breed: ${pet?.breed ? pet.breed : 'Not Found'}</p>
              <p><i class="fa-solid fa-calendar-days mr-1"></i>
                Birth: ${pet?.date_of_birth ? pet.date_of_birth.substring(0, 4) : 'Not Found'}</p>
              <p><i class="fa-solid fa-mercury mr-1"></i>
                Gender: ${pet?.gender ? pet.gender : 'Not Found'}</p>
              <p><i class="fa-solid fa-dollar-sign mr-1"></i>
                Price : ${pet?.price ? pet.price : 'Not Found'}$</p>
            </div>
            <div class="my-4"><hr></div>
            <div class="flex justify-between">
              <button class="py-2 px-2 sm:px-4 rounded-lg border border-solid border-[#0E7A8126] hover:border-[#0E7A81] hover:bg-[#0E7A8126] hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105" onclick="forAddingThumbnail('${pet.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
              <button class="rounded-lg border border-solid border-[#0E7A8126] py-2 px-2 sm:px-4 text-[#0E7A81] font-bold text-base sm:text-xl text-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#0E7A81] hover:bg-[#0E7A8126] hover:text-[#0e7981ba] hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105" onclick="adopting('${pet.petId}')" id="adoptDisable-${pet.petId}">Adopt</button>
              <button class="rounded-lg border border-solid border-[#0E7A8126] text-[#0E7A81] font-bold text-base sm:text-xl py-2 px-2 sm:px-4 text-center hover:border-[#0E7A81] hover:bg-[#0E7A8126] hover:text-[#0e7981b6] hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105" onclick="FetchPetDetailsByID('${pet.petId}')">Details</button>
            </div>
    `;

    cards.append(card);
  });
}

//for the display a single specific pet details
function showingSinglePetDetails(petData) {
  const modalContent = document.getElementById('modalContent');

  modalContent.innerHTML = `
    <div class="p-1 sm:p-5 ">
      <img src=${petData?.image} alt="" class="mb-6 w-full h-full object-contain rounded-xl">
      <div class="space-y-1">
        <h6 class="text-xl font-bold text-[#131313]">${petData?.pet_name}</h6>
        <div class="sm:flex gap-5 sm:gap-11">
          <div>
            <p class="flex items-center gap-1">
              <img src="images/Frame.png" alt="">
              Breed: ${petData?.breed ? petData.breed : 'Not Found'}
            </p>
            <p><i class="fa-solid fa-mercury mr-1"></i>
              Gender: ${petData?.gender ? petData.gender : 'Not Found'}</p>
            <p><i class="fa-solid fa-mercury mr-1"></i>
              Vaccinated status: ${petData?.vaccinated_status ?
      petData?.vaccinated_status : 'Not Found'}
            </p>
          </div>
          <div>
            <p><i class="fa-solid fa-calendar-days mr-1"></i>
              Birth: ${petData?.date_of_birth ? petData.date_of_birth.substring(0, 4) : 'Not Found'}</p>
            <p><i class="fa-solid fa-dollar-sign mr-1"></i>
              Price : ${petData?.price ? petData.price : 'Not Found'}$</p>
          </div>
        </div>
      </div>
      <div class="my-4">
        <hr>
      </div>
      <div class="">
       <h3 class="text-[#131313] font-semibold mb-2">Details Information</h3>
       <p class="mb-4">${petData?.pet_details
      ? petData.pet_details
      : 'Not Found'}</p>
      </div>
    </div>
  `;

  document.getElementById('customModal').showModal();
}

//for displaying all pet categories 
const showingAllPetCategories = (categories) => {
  const categoriesContainer = document.getElementById('categories');

  categories.forEach((item) => {
    const category = document.createElement('div');
    category.classList = 'p-6 rounded-2xl border border-solid border-[#0E7A8126] hover:shadow-lg hover:border-[#0E7A81] transition duration-300 ease-in-out';
    category.innerHTML = `
      <button onclick="FetchPetsByCategory('${item?.category}')" 
             class="flex justify-center items-center gap-2 w-full forRemoveActive"
             id="forActive-${item?.category}">
      <img src=${item?.category_icon} alt="">
      <p class="font-bold text-lg sm:text-2xl text-[#131313] ">${item?.category}</p>
      </button>
    `;

    categoriesContainer.append(category);
  })
}

fetchAllPets();
fetchingAllPetCategories();