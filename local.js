
/**
 * Fills HTML elements on the page with localized content based on the provided locale object.
 *
 * @param {object} locale - The object containing key-value pairs of element IDs and their corresponding localized content.
 * @return {void} This function does not return anything.
 */
function fillHtmlWithLocale(locale) {
    if (!locale) {
        return;
    }

    for (let key in locale) {
        let element = document.querySelectorAll(key);

        for (let i = 0; i < element.length; i++) {
            element[i].innerHTML = locale[key];
        }
    }
}


/**
 * Retrieves locale data for the selected locale and fills HTML with the data.
 *
 * @return {Promise<void>} Promise that resolves once locale data is fetched and HTML is filled
 */
const getLocaleData = async (selectedLocale) => {
    const defaultLocale = "en";
    if (!selectedLocale) {
        selectedLocale = defaultLocale;
    }

    const localePath = `./locales/${selectedLocale}.json`;

    const response = await fetch(localePath);
    const data = await response.json();

    fillHtmlWithLocale(data);
};

/**
 * Initializes the locale dropdown functionality.
 *
 * @param {Object} params - The parameters for the function.
 */
function initLocaleDropdown(params) {
    const languageSelector = document.getElementById("language-selector");
    // Open the  dropdown on click
    languageSelector.addEventListener("click", () => {
        document.getElementById("language-dropdown").classList.toggle("hidden");
    });

    // Close the dropdown on click outside
    document.addEventListener("click", (event) => {
        if (!languageSelector.contains(event.target)) {
            document.getElementById("language-dropdown").classList.add("hidden");
        }
    });

    // Select language on click
    document.querySelectorAll("#language-dropdown li").forEach((li) => {
        li.addEventListener("click", () => {
            const language = li.getAttribute("data-language");
            changeSelectedLanguage(language);
            setLocaleOnLocalStorage(language);
            document.getElementById("language-dropdown").classList.add("hidden");
        });
    });

    // Select language of locale given by the browser
    var userLang = navigator.language || navigator.userLanguage;
    changeSelectedLanguage(getLocaleBasedOnBrowser(userLang));
    setLocaleOnLocalStorage(getLocaleBasedOnBrowser(userLang));
}

function setLocaleOnLocalStorage(locale) {
    localStorage.setItem("locale", locale);
}


/**
 * Updates the selected language display and fetches locale data.
 *
 * @param {string} locale - The selected locale to display
 * @return {void} 
 */
function changeSelectedLanguage(locale) {
    let localeImages = {
        "en": "assets/us.jpg",
        "es": "assets/ecuador.jpg"
    }

    const languageSelector = document.getElementById("language-selector");
    languageSelector.innerHTML = `${locale}&nbsp;<strong>&or;</strong>`;

    getLocaleData(locale);
    changeStylesForLocale(locale);
}


/**
 * Determines the locale based on the user's language.
 * This is done in case language is not supported or the user's language is en-US or en-GB 
 * which return only en. 
 * @param {string} userLang - the user's language
 * @return {string} the determined locale
 */
function getLocaleBasedOnBrowser(userLang) {
    if (userLang.includes("en")) {
        return "en";
    }

    if (userLang.includes("es")) {
        return "es";
    }

    // default
    return "en";
}

function changeStylesForLocale(locale) {
    const contactTitle = document.getElementById("contact_title");
    if (locale === "es") {
        //contactTitle.classList.remove("lg:text-8xl");
        //contactTitle.classList.add("lg:text-6xl");
    }

    if (locale === "en") {
        //contactTitle.classList.remove("lg:text-6xl");
        //contactTitle.classList.add("lg:text-8xl");
    }
}

function init() {
    initLocaleDropdown();
}

document.addEventListener("DOMContentLoaded", init);