import axios from 'axios';

export function CallFormula(name, id_fomula) {
    return axios.get('http://localhost:5000/api/data/search', { 
        params: {
            name: name,
            id_fomula: id_fomula
        }
    })
    .then((response) => {
        console.log('Response from API:', response.data);
        if (response.data && response.data.formula) {
            return response.data.formula; 
        } else {
            return "No formula found";   
        }
    })
    .catch((error) => {
        console.error('Error fetching formula:', error);
        return "Error occurred"; 
    });
}

export default CallFormula;
