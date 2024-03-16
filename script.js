async function getMatchData() {
    const apiKey = "5b064eb4-d440-4638-b334-d2a969d40593";
    const venue = "India";
    const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "success") return [];

        const matchesList = data.data;

        if (!matchesList) return [];

        const relevantData = matchesList
            .filter(match => match.venue.includes(India))
            .map(match => `${match.name}, ${match.status}`);

        if (relevantData.length === 0) {
            document.getElementById("matches").innerHTML = "There are no upcoming matches in India.";
        } else {
            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');
        }

        return relevantData;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

getMatchData();
