let mock_data = { "app_name": "", "version": "", "description": "" };
let check = false

// function fun2() {
//     fetch('https://cbcf-106-219-164-121.ngrok-free.app/get_system_info', {
//                 headers: { "ngrok-skip-browser-warning": "true" }
//     })
//     .then(res => {
//         if (!res.ok) {
//             return res.text().then(response => {
//                 throw new Error(response.substring(11, responslength - 2));
//                     });
//         }
//         return res.json();
//     })
//     .then(data => {
//         mock_data["app_name"] = data["device_model"];
//         mock_data["version"] = data["os_version"];
//         mock_data["description"] = data["memory"];
//         check = true
//         document.getElementById("infoContainer").style.display = 'block'
//         document.getElementById("app_name").textContent = data["device_model"];
//         document.getElementById("version").textContent = data["os_version"];
//         document.getElementById("description").textContent = data["memory"];


//         document.getElementById("id3").classList.remove("hidden");
//     })
//     .catch(e => {
//         Swal.fire({
//             icon: "error",
//             text: `${e}`,
//             className: "sweetBox"
//         });
//     });
// }

function fun2() {
    // Show loader and update button text
    document.getElementById("buttonText").textContent = "Loading...";
    document.getElementById("loader").classList.remove("hidden");

    fetch('https://cbcf-106-219-164-121.ngrok-free.app/get_system_info', {
        headers: { "ngrok-skip-browser-warning": "true" }
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(response => {
                throw new Error(response.substring(11, response.length - 2));
            });
        }
        return res.json();
    })
    .then(data => {
        // Update the table with fetched data
        document.getElementById("app_name").textContent = data["device_model"] || "N/A";
        document.getElementById("version").textContent = data["os_version"] || "N/A";
        document.getElementById("description").textContent = data["memory"] || "N/A";

        mock_data["app_name"] = data['device_model']
        mock_data["version"] = data['os_version']
        mock_data["description"] = data['memory']

        // Show the info container
        check = true
        document.getElementById("infoContainer").style.display = "block";

        // Show any additional elements if needed
        document.getElementById("id3")?.classList.remove("hidden");
    })
    .catch(e => {
        Swal.fire({
            icon: "error",
            text: `${e.message || e}`,
            className: "sweetBox"
        });
    })
    .finally(() => {
        // Hide loader and restore button text
        document.getElementById("buttonText").textContent = "Get System Info";
        document.getElementById("loader").classList.add("hidden");
    });
}

function fun3() {
    if (check) {
        fetch('https://cbcf-106-219-164-121.ngrok-free.app/app', {
            method: 'POST',
            headers: { "Content-Type": "application/json","ngrok-skip-browser-warning": "true" },
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