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
