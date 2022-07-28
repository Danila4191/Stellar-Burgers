import baseUrl from "../../utils/utils"
export const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };
 
  
export function getIngredientsApi() {
  return fetch(`${baseUrl}/ingredients`).then((res)=>onResponce(res));
}

export const getOrderNumberApi = (data)=> {
    return fetch(`${baseUrl}/orders`, {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res)=>onResponce(res))   
  }
  