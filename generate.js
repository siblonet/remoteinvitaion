const Generate = async () => {
    const invn = document.getElementById('invn').value;
    const invt = document.getElementById('invt').value;
    const invm = document.getElementById('invm').value;
    const invc = document.getElementById('invc').value;
    const inva = document.getElementById('inva').value;
    const loading = document.getElementById('loading');

    if (invn && invt && invm && invc && inva) {
        if (invm === invc) {
            loading.removeAttribute("onclick");
            loading.innerText = "Connecting ...";

            const data = {
                name: invn,
                phone: invt,
                password: invm,
                detail: inva,
                invitation: 0
            };

            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const response = await fetch("https://nuance-doud.adaptable.app/instapay/invitaion/", options);
            const responseData = await response.json();
            const messages = document.getElementById('messages');
            messages.classList.add("form-style-5");
            messages.innerHTML = `
                <form>
                    <fieldset id="linkmessa"></fieldset>
                </form>
            `;

            if (!response.ok) {
                document.getElementById('linkmessa').innerHTML = `
                    <legend style="color: #bc1a42;">
                        <span class="erro">3</span>
                        Failure, please check your connection or try again later.
                    </legend>
                `;
                loading.setAttribute("onclick", "Generate()");
                loading.innerText = "Generate";
            } else {
                document.getElementById('linkmessa').innerHTML = `
                    <legend>
                        <span class="number">2</span>
                        Copy your invitation link. 
                    </legend>
                    <textarea name="field3" placeholder="lien">https://invitation-teletravail.netlify.app/enter?${responseData.id}</textarea>
                `;
                loading.innerText = "Copiez le lien ci-dessous";
            }
        } else {
            const messages = document.getElementById('messages');
            messages.classList.add("form-style-5");
            messages.innerHTML = `
                <form>
                    <fieldset id="linkmessa">
                        <legend style="color: #bc1a42;">
                            <span class="erro">3</span>
                            The passwords do not match.
                        </legend>
                    </fieldset>
                </form>
            `;

            setTimeout(() => {
                messages.innerHTML = "";
                messages.classList.remove("form-style-5");
            }, 3000);
        }
    } else {
        const messages = document.getElementById('messages');
        messages.classList.add("form-style-5");
        messages.innerHTML = `
                <form>
                    <fieldset id="linkmessa">
                        <legend style="color: #bc1a42;">
                            <span class="erro">3</span>
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
