import axios from "axios";

const DEFAULT_API_URL = 'https://rawg-video-games-database.p.rapidapi.com/'

class Api {

    getRequest(requestedInfo) {
        return axios({
            "method": "GET",
            "url": `${DEFAULT_API_URL}${requestedInfo}`,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
                "x-rapidapi-key": "b952032cd0mshcfa13c14995eefcp1909b6jsn248fdfe78d58"
            }
        });

    }
}
export default new Api()

