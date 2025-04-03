let mock_data = {
    "app_name":"",
    "version":"",
    "description":""
};

function fun2(){
    fetch('https://3844-106-219-164-121.ngrok-free.app/get_system_info',{
    headers: {
        "ngrok-skip-browser-warning": "true"
    }}).
    then(res => {
        if (!res.ok) {
            return res.text().then(response => {
                throw new Error(response.substring(11,response.length-2))
            }) 
        }
        return res.json()}
)
    .then(data =>{
        mock_data["app_name"] = data["device_model"]
        mock_data["version"] = data["os_version"]
        mock_data["description"] = data["memory"]
    })
    .catch(e => {
        swal.fire({
            icon:"error",
            text: `${e}`,
            className: "sweetBox"
          })
    })
}

function fun3(){
    fetch('https://3844-106-219-164-121.ngrok-free.app/app',{
        method:'POST',
        headers:{"Content-type":"application/json","ngrok-skip-browser-warning": "true"},
        body:JSON.stringify(mock_data)
    })
    .then(res => {
        if (!res.ok) {
            //res.text is itself a promise response is the result of promise
            return res.text().then(response => {
                throw new Error(response.substring(11,response.length-2))
                //response.substring for customising the format of error send by the backend
            })  
        }
        //we can also show the customise error message into frontend
        return res.json()
        //first of all convert the content of backend into json format
    })
    .then(data =>{   
        console.log(data);
        
    })
    .catch(e => {
        swal.fire({
            icon:"error",
            text: `${e}`,
            className: "sweetBox"
          })
    })
}
