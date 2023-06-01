/* JavaScript pour le formulaire de plusieurs étapes */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("msform");
  const fieldsets = form.querySelectorAll("fieldset");
  const prevButtons = form.querySelectorAll(".previous_button");
  const nextButtons = form.querySelectorAll(".next");
  const progressBar = document.getElementById("progressbar");
  let currentStep = 0;

  function showStep(step) {
    fieldsets.forEach(function (fieldset, index) {
      if (index === step) {
        fieldset.style.display = "block";
      } else {
        fieldset.style.display = "none";
      }
    });
    updateProgressBar(step);
  }

  function updateProgressBar(step) {
    const progressItems = progressBar.querySelectorAll("li");
    progressItems.forEach(function (item, index) {
      if (index < step) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function goToNextStep() {
    if (currentStep < fieldsets.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function goToPreviousStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  }

  prevButtons.forEach(function (button) {
    button.addEventListener("click", goToPreviousStep);
  });

  nextButtons.forEach(function (button) {
    button.addEventListener("click", goToNextStep);
  });

  showStep(currentStep);
});
