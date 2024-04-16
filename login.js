const Conneter = async () => {
    const invphone = document.getElementById('invphone').value;
    const password = document.getElementById('password').value;
    const loading = document.getElementById('loading');

    if (invphone && password) {
        loading.removeAttribute("onclick");
        loading.innerText = "Connecting ...";
        const data = {
            phone: invphone,
            password: password
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch("https://nuance-doud.adaptable.app/instapay/login/invitaion/invited", options);
        const responseData = await response.json();
        const messages = document.getElementById('messageslogin');
        messages.classList.add("form-style-5");
        messages.innerHTML = `
                <form>
                    <fieldset id="linkmessa"></fieldset>
                </form>
            `;

        if (!response.ok) {
            document.getElementById('linkmessa').innerHTML = `
                    <legend style="color: #bc1a42;">
                        <span class="erro">1</span>
                        Failure, please check your connection or try again later.
                    </legend>
                `;
            setTimeout(() => {
                messages.innerHTML = "";
                messages.classList.remove("form-style-5");
            }, 3000);

            loading.setAttribute("onclick", "Conneter()");
            loading.innerText = "Login";
        } else if (responseData.id) {
            sessionStorage.setItem('invite', responseData.id);
            window.location.href = "/dashboard";

        } else {
            document.getElementById('linkmessa').innerHTML = `
            <legend style="color: #bc1a42;">
                <span class="erro">1</span>
                Incorrect information.
            </legend>
        `;

            setTimeout(() => {
                messages.innerHTML = "";
                messages.classList.remove("form-style-5");
            }, 3000);
            loading.setAttribute("onclick", "Conneter()");
            loading.innerText = "Login";
        }

    } else {
        const messages = document.getElementById('messageslogin');
        messages.classList.add("form-style-5");
        messages.innerHTML = `
                <form>
                    <fieldset id="linkmessa">
                        <legend style="color: #bc1a42;">
                            <span class="erro">2</span>
                            Please fill in all fields.
                        </legend>
                    </fieldset>
                </form>
            `;

        setTimeout(() => {
            messages.innerHTML = "";
            messages.classList.remove("form-style-5");
        }, 3000);
    }
};
