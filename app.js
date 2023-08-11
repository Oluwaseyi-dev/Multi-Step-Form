var currentTab = 0;
showTab(currentTab);


function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
      document.getElementById("prevBtn").innerHTML = "Go Back";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Confirm";
      document.getElementById("nextBtn").style.backgroundColor = "hsl(243, 100%, 62%)";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next Step";
      document.getElementById("nextBtn").style.backgroundColor = "hsl(213, 96%, 18%)";
    }
    if (n < -1) {
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").style.display = "none";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      showThankYouStep();
      if (window.matchMedia("(min-width: 768px)").matches) {
        document.getElementById("foot").style.backgroundColor = "white";
      }else{
        document.getElementById("foot").style.backgroundColor = "hsl(217, 100%, 97%)";
      }
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
    
  }  

  function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
  }

  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
  }




    // Function to toggle the display of monthly and yearly prices
    function toggleBillingOption() {
      // Get the switch input element
      var switchInput = $('input[type="checkbox"]');

      // Get all the plan sections
      var planSections = $('.plans');
      var addSections = $('.add-ons');

      // Check if the switch is toggled (Yearly option selected)
      if (switchInput.prop('checked')) {
        // Hide monthly prices and show yearly prices
        planSections.find('.monthly-price').hide();
        planSections.find('.yearly-price').show();
        addSections.find('.monthly-price').hide();
        addSections.find('.yearly-price').show();
        planSections.find('.free').show();
        document.getElementById('btn2').style.color = 'hsl(213, 96%, 18%)';
        document.getElementById('btn1').style.color = 'hsl(231, 11%, 63%)';
      } else {
        // Show monthly prices and hide yearly prices
        planSections.find('.monthly-price').show();
        planSections.find('.yearly-price').hide();
        addSections.find('.monthly-price').show();
        addSections.find('.yearly-price').hide();
        planSections.find('.free').hide();
        document.getElementById('btn2').style.color = 'hsl(231, 11%, 63%)';
        document.getElementById('btn1').style.color = 'hsl(213, 96%, 18%)';
      }
      copyText();
    }

    // Attach event listener to the switch input element
    $(document).ready(function() {
      $('input[type="checkbox"]').on('change', function () {
        toggleBillingOption();
      });

      // Initially, call the function to set the billing option based on the initial state of the switch
      toggleBillingOption();
    });



    // Function to handle section highlighting (implement this as you need)
    function highlightSection(clickedSection) {
      // Remove "selected" class from all sections
      const sections = document.querySelectorAll(".plans");
      sections.forEach((section) => {
        section.classList.remove("selected");
      });
    
      // Add "selected" class to the clicked section
      clickedSection.classList.add("selected");

      copyText();
    } 

    $(document).ready(function() {
      $('.custom-checkbox').on('change', function() {
        if ($(this).is(':checked')) {
          $(this).closest('.add-ons').addClass('checked');
        } else {
          $(this).closest('.add-ons').removeClass('checked');
        }
        
        copyText();
      });
    });

    function copyText() {
      const selectedSection = document.querySelector(".plans.selected");
      if (selectedSection) {
        const switchInput = document.querySelector('input[type="checkbox"]');
        var sourceElements = selectedSection.getElementsByClassName('source');
        var sourceElements2 = selectedSection.getElementsByClassName('monthly-price');
        var sourceElements3 = selectedSection.getElementsByClassName('yearly-price');
        var targetElement = document.getElementById('target4');
        var targetElement2 = document.getElementById('target5');
        var targetElement3 = document.getElementById('target6');
        var resultElement = document.getElementById('result');
        var addOnSections = document.querySelectorAll(".add-ons.checked");
        var tots = document.querySelector('#target7');

            // Hide all target elements initially
        targetElement2.style.display = "none";
        targetElement3.style.display = "none";

        if (switchInput.checked) {
          // Show target element3 (yearly price)
          targetElement3.style.display = "block";
        } else {
          // Show target element2 (monthly price)
          targetElement2.style.display = "block"; 
        }
    
        targetElement.textContent = "";
        targetElement2.textContent = "";
        targetElement3.textContent = "";
    
        for (var i = 0; i < sourceElements.length; i++) {
          if (switchInput.checked) {
            targetElement.textContent += sourceElements[i].textContent + " (Yearly)";
          }else{
            targetElement.textContent += sourceElements[i].textContent + " (Monthly)";
          }
          
        }

        for (var j = 0; j < sourceElements2.length; j++) {
          targetElement2.textContent += sourceElements2[j].textContent + " ";
        }

        for (var k = 0; k < sourceElements3.length; k++) {
          targetElement3.textContent += sourceElements3[k].textContent + " ";
        }
        
        var total = 0;

        for (var j = 0; j < sourceElements2.length; j++) {
          if (switchInput.checked) {
            total += parseFloat(sourceElements3[j].textContent.replace(/\$|\/yr/g, ""));
          } else {
            total += parseFloat(sourceElements2[j].textContent.replace(/\$|\/mo/g, ""));
          }
        }

        addOnSections.forEach(function (addOnSection) {
          var monthlyPrice = addOnSection.querySelector('.monthly-price');
          var yearlyPrice = addOnSection.querySelector('.yearly-price');
    
          if (switchInput.checked) {
            total += parseFloat(yearlyPrice.textContent.replace(/\$|\/yr/g, ""));
          } else {
            total += parseFloat(monthlyPrice.textContent.replace(/\$|\/mo/g, ""));
          }
        });

        if (switchInput.checked) {
          tots.textContent = "Total (per year)";
        } else {
          tots.textContent = "Total (per month)";
        }

        if (switchInput.checked){
          resultElement.textContent = "+$" + total.toFixed(2) + "/yr ";
        }else{
          resultElement.textContent = "+$" + total.toFixed(2) + "/mo ";
        }
      }
      copyText2();
    }

    function copyText2() {
      const sourceDivs = document.querySelectorAll(".add-ons");
      const targetDivs = document.querySelectorAll(".target");
      sourceDivs.forEach((sourceDiv, index) => {
        const checkbox = sourceDiv.querySelector(".custom-checkbox");
        const addOnType = sourceDiv.querySelector(".add-on-type");
        const monthlyPrice = sourceDiv.querySelector(".monthly-price");
        const yearlyPrice = sourceDiv.querySelector(".yearly-price");
        const targetDiv = targetDivs[index];
        const switchInput = document.querySelector('input[type="checkbox"]');

        checkbox.addEventListener("change", function() {

          targetDiv.style.display = " ";

          if(switchInput.checked){
            if(checkbox.checked){
              targetDiv.style.display = "flex";
              targetDiv.style.paddingTop = "1rem";
              targetDiv.innerHTML = `
              <p class ="addOnType">${addOnType.innerText}</p>
              <p class ="myPrice">${yearlyPrice.innerText}</p>
            `;
            }else{
              targetDiv.innerHTML = "";
            }
          }else{
            if(checkbox.checked){
              targetDiv.style.display = "flex";
              targetDiv.style.paddingTop = "1rem";
              targetDiv.innerHTML = `
              <p class ="addOnType">${addOnType.innerText}</p>
              <p class ="myPrice">${monthlyPrice.innerText}</p>
            `;
            }else{
              targetDiv.innerHTML = "";
            }
          }
        });
      });
    }

    document.addEventListener("DOMContentLoaded", copyText())


    function showThankYouStep() {
      var prevBtn = document.getElementById("prevBtn");
      var nextBtn = document.getElementById("nextBtn");
      
      if (prevBtn && nextBtn) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      }
      
      var thankYou = document.querySelector(".end");
      if (thankYou) {
        thankYou.style.display = "block";
      }
      
      var stepIndicators = document.getElementsByClassName("step");
      if (stepIndicators[currentTab]) {
        stepIndicators[currentTab].className += " finish";
      }
    }

    