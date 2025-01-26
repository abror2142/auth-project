/* #########################
    Searchbar XML Request
######################### */
if(document.getElementById('unpin-user')){
    document.getElementById('unpin-user').addEventListener('click', function () {
        function removeParam(key, sourceURL) {
            var rtn = sourceURL.split("?")[0],
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
            }
            return rtn;
        }

        var originalURL = window.location.href;
        var alteredURL = removeParam("user", originalURL);
        window.location.href = alteredURL;
    });
}

/* #########################
    Searchbar XML Request
######################### */
function searchUsers(searchTerm) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/search/users', true);
    xhr.setRequestHeader('Content-Type', 'application/xml');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            const resultsBox = document.getElementById('resultsBox');

            // Clear previous results
            resultsBox.innerHTML = '';

            // Populate the results
            if (users.length > 0) {
                users.forEach(user => {
                    const userLink = document.createElement('div');
                    let url = window.location.href;
                    const params = new URL(url).searchParams;
                    if(params.has('user'))
                        url = url.replace(/(user=)[^\&]+/, '$1' + user.id);
                    else {
                        const params = new URLSearchParams();
                        params.append('user', user.id);
                        const queryString = params.toString();

                        if(params.size > 1)
                            url = `${url}&${queryString}`;
                        else 
                            url = `${url}?${queryString}`;
                    }
                    userLink.innerHTML = `
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-user text-gray-600"></i>
                            ${user.fullname}
                        </div> 
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-envelope text-gray-600"></i>
                            ${user.email}
                        </div>`;
                    userLink.className = "text-sm py-1.5 px-3 bg-amber-300 rounded-md user-link hover:bg-amber-400";
                    
                    // There was a bug with href attr (js not working)
                    // Solved wiht onclick event :)
                    userLink.onclick = function (e) {
                        e.preventDefault()
                        window.location.href = url;
                    }
                    resultsBox.appendChild(userLink);
                });
            } else {
                resultsBox.textContent = 'No users found.';
            }
        } else {
            console.error('Error:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };

    const xmlPayload = `
        <search>
            <term>${searchTerm}</term>
        </search>
    `;

    xhr.send(xmlPayload);
}

// Attach the search function to an input event
document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
        searchUsers(searchTerm);
    } else {
        document.getElementById('resultsBox').innerHTML = '';
    }
 
});

/* ########################
    (De)Select all logic
######################### */
document.getElementById('mainCheckBox').addEventListener('change', function (e) {
    let checkboxes = document.getElementsByClassName('checkboxItem');
    for (let i = 0; i < checkboxes.length; i++) {
        if(e.target.checked){
            checkboxes[i].checked = true
        }else {
            checkboxes[i].checked = false
        }
        
    }
});

/* ##################################
    (Un)Block/Delete buttons logic
################################### */
document.getElementById("blockBtn").addEventListener('click', function () {
    var form = document.getElementById('userActionForm');
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'action';
    hiddenInput.value = 'block';
    
    form.appendChild(hiddenInput);
    form.submit();
});

document.getElementById("unblockBtn").addEventListener('click', function () {
    var form = document.getElementById('userActionForm');
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'action';
    hiddenInput.value = 'unblock';
    form.appendChild(hiddenInput);
    form.submit();
});


document.getElementById("deleteBtn").addEventListener('click', function () {
    var form = document.getElementById('userActionForm');
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'action';
    hiddenInput.value = 'delete';
    
    form.appendChild(hiddenInput);
    form.submit();
});

// WARNING !!! Temporary solution
/* ###########################
    FIXING BUG WITH 'a'
############################ */
/*
    The problem is when a is clicked and go to the
    specified url, javascript is not working. No actions
    are performed on the new page. Somehow, using window.location
    solves. Temporary! Need to be learned ASAP.
*/
document.addEventListener('DOMContentLoaded', () => {
    // Get all <a> elements in the DOM
    const links = document.querySelectorAll('a');

    // Loop through each <a> element
    links.forEach((link) => {
        // Assign a function to the click event
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default navigation
            window.location.href = link.href;
        });
    });
});