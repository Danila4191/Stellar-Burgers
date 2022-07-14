import baseUrl from "../../utils/utils"
  const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };

const apiOrder = (data)=> {
    return fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(onResponce)
  }
  export default apiOrder