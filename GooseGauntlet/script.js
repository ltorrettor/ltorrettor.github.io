(function() {

    var pl = "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";

    var submitPass = document.getElementById('submit-password'); //
    var passEl = document.getElementById('password-field'); //
    var invalidPassEl = document.getElementById('err-invalidpass'); //
    var trycatcherror = document.getElementById('err-trycatcherror'); //
    var contentFrame = document.getElementById('secret-target'); //
    var modalButton = document.getElementById('login-open-button'); //

    // Sanity checks
    if (!isSecureContext) {
        document.getElementById("password-area").hidden = true;
        document.getElementById("submit-password").disabled = true;

        document.getElementById("err-nosecurecontext").hidden = false;
        return;
    }

    if (!crypto.subtle) {
        document.getElementById("password-area").hidden = true;
        document.getElementById("submit-password").disabled = true;

        document.getElementById("err-nocrypto").hidden = false;
        return;
    }

    function scrollToSecret() {
        let x = bootstrap.Collapse.getInstance(document.getElementById("navbarToggler"));
        if (x !== null) {
            x.hide();
        }
        document.getElementById("heading-secret").scrollIntoView();
    }

    function str2ab(str) {
        var ustr = atob(str);
        var buf = new ArrayBuffer(ustr.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = ustr.length; i < strLen; i++) {
            bufView[i] = ustr.charCodeAt(i);
        }
        return bufView;
    }

    async function deriveKey(salt, password) {
        const encoder = new TextEncoder()
        const baseKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey'],
        )
        return await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
            baseKey, { name: 'AES-GCM', length: 256 },
            true,
            ['decrypt'],
        )
    }

    async function doSubmit(evt) {
        submitPass.disabled = true;
        passEl.disabled = true;

        let iv, ciphertext, key;

        try {
            var unencodedPl = str2ab(pl);

            const salt = unencodedPl.slice(0, 32)
            iv = unencodedPl.slice(32, 32 + 16)
            ciphertext = unencodedPl.slice(32 + 16)

            key = await deriveKey(salt, passEl.value);
        } catch (e) {
            trycatcherror.hidden = false;
            console.error(e);
            return;
        }

        try {
            const decryptedArray = new Uint8Array(
                await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
            );

            let decrypted = new TextDecoder().decode(decryptedArray);

            if (decrypted === "") throw "No data returned";

            const basestr = '<base href="." target="_top">';
            const anchorfixstr = `
                    <script>
                        Array.from(document.links).forEach((anchor) => {
                            const href = anchor.getAttribute("href");
                            if (href.startsWith("#")) {
                                anchor.addEventListener("click", function(e) {
                                    e.preventDefault();
                                    const targetId = this.getAttribute("href").substring(1);
                                    const targetEl = document.getElementById(targetId);
                                    targetEl.scrollIntoView();
                                });
                            }
                        });
                    <\/script>
                `;

            // Set default iframe link targets to _top so all links break out of the iframe
            if (decrypted.includes("<head>")) decrypted = decrypted.replace("<head>", "<head>" + basestr);
            else if (decrypted.includes("<!DOCTYPE html>")) decrypted = decrypted.replace("<!DOCTYPE html>", "<!DOCTYPE html>" + basestr);
            else decrypted = basestr + decrypted;

            // Fix fragment links
            if (decrypted.includes("</body>")) decrypted = decrypted.replace("</body>", anchorfixstr + '</body>');
            else if (decrypted.includes("</html>")) decrypted = decrypted.replace("</html>", anchorfixstr + '</html>');
            else decrypted = decrypted + anchorfixstr;

            // fill in the iframe with the decrypted content
            // contentFrame.srcdoc = decrypted;
            contentFrame.innerHTML = decrypted;
            // un-hide the card that holds the iframe
            document.getElementById("heading-secret").hidden = false;
            // change the behavior of the "Secret" button to scroll to the new content
            modalButton.dataset.bsToggle = null;
            modalButton.onclick = scrollToSecret;
            // hide the login modal
            bootstrap.Modal.getInstance("#login-modal").hide()
            // scroll to the new content
            scrollToSecret();
        } catch (e) {
            invalidPassEl.hidden = false;
            passEl.value = "";
            submitPass.disabled = false;
            passEl.disabled = false;
            console.error(e);
            return;
        }
    }

    submitPass.onclick = doSubmit;
    passEl.onkeypress = function(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        invalidPassEl.hidden = true;
        if (keyCode == '13') {
            // Enter pressed
            doSubmit();
            return false;
        }
    }
})();
