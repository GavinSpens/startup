async function WaitForElement(id) {
    return new Promise((resolve, reject) => {
        // Create a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver((mutations, observer) => {
            // If the element exists in the document, resolve the promise and disconnect the observer
            if (document.getElementById(id)) {
                resolve(document.getElementById(id));
                observer.disconnect();
            }
        });
        // Start observing the document with the configured parameters
        observer.observe(document, { childList: true, subtree: true });
    });
}

export { WaitForElement };