const getRandomUser = async() => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

console.log(getRandomUser());