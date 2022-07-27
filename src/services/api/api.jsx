import baseUrl from "../../utils/utils"
export const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };
 
   export  const apiOrder = (data)=> {
    return fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(onResponce)
  }
  