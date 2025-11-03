/**
 * @class Accordion
 * @description Manages the accordion functionality, expanding or collapsing sections as needed.
 */
class Accordion {
    /**
     * @constructor
     * @param {string} headerSelector - The selector for the accordion headers.
     * @param {string} contentSelector - The selector for the accordion content sections.
     */
    constructor(headerSelector, contentSelector) {
      this.headers = $(headerSelector);
      this.contents = $(contentSelector);
  
      this.init();
    }
  
    /**
     * @method init
     * @description Initializes the event listeners for the accordion headers.
     */
    init() {
      this.headers.click((e) => this.toggleAccordion($(e.currentTarget)));
    }
  
    /**
     * @method toggleAccordion
     * @description Toggles the visibility of the accordion content. Only one section is expanded at a time.
     * @param {jQuery} header - The clicked accordion header element.
     */
    toggleAccordion(header) {
      const content = header.next(this.contents);
      if (!content.is(":visible")) {
        this.contents.slideUp();
        this.headers.removeClass("active mb-3 bg-primary text-white");
  
        content.slideDown();
        header.addClass("active mb-3 bg-primary text-white");
      } else {
        content.slideUp();
        header.removeClass("active mb-3 bg-primary text-white");
      }
    }
  }