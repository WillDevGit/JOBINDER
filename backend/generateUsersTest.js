import { getUsers, updateUsers } from "./user.js";
import { getCities } from "./location.js";
import {
  jardineiroServices,
  marceneiroServices,
  pintorServices,
  DJServices,
  advocaciaServices,
  personalServices,
  manicureServices,
  cozinheiroServices,
  eletricistaServices,
  encanadorServices,
  desenvolvedorServices,
  saudeServices,
} from "./servicesTest.js";

const imgs = [
  "adv1.jpeg",
  "adv2.jpeg",
  "adv3.jpeg",
  "coz1.jpeg",
  "coz2.jpeg",
  "coz3.jpeg",
  "dj1.jpeg",
  "dj2.jpeg",
  "dj3.jpeg",
  "ele1.jpeg",
  "ele2.jpeg",
  "ele3.jpeg",
  "enc1.jpeg",
  "enc2.jpeg",
  "enc3.jpeg",
  "j1.png",
  "j2.png",
  "j3.png",
  "j4.png",
  "j5.png",
  "man1.jpeg",
  "man2.jpeg",
  "man3.jpeg",
  "mar1.jpg",
  "mar2.jpg",
  "mar3.jpg",
  "per1.jpeg",
  "per2.jpeg",
  "per3.jpeg",
  "pin1.jpg",
  "pin2.jpg",
  "s1.png",
  "s2.png",
  "s3.png",
  "s4.png",
  "s5.png",
  "s6.png",
  "sau1.jpeg",
  "sau2.jpeg",
  "sau3.jpeg",
];

const usersToGenerate = 40;
let usersTest = {};

// Hash the string
const hash = (string) => {
  const hashedString = CryptoJS.SHA256(string).toString();
  return hashedString;
};

// Get the users from the API
const getRandomUsers = async () => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${usersToGenerate}&nat=br`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

// Save the users in the database
const createUsersTest = async () => {
  const users = await getRandomUsers();
  const cities = await getCities("SP");

  // Garantir que apenas 4 cidades sejam usadas para fins de teste
  const selectedCities = cities.slice(0, 3).concat({ nome: "São Paulo", codigo_ibge: "3550308" });

  users.forEach(async (user, index) => {
    // Hash the password
    const hashedPassword = hash(user.login.password);

    // Get the cellphone without special characters
    const cellphone = user.cell.replace(/[^0-9]/g, "");
    const id = cellphone;

    let specialties = null;

    const randomCity = selectedCities[Math.floor(Math.random() * selectedCities.length)].nome;

    if (index >= 0 && index <= 2) specialties = "Advocacia";
    else if (index >= 3 && index <= 5) specialties = "Cozinheiro";
    else if (index >= 6 && index <= 8) specialties = "Musica";
    else if (index >= 9 && index <= 11) specialties = "Eletricista";
    else if (index >= 12 && index <= 14) specialties = "Encanador";
    else if (index >= 15 && index <= 19) specialties = "Jardinagem";
    else if (index >= 20 && index <= 22) specialties = "Manicure";
    else if (index >= 23 && index <= 25) specialties = "Marcenaria";
    else if (index >= 26 && index <= 28) specialties = "Personal";
    else if (index >= 29 && index <= 30) specialties = "Pintor";
    else if (index >= 31 && index <= 36) specialties = "Desenvolvedor de Software";
    else if (index >= 37 && index <= 39) specialties = "Saude";
    else specialties = "Outros";

    // Generate a random rating
    const rating = Math.floor(Math.random() * 5) + 1;

    // Generate a random number of services performed
    const servicesPerformed = Math.floor(Math.random() * 100) + 1;

    let services = "";
    switch (specialties) {
      case "Jardinagem":
        services = jardineiroServices[Math.floor(Math.random() * jardineiroServices.length)];
        break;
      case "Marcenaria":
        services = marceneiroServices[Math.floor(Math.random() * marceneiroServices.length)];
        break;
      case "Pintor":
        services = pintorServices[Math.floor(Math.random() * pintorServices.length)];
        break;
      case "Musica":
        services = DJServices[Math.floor(Math.random() * DJServices.length)];
        break;
      case "Advocacia":
        services = advocaciaServices[Math.floor(Math.random() * advocaciaServices.length)];
        break;
      case "Personal":
        services = personalServices[Math.floor(Math.random() * personalServices.length)];
        break;
      case "Manicure":
        services = manicureServices[Math.floor(Math.random() * manicureServices.length)];
        break;
      case "Cozinheiro":
        services = cozinheiroServices[Math.floor(Math.random() * cozinheiroServices.length)];
        break;
      case "Eletricista":
        services = eletricistaServices[Math.floor(Math.random() * eletricistaServices.length)];
        break;
      case "Encanador":
        services = encanadorServices[Math.floor(Math.random() * encanadorServices.length)];
        break;
      case "Desenvolvedor de Software":
        services = desenvolvedorServices[Math.floor(Math.random() * desenvolvedorServices.length)];
        break;
      case "Saude":
        services = saudeServices[Math.floor(Math.random() * saudeServices.length)];
        break;
    }

    let userTest = {
      [id]: {
        cellphone,
        fullName: `${user.name.first} ${user.name.last}`,
        rating,
        password: hashedPassword,
        serviceProfile: {
          servicesPerformed,
          avaliability: "Segunda a Sexta",
          serviceImg: `../../backend/database/${imgs[index]}`,
          services,
          specialties,
          location: {
            state: "São Paulo",
            city: randomCity,
          },
        },
      },
    };

    // Add the userTest to the usersTest
    usersTest[id] = userTest[id];
  });

  // Save the users in the database
  updateUsers(usersTest);
};

// Check if users have already been generated
const initializeUsers = async () => {
  const usersInStorage = getUsers();
  // Only create users if they haven't been created before
  if (!usersInStorage || Object.keys(usersInStorage).length === 0) {
    await createUsersTest();
  } else {
    console.log("Usuários já foram gerados anteriormente.");
  }
};

// Call the initialize function
initializeUsers();
