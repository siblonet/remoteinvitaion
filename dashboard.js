function getUrlParameter() {
    const token = sessionStorage.getItem('invite');

    if (token) {
        return token;
    } else {
        return null;
    }
}



const managerInit = async () => {
    const tolken = getUrlParameter();
    if (!tolken) {
        window.location.href = "login.html"
    } else {
        const invited_data = `
        <br>
        <br>
        <div class="form-style-5">
            <form>
                <fieldset>
                    <legend>
                        <span class="number">
                            #
                        </span>
                        Voici ci-dessous votre lien.
                    </legend>
                    <textarea name="field3" placeholder="lien" id="linkpast">https://invitation-teletravail.netlify.app/enter?${tolken}</textarea>
                </fieldset>
               <p>Copiez et partagez.</p>
            </form>
        </div>
        `
        document.getElementById('dasboard').innerHTML = invited_data;
    }

}

managerInit();

