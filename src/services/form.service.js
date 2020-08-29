import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "../misc/api-url";

const apiURL = API_URL + "/forms";

class FormService {
    initializeForm() {
        return axios.put(apiURL,
            null, { headers: authHeader() });
    }
    rollDice(formId, diceToRoll) {
        return axios.put(apiURL + "/" + formId + "/roll",
            diceToRoll, {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": authHeader().Authorization
                }
        });
    }
    announce(formId, announcementOrdinal) {
        return axios.put(apiURL + "/" + formId + "/announce",
            announcementOrdinal, {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": authHeader().Authorization
                }
        });
    }
    fillBox(formId, columnTypeOrdinal, boxTypeOrdinal) {
        return axios.put(apiURL + "/" + formId +
            "/columns/" + columnTypeOrdinal +
            "/boxes/" + boxTypeOrdinal + "/fill",
            null, { headers: authHeader() });
    }
    deleteForm(formId) {
        return axios.delete(apiURL + "/" + formId,
            { headers: authHeader() });
    }
}

export default new FormService();
