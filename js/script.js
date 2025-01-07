
// fetching all 
const fetchAllPets = async() => {
  const url = 'https://openapi.programming-hero.com/api/peddy/pets';
  const res = await fetch(url);
  const data = await res.json();
  displayAllPets(data)
}

const displayAllPets = ({pets}) => {
  const cards = document.getElementById('cards');

  pets.forEach(pet => {
    console.log(pet);

    const card = document.createElement('div');
    card.classList.add('p-5', 'border', 'border-solid', 'rounded-xl', 'border-[#13131319]')
    card.innerHTML = `
      <img src="${pet.image}" alt="" class="mb-6 rounded-xl">
            <div class="space-y-1">
              <h6 class="text-xl font-bold text-[#131313]">${pet.pet_name}</h6>
              <p class="flex items-center gap-1">
                <img src="images/Frame.png" alt="">
                Breed: ${pet.breed}</p>
              <p><i class="fa-solid fa-calendar-days mr-1"></i>
                Birth: ${pet?.date_of_birth ? pet.date_of_birth.substring(0, 4): ''}</p>
              <p><i class="fa-solid fa-mercury mr-1"></i>
                Gender: ${pet.gender}</p>
              <p><i class="fa-solid fa-dollar-sign mr-1"></i>
                Price : ${pet.price}$</p>
            </div>
            <div class="my-4"><hr></div>
            <div class="flex justify-between">
              <button class="py-2 px-2 sm:px-4 rounded-lg border border-solid border-[#0E7A8126]"><i class="fa-regular fa-thumbs-up"></i></button>
              <button class="rounded-lg border border-solid border-[#0E7A8126] py-2 px-2 sm:px-4 text-[#0E7A81] font-bold text-base sm:text-xl text-center">Adopt</button>
              <button class="rounded-lg border border-solid border-[#0E7A8126] text-[#0E7A81] font-bold text-base sm:text-xl py-2 px-2 sm:px-4 text-center">Details</button>
            </div>
    `;

    cards.append(card);
  });
}


fetchAllPets();