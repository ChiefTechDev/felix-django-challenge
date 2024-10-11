/*
    General preline init
    Moved here by oliver.haas.ext, initially by felix.tepel.ext
*/
function emitChange(id) {
    console.log('emitting change for ' + id)
    document.getElementById(id).dispatchEvent(new Event('change'));
}

// noinspection JSUnresolvedReference
window.htmx.onLoad(function () {
    window.HSCollapse.autoInit();
    window.HSCopyMarkup.autoInit();
    window.HSDropdown.autoInit();
    window.HSInputNumber.autoInit();
    window.HSOverlay.autoInit();
    window.HSSelect.autoInit();
    window.HSStaticMethods.autoInit();
    window.HSTabs.autoInit();
    window.HSTooltip.autoInit();
    
    // This is necessary when using Preline UI - Search Component.
    // Since this is a JS rendered component it does not emit normal change events.
    // Therefore we have to add event listeners manually.
    const categorySelect = window.HSSelect.getInstance('#import_category_select');
    if (categorySelect) {
        categorySelect.on('change', (val) => emitChange('import_category_select'));
    }
})

window.onload = function () {
    initMultiSelects();
    initMultiSelectTags();
    initSelects();
}


/*
    Number Inputs
*/

window.htmx.onLoad(function (target) {
    const hsInputNumberInputs = target.querySelectorAll('input[data-hs-input-number-input]');
    // We want number-input to fire input and change events when 
    // + or - buttons are used, just like normal html input[type="number"]
    hsInputNumberInputs.forEach(inputValueChangeToEmitter);

    // Remove leading zeros
    hsInputNumberInputs.forEach(input => {
        input.addEventListener('input', function() {
            input.value = parseInt(input.value, 10);
        });
    });
});

function inputValueChangeToEmitter(input) {
    const inputPrototype = Object.getPrototypeOf(input);
    if (!inputPrototype.hasOwnProperty('value')) return;
    const descriptor = Object.getOwnPropertyDescriptor(inputPrototype, 'value');
    Object.defineProperty(input, 'value', {
        ...descriptor,
        set(value) {
            const oldValue = this.value;
            descriptor.set.call(this, value);
            const newValue = this.value;
            if (oldValue !== newValue) {
                this.dispatchEvent(new Event('input', { bubbles: true }));
                this.dispatchEvent(new Event('change', { bubbles: true }));
            }
            return true;
        }
    });
}



/*
    Dropdowns swapping/htmx/ajax
*/

// Preline dropdowns cause errors when they are still open when they are swapped out. Close them before swapping.
document.addEventListener('htmx:beforeSwap', function(event) {
    const openDropdowns = event.detail.target.querySelectorAll('.hs-dropdown.open');
    openDropdowns.forEach((openDropdown) => HSDropdown.close(openDropdown));
});
document.addEventListener('htmx:oobBeforeSwap', function(event) {
    const openDropdowns = event.detail.target.querySelectorAll('.hs-dropdown.open');
    openDropdowns.forEach((openDropdown) => HSDropdown.close(openDropdown));
});


// Preline dropdowns with multi select do not fire a normal change event when an option is selected.
window.htmx.onLoad(function () {
    initMultiSelects();
    initMultiSelectTags();
    initSelects();
})

function initMultiSelects() {
    const selects = document.querySelectorAll('.preline-multi-select');
    try {
        selects.forEach((select) => {
            const hsSelect = window.HSSelect.getInstance('#' + select.id);
            if (hsSelect) {
                hsSelect.on('change', function(val) {
                    emitChange(select.id)
                    initMultiSelectTags();
                });
            }
        });
    } catch (e) {
        console.warn('Error initializing multi-selects. Preline does not seem to be ready. Will try again ...');
        setTimeout(initMultiSelects, 100);
    }
}

function initMultiSelectTags() {
    selectTagValues = document.querySelectorAll('[data-tag-value]');
    selectTagValues.forEach((tagValue) => {
        removeTag = tagValue.querySelector('[data-remove]');

        removeTag.addEventListener('click', (e) => {
            const selects = document.querySelectorAll('.preline-multi-select');
            selects.forEach((select) => {
                emitChange(select.id);
            })
        });
    })
}

// Preline normal dropdowns do not fire a change event when an option is selected.
function initSelects() {
    const selects = document.querySelectorAll('.preline-select');
    try {
        selects.forEach((select) => {
            const hsSelect = window.HSSelect.getInstance('#' + select.id);
            if (hsSelect) {
                hsSelect.on('change', function(val) {
                    emitChange(select.id)
                });
            }
        });
    } catch (e) {
        console.warn('Error initializing selects. Preline does not seem to be ready. Will try again ...');
        setTimeout(initMultiSelects, 100);
    }
}

function emitChange(id) {
    console.log('emitting change for '  + id)
    document.getElementById(id).dispatchEvent(new Event('change'));
}


// Patch HSOverlay.accessibility
// This method causes problems when having many inputs in an overlay. It slows down the page significantly.
window.addEventListener('load', () => {
    // Ensure the HSOverlay class is loaded before overriding the method
    if (window.HSOverlay) {
        HSOverlay.accessibility = function(evt) {
            // Empty function to override the original implementation
        };
    }
});