/* =========================================================
   NJOY CREATIONS
   CONTACT FORM
   GOOGLE SHEETS SUBMISSION
========================================================= */

// IMPORTANT:
// Use the Web App URL from the Apps Script deployment
// created under work@njoycreations.in

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxHBug4kjMGZ_IE6bbl4dJN23o_UDXJ-vBqT6C1Lw-4qpcxtXGE8oPkPTuSa90Dvhid/exec";
/* =========================================================
   FIELDS
========================================================= */

const fields = {
    name: document.getElementById('cf-name'),
    business: document.getElementById('cf-business'),
    email: document.getElementById('cf-email'),
    service: document.getElementById('cf-service'),
    message: document.getElementById('cf-message')
};

const submitBtn =
    document.getElementById('cf-submit');

const formMsg =
    document.getElementById('formMessage');


/* =========================================================
   SAFETY CHECK
========================================================= */

if (
    fields.name &&
    fields.business &&
    fields.email &&
    fields.service &&
    fields.message &&
    submitBtn &&
    formMsg
) {


    /* =====================================================
       REAL-TIME VALIDATION
    ====================================================== */

    fields.name.addEventListener(
        'input',
        () => validate('name')
    );

    fields.email.addEventListener(
        'input',
        () => validate('email')
    );

    fields.service.addEventListener(
        'change',
        () => validate('service')
    );

    fields.message.addEventListener(
        'input',
        () => validate('message')
    );


    /* =====================================================
       VALIDATE FIELD
    ====================================================== */

    function validate(field) {

        const el = fields[field];

        const val = el.value.trim();

        let ok;

        if (field === 'email') {

            ok =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(val);

        } else {

            ok = val.length > 0;

        }

        el.classList.toggle(
            'f-valid',
            ok
        );

        el.classList.toggle(
            'f-invalid',
            !ok && val.length > 0
        );

        return ok;
    }


    /* =====================================================
       VALIDATE ALL
    ====================================================== */

    function validateAll() {

        return [
            'name',
            'email',
            'service',
            'message'
        ]
        .map(
            field => validate(field)
        )
        .every(Boolean);
    }


    /* =====================================================
       RESET FORM
    ====================================================== */

    function resetForm() {

        fields.name.value = '';
        fields.business.value = '';
        fields.email.value = '';
        fields.service.value = '';
        fields.message.value = '';

        Object.values(fields).forEach(
            el => {

                el.classList.remove(
                    'f-valid',
                    'f-invalid'
                );

            }
        );
    }


    /* =====================================================
       SUBMIT
    ====================================================== */

    submitBtn.addEventListener(
        'click',
        async () => {

            clearMsg();


            /* ---------------------------------------------
               VALIDATION
            --------------------------------------------- */

            if (!validateAll()) {

                const first =
                    [
                        'name',
                        'email',
                        'service',
                        'message'
                    ]
                    .map(
                        key => fields[key]
                    )
                    .find(
                        el =>
                            el.classList.contains(
                                'f-invalid'
                            ) ||
                            el.value.trim() === ''
                    );


                if (first) {

                    first.focus();

                    first.classList.add(
                        'f-shake'
                    );

                    setTimeout(
                        () => {

                            first.classList.remove(
                                'f-shake'
                            );

                        },
                        500
                    );
                }


                showMsg(
                    'Please fill in all required fields correctly.',
                    'error'
                );

                return;
            }


            /* ---------------------------------------------
               LOADING
            --------------------------------------------- */

            submitBtn.disabled = true;

            submitBtn
                .querySelector('span')
                .textContent =
                'SENDING...';


            /* ---------------------------------------------
               PREPARE DATA
            --------------------------------------------- */

            const formData = {

                name:
                    fields.name.value.trim(),

                business:
                    fields.business.value.trim(),

                email:
                    fields.email.value.trim(),

                service:
                    fields.service.value,

                message:
                    fields.message.value.trim()

            };


            console.log(
                'Sending contact form:',
                formData
            );


            /* ---------------------------------------------
               SEND TO GOOGLE APPS SCRIPT
            --------------------------------------------- */

            try {

                await fetch(
                    SCRIPT_URL,
                    {
                        method: 'POST',

                        mode: 'no-cors',

                        headers: {
                            'Content-Type':
                                'text/plain;charset=utf-8'
                        },

                        body:
                            JSON.stringify(formData)
                    }
                );


                /* -----------------------------------------
                   SUCCESS
                ------------------------------------------ */

                showMsg(
                    "✓ Message sent! We'll get back to you within 24 hours.",
                    'success'
                );


                resetForm();


                submitBtn
                    .querySelector('span')
                    .textContent =
                    '✓ SENT!';


                setTimeout(
                    () => {

                        submitBtn.disabled =
                            false;

                        submitBtn
                            .querySelector('span')
                            .textContent =
                            'SEND MESSAGE — GET FREE AUDIT';

                    },
                    3500
                );


            } catch (err) {

                console.error(
                    'Submit error:',
                    err
                );


                showMsg(
                    'Something went wrong. Please try again or reach us on WhatsApp.',
                    'error'
                );


                submitBtn.disabled =
                    false;


                submitBtn
                    .querySelector('span')
                    .textContent =
                    'SEND MESSAGE — GET FREE AUDIT';

            }

        }
    );


    /* =====================================================
       SHOW MESSAGE
    ====================================================== */

    function showMsg(
        msg,
        type
    ) {

        formMsg.textContent =
            msg;

        formMsg.className =
            'form-message ' + type;
    }


    /* =====================================================
       CLEAR MESSAGE
    ====================================================== */

    function clearMsg() {

        formMsg.textContent =
            '';

        formMsg.className =
            'form-message';
    }

} else {

    console.error(
        'NJOY Contact Form: Required HTML elements were not found.'
    );

}