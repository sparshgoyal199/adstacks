let mock_data = {
    "app_name":"",
    "version":"",
    "description":""
};

function fun1(){
    fetch('http://127.0.0.1:8080/start_emulator',{
        method:'POST',
        //body:forms
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
        
        //here we cant write swal function as it is asynchr code(which runs always in last) and our page is loading automatically page loading prevent running of async code that's why simple alert here
    })
    .catch(e => {
        swal.fire({
            icon:"error",
            text: `${e}`,
            className: "sweetBox"
          })
    })
}

function fun2(){
    fetch('http://127.0.0.1:8080/get_system_info').
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
    fetch('http://127.0.0.1:8080/app',{
        method:'POST',
        headers:{"Content-type":"application/json"},
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
        
        //here we cant write swal function as it is asynchr code(which runs always in last) and our page is loading automatically page loading prevent running of async code that's why simple alert here
    })
    .catch(e => {
        swal.fire({
            icon:"error",
            text: `${e}`,
            className: "sweetBox"
          })
    })
}
