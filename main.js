let mock_data = { "app_name": "", "version": "", "description": "" };
let check = false

function fun2() {
    fetch('https://cbcf-106-219-164-121.ngrok-free.app/get_system_info', {
                headers: { "ngrok-skip-browser-warning": "true" }
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(response => {
                throw new Error(response.substring(11, responslength - 2));
                    });
        }
        return res.json();
    })
    .then(data => {
        mock_data["app_name"] = data["device_model"];
        mock_data["version"] = data["os_version"];
        mock_data["description"] = data["memory"];
        check = true
        document.getElementById("app_name").textContent = data["device_model"];
        document.getElementById("version").textContent = data["os_version"];
        document.getElementById("description").textContent = data["memory"];


        document.getElementById("id3").classList.remove("hidden");
    })
    .catch(e => {
        Swal.fire({
            icon: "error",
            text: `${e}`,
            className: "sweetBox"
        });
    });
}

function fun3() {
    if (check) {
        fetch('https://cbcf-106-219-164-121.ngrok-free.app/app', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mock_data)
        })
        .then(res => res.json())
        .then(response => {
            Swal.fire({
                icon: "success",
                text: "Data saved successfully!",
                className: "sweetBox"
            });
        })
        .catch(e => {
            Swal.fire({
                icon: "error",
                text: `${e}`,
                className: "sweetBox"
            });
        });
    }
}