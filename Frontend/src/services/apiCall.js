import axios from "axios";

//bar bar axios ka code na likhna pary es liya ek function ko used kar lyngy

export const commonrequest = async (methods, url, body, headers) => {
  let config = {
    method: methods,
    url: url,
    header: headers
      ? headers
      : {
          "content-Type": "application/json",
        }, //in above we used two headers because for register+edit we used content type multiple form-data hogi and when get request then content type application json
    data: body,
  };

  //axios instance

  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });

  
    
};
