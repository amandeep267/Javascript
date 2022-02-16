async function getData(uId) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("skc@gmail.com"), 1000)
      });
    
      let result = await promise; // wait until the promise resolves (*)
      console.log("Email id of the user id is: " + result);
      console.log("end");
    
}
     console.log("start");
     getData("skc");
     
    