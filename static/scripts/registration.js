document.addEventListener('DOMContentLoaded', function (event) {

    const GET = "GET";
    const POST = "POST";
    const URL = "https://pamiw2020registration.herokuapp.com/";

    const LOGIN_FIELD_ID = "login";
    const PESEL_FIELD_ID = "pesel";

    var HTTP_STATUS = {OK: 200, NOT_FOUND: 404};

    prepareEventOnLoginChange();
    prepareEventOnPeselChange();

    let registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();


        console.log("Form submission stopped.");

        var n = event.srcElement.length;
        for (var i = 0; i < n; i++) {
            console.log(event.srcElement[i].value);
        }
    });

    function prepareEventOnLoginChange() {
        let loginInput = document.getElementById(LOGIN_FIELD_ID);
        loginInput.addEventListener("change", updateLoginAvailabilityMessage);
    }

    function prepareEventOnPeselChange() {
        let peselInput = document.getElementById(PESEL_FIELD_ID);
        peselInput.addEventListener("change", updatePeselValidityMessage);
    }

    function updateLoginAvailabilityMessage() {
        let warningElemId = "loginWarning";
        let warningMessage = "Ten login jest już zajęty.";

        isLoginAvailable().then(function (isAvailable) {
            if (isAvailable) {
                console.log("Available login!"); // to remove
                removeWarningMessage(warningElemId);
            } else {
                console.log("NOT available login"); // to remove
                showWarningMessage(warningElemId, warningMessage, LOGIN_FIELD_ID);
            }
        }).catch(function (error) {
            console.error("Something went wrong while checking login.");
            console.error(error);
        });
    }

    function showWarningMessage(newElemId, message, textBoxId) {
        let warningElem = prepareWarningElem(newElemId, message);
        appendAfterElem(textBoxId, warningElem);
    }

    function removeWarningMessage(warningElemId) {
        let warningElem = document.getElementById(warningElemId);

        if (warningElem !== null) {
            warningElem.remove();
        }
    }

    function prepareWarningElem(newElemId, message) {
        let warningField = document.getElementById(newElemId);

        if (warningField === null) {
            let textMessage = document.createTextNode(message);
            warningField = document.createElement('span');

            warningField.setAttribute("id", newElemId);
            warningField.className = "warning-field";
            warningField.appendChild(textMessage);
        }
        return warningField;
    }

    function appendAfterElem(currentElemId, newElem) {
        let currentElem = document.getElementById(currentElemId);
        currentElem.insertAdjacentElement('afterend', newElem);
    }

    function isLoginAvailable() {
        return Promise.resolve(checkLoginAvailability().then(function (statusCode) {
            if (statusCode === HTTP_STATUS.OK) {
                return false;

            } else if (statusCode === HTTP_STATUS.NOT_FOUND) {
                return true;

            } else {
                throw "Unknown login availability status: " + statusCode;
            }
        }));
    }

    function checkLoginAvailability() {
        let loginInput = document.getElementById(LOGIN_FIELD_ID);
        let baseUrl = URL + "user/";
        let userUrl = baseUrl + loginInput.value;

        return Promise.resolve(fetch(userUrl, {method: GET}).then(function (resp) {
            return resp.status;
        }).catch(function (err) {
            return err.status;
        }));
    }

    function updatePeselValidityMessage() {
        let peselWaringElemId = "peselWaring";
        let waringMessage = "Proszę wprowadzić poprawny numer PESEL.";

        if(isPeselValid()) {
            console.log("PESEL valid!"); // to remove
            removeWarningMessage(peselWaringElemId);
        } else {
            console.log("PESEL INvalid! :(");
            showWarningMessage(peselWaringElemId, waringMessage, PESEL_FIELD_ID);
        }
    }

    function isPeselValid() {
        let peselInput = document.getElementById(PESEL_FIELD_ID);
        if(peselInput.value.length !== 11) {
            return false;
        }
        let year = peselInput.value[0]*10 + peselInput.value[1]*1;
        let month = peselInput.value[2]*10 + peselInput.value[3]*1 - 1;
        while (month > 11) {
            month -= 20;
            console.log("Month" + month);
            if (month < 0){
                return false;
                break;
            }
            year += 100;
            console.log("Year" + year);
        }
        year += 1900;
        console.log("Year" + year);
        if (year > 2299) {
            year -= 500;
        }
        let day = peselInput.value[4]*10 + peselInput.value[5]*1;
        console.log("Day " + day);
        let birthday = new Date(year,month,day);
        console.log("Data  " + birthday);
        console.log("Data dzień  " + birthday.getDate());
        console.log("Data miesiąc " + birthday.getMonth());
        console.log("Data rok " + birthday.getFullYear());
        if(birthday.getDate() === day
            && birthday.getMonth() === month
            && birthday.getFullYear() === year) {
            let controlSum =
                (peselInput.value[0] * 1)%10 +
                (peselInput.value[1] * 3)%10 +
                (peselInput.value[2] * 7)%10 +
                (peselInput.value[3] * 9)%10 +
                (peselInput.value[4] * 1)%10 +
                (peselInput.value[5] * 3)%10 +
                (peselInput.value[6] * 7)%10 +
                (peselInput.value[7] * 9)%10 +
                (peselInput.value[8] * 1)%10 +
                (peselInput.value[9] * 3)%10;
            console.log("ControlSum  " + controlSum);
            while(controlSum > 10) {
                controlSum %= 10;
            }
            controlSum = 10 - controlSum;
            console.log("ControlSum  " + controlSum);
            if (controlSum == peselInput.value[10]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

});