import http from "../http-common";

class ChallengeDataService{

    getAllAudiobooks(baseUrl, spaceId, env){
        return http.get(`${baseUrl}/spaces/${spaceId}/environments/${env}/entries?select=fields,sys.id,sys.version&locale=es-MX`);
    }

    getAudiobook(baseUrl, spaceId, env,id){
        return http.get(`${baseUrl}/spaces/${spaceId}/environments/${env}/entries?sys.id=${id}&select=fields,sys.id,sys.version&locale=es-MX`);
    }

    createAudiobook(baseUrl, spaceId, env, data){
        return http.post(`${baseUrl}/spaces/${spaceId}/environments/${env}/entries`, data);
    
    }

    deleteAudiobook(baseUrl, spaceId, env,id){
        return http.delete(`${baseUrl}/spaces/${spaceId}/environments/${env}/entries/${id}`);
    }

    searchAudioBook(baseUrl, spaceId, env, searchString){
        return http.get(`${baseUrl}/spaces/${spaceId}/environments/${env}/entries?query=${searchString}&select=fields,sys.id&locale=es-MX`)
    }
}

export default new ChallengeDataService();