jQuery(document).ready(function () {
  //Nav Button
  jQuery("#hamburger").click(function () {
    jQuery(this).toggleClass("open");
    jQuery("#mobile-menu").toggleClass("open");
    jQuery("body").toggleClass("open");
  });

  //Tabs
  jQuery(".tab").click(function () {
    var tab_id = jQuery(this).data("tab");

    jQuery(".tab").removeClass("bg-primary !text-white font-bold");
    jQuery(this).addClass("bg-primary !text-white font-bold");

    jQuery(".tab-content").hide();
    jQuery("." + tab_id + "-content").show();
  });

  //Accordion
  jQuery(".accordion-header").click(function () {
    var content = jQuery(this).next(".accordion-content");
    if (!content.is(":visible")) {
      jQuery(".accordion-content").slideUp();
      jQuery(".accordion-header").removeClass("active mb-3 bg-primary text-white");

      content.slideDown();
      jQuery(this).addClass("active mb-3 bg-primary text-white");
    } else {
      content.slideUp();
      jQuery(this).removeClass("active mb-3 bg-primary text-white");
    }
  });  
});

jQuery(function() {

  jQuery(".open-popup").click(function(){
    jQuery("#poup-box").removeClass("hidden");    
  });

  jQuery(".open-popup").click(function(){
    jQuery("#poup-box").removeClass("hidden");    
  });


  
  // JavaScript to handle the pop-up behavior
  const openPopups = document.querySelectorAll('.open-popup');
  const closePopups = document.querySelectorAll('.close-popup');

  openPopups.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          const popupId = "popup-box"; //button.getAttribute('data-target');
          const popup = document.getElementById(popupId);
          if (popup) {  // Check if the popup exists
              popup.classList.remove('hidden');
              popup.classList.add('block');
          } else {
              console.error(`Popup with ID "${popupId}" not found.`);
          }
      });
  });

  closePopups.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log("click close");
        e.preventDefault();
        const popup = button.closest('.popup');

        if (popup) {  // Check if the popup exists
            popup.classList.remove('block');
            popup.classList.add('hidden');
        } else {
            console.error("Popup element not found.");
        }
    });
  });
});