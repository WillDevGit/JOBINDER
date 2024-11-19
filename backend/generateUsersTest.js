import { getUsers, updateUsers } from "./user.js";
import { getCities } from "../frontend/scripts/location.js";

const imgs = [
  "j1.png",
  "j2.png",
  "j3.png",
  "j4.png",
  "j5.png",
  "mar1.jpg",
  "mar2.jpg",
  "mar3.jpg",
  "pin1.jpg",
  "pin2.jpg",
  "poda1.jpg",
  "poda2.jpg",
  "poda3.jpg",
  "s1.png",
  "s2.png",
  "s3.png",
  "s4.png",
  "s5.png",
  "s6.png",
  "s7.png",
  "s8.png",
  "s9.png",
  "s10.png",
];

let usersTest = {};

// Hash the string
const hash = (string) => {
  const hashedString = CryptoJS.SHA256(string).toString();
  return hashedString;
};

// Get the users from the API
const getRandomUser = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=23&nat=br");

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
  const users = await getRandomUser();
  const cities = await getCities("SP");

  users.forEach(async (user, index) => {
    // Hash the password
    const hashedPassword = hash(user.login.password);

    // Get the cellphone without special characters
    const cellphone = user.cell.replace(/[^0-9]/g, "");
    const id = cellphone;

    let specialties = null;

    const randomCity = cities[Math.floor(Math.random() * cities.length)].nome;

    if (index >= 0 && index <= 4) specialties = "Jardinagem";
    else if (index >= 5 && index <= 7) specialties = "Marcenaria";
    else if (index >= 8 && index <= 9) specialties = "Pintor";
    else if (index >= 10 && index <= 12) specialties = "Poda de Árvores";
    else if (index >= 13 && index <= 15) specialties = "Pedreiro";
    else if (index >= 13 && index <= 23) specialties = "Desenvolvedor de Software";
    else specialties = "Outros";

    let userTest = {
      [id]: {
        cellphone,
        fullName: `${user.name.first} ${user.name.last}`,
        password: hashedPassword,
        serviceProfile: {
          avaliability: "Segunda a Sexta",
          serviceImg: `../../backend/database/${imgs[index]}`,
          services:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
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
