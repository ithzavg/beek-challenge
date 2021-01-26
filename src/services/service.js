import http from "../http-common";

const spaceId = "1t4hjzo7y0kb"
const env = "master"

class ChallengeDataService{

    getAllAudiobooks(){
        return http.get(`/spaces/${spaceId}/environments/${env}/entries?select=fields,sys.id,sys.version&locale=es-MX`);
    }

    getAudiobook(id){
        return http.get(`/spaces/${spaceId}/environments/${env}/entries?sys.id=${id}&select=fields,sys.id,sys.version&locale=es-MX`);
    }

    createAudiobook(data){
        return http.post(`/spaces/${spaceId}/environments/${env}/entries`, data);
    
    }

    deleteAudiobook(id){
        return http.delete(`/spaces/${spaceId}/environments/${env}/entries/${id}`);
    }

    searchAudioBook(searchString){
        return http.get(`/spaces/${spaceId}/environments/${env}/entries?query=${searchString}&select=fields,sys.id&locale=es-MX&content_type=audiocontent-v16`)
    }

    updateAudioBook(id, data, version){
        return http.put(`/spaces/${spaceId}/environments/${env}/entries/${id}`,  data, 
                        {
                            headers: {
                                'X-Contentful-Version': version
                            }
                        })
    }
}

export default new ChallengeDataService();