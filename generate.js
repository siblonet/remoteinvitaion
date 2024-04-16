const Generate = async () => {
    const invn = document.getElementById('invn').value;
    const invt = document.getElementById('invt').value;
    const invm = document.getElementById('invm').value;
    const invc = document.getElementById('invc').value;
    const inva = document.getElementById('inva').value;

    if (invn && invt && invm && invc && inva) {
        if (invm === invc) {
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

            const response = await fetch("https://nuance-doud.adaptable.app/instapay/invitation", options);
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
                        Échec, vérifiez votre connexion ou essayez plus tard.
                    </legend>
                `;
            } else {
                document.getElementById('linkmessa').innerHTML = `
                    <legend>
                        <span class="number">2</span>
                        Copiez votre lien d'invitation 
                    </legend>
                    <textarea name="field3" placeholder="lien">https://invitation-teletravail.netlify.app/enter?${responseData.id}</textarea>
                `;
            }
        }
    } else {
        const messages = document.getElementById('messages');
        messages.classList.add("form-style-5");
        messages.innerHTML = `
                <form>
                    <fieldset id="linkmessa">
                        <legend style="color: #bc1a42;">
                            <span class="erro">3</span>
                            Renseignez tous.
                        </legend>
                    </fieldset>
                </form>
            `;
    }
};
