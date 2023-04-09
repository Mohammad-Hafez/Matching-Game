"use strict";
// *NOTE - Loader
$(document).ready(function(){
  $("#loading").fadeOut(1000);
  // *STUB - --
  const images = Array.from(document.querySelectorAll(".innerImg"));
  const titles = Array.from(document.querySelectorAll(".innerTitle"));
  const showAnswersBtn = $("#showAnswers")
  const reDoBtn = $("#reDo")
  let selectedImageId = null;
  let selectedTitleElement = null;
  let selectedImage = null;
  let selectedTitle = null;
  let line = null;
// Toggle Perview and Help data :
const helpIcon = $('#helpIcon');
const previewIcon = $('#previewIcon');
const closeBtn = $('.closeBtn');
const helpOverlay = $('.helpOverlay');
const previewOverlay = $('.previewOverlay');
const mainOverlay = $(".overlay")
const content = $(".content")
const main = $('#main');
// add click event listener to help icon
helpIcon.on('click', () => {
  // hide main div
  main.hide();
  // show help overlay div
  helpOverlay.show();
  mainOverlay.show();
  content.addClass('showBefore');
});
// add click event listener to preview icon
previewIcon.on('click', () => {
  // hide main div
  main.hide();
  // show preview overlay div
  previewOverlay.show();
  mainOverlay.show()
  content.addClass('showBefore');
});
// add click event listener to close button
closeBtn.on('click', () => {
  // hide help and preview overlay divs
  helpOverlay.hide();
  previewOverlay.hide();
  // show main div
  main.show();
  mainOverlay.hide();
  content.removeClass('showBefore');
}); 
// function which call when user select image to remove selector from rest images 
function selectImg(image) {
    selectedImage = image;
    images.forEach((otherImage) => {
      if (otherImage !== selectedImage) {
        otherImage.classList.remove("selected");
      }
    });
    selectedImage.classList.add("selected");
  }
  // function for select title it doesn't work if user not select image
function selectTitle(title, event) {
  if (selectedImageId !== null) {
    let selectedAnswerId = event.target.parentElement.getAttribute("data-id");
    selectedTitle = title;
    if (selectedAnswerId !== null) {
      titles.forEach((otherTitle) => {
        // remove selector from rest of titles
        if (otherTitle !== selectedTitle) {otherTitle.classList.remove("selected");}
      });
      selectedTitle.classList.add("selected");
      // check if image id is the same title id
      if (selectedAnswerId == selectedImageId) {
        let matchedImag = document.querySelector(`.innerImg[data-id="${selectedAnswerId}"]`)
        let matchedTitle = document.querySelector(`.innerTitle[data-id="${selectedAnswerId}"]`)
        let matchedImageOverlay = document.querySelector(`.selectOverlay[data-id="${selectedAnswerId}"]`)
        let matchedTitleOverlay = document.querySelector(`.titleOverlay[data-id="${selectedAnswerId}"]`)
        let correctSound = new Audio("sounds/new-level-142995.mp3");
        correctSound.play();
        updateLine(matchedImag, matchedTitle ,selectedAnswerId);
        // selectedAnswerId = null;
        matchedImageOverlay.classList.add("d-block")
        matchedTitleOverlay.classList.add("d-block")
        matchedImag.classList.remove("selected");
      } else {
        let incorrectSound = new Audio("sounds/wronganswer-37702.mp3");
        incorrectSound.play();
        let erorrImg = document.querySelector(`.innerTitle[data-id="${selectedAnswerId}"] img`)
        let showCount = 0;
        let intervalId;
        // Set the interval to show and hide the image
        intervalId = setInterval(() => {
          if (showCount < 3) {
            // Show the image
            erorrImg.style.opacity = 1;
            showCount++;
          } else {
            // Hide the image and stop the interval
            erorrImg.style.opacity = 0;
            clearInterval(intervalId);
          }
        }, 100);  
          }
      setTimeout(() => {
        selectedTitle.classList.remove("selected");
        selectedTitle = null;
      }, 500);
    }
  }
}
// loop on images and when user click on single image call selectImg function
  images.forEach((image) => {
    image.addEventListener("click", (event) => {
      selectedImageId = event.target.parentElement.getAttribute("data-id");
      selectImg(image);
    });
  });
  // loop on titles and when user click on single title call selectTitle function
  titles.forEach((title) => {
    title.addEventListener("click", (event) => {selectTitle(title, event);});
  });
  function updateLine(selectedImage , selectedTitle,selectedAnswerId) {
    if (selectedImage !== null && selectedTitle !== null) {
      const imageRect = selectedImage.getBoundingClientRect();
      const titleRect = selectedTitle.getBoundingClientRect();
      const imageIcon = document.querySelector(`.innerImg[data-id="${selectedAnswerId}"] i`)
      const imageIconRect =imageIcon.getBoundingClientRect();
      const titleIcon = document.querySelector(`.innerTitle[data-id="${selectedAnswerId}"] i`)
      const titleIconRect =titleIcon.getBoundingClientRect();
      const svg = document.querySelector("svg");
      const lineX1 = imageRect.left -50 ;
      const lineY1 = imageRect.top + imageRect.height / 2;
      const lineX2 = titleRect.left  ;
      const lineY2 = titleRect.top - titleRect.height -20 
      // const lineX1 = imageIconRect.left - imageRect.left + 16
      // const lineY1 = imageRect.top + imageRect.height / 2;
      // const lineX2 = titleRect.left - titleRect.width  + titleIconRect.width ;
      // const lineY2 = titleRect.top - titleRect.height - titleIconRect.height
      line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", lineX1);
      line.setAttribute("y1", lineY1);
      line.setAttribute("x2", lineX2);
      line.setAttribute("y2", lineY2);
      line.setAttribute("stroke", "#0FA0C5");
      line.setAttribute("stroke-width", "4");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("z-index", "99");
      line.setAttribute("stroke-dashoffset", "0");
      line.setAttribute("stroke-opacity", "1");
      svg.appendChild(line);
    }
  }
  showAnswersBtn.click(()=>{
    updateLine(images[0] , titles[2] , "Scissors" )
    updateLine(images[1] , titles[3] , "Board" )
    updateLine(images[2] , titles[0] , "Chair" )
    updateLine(images[3] , titles[1] , "Window" )
    $(".selectOverlay").addClass("d-block")
    $(".titleOverlay").addClass("d-block")
  })
  reDoBtn.click(()=>{
    $("svg").empty()
    images.forEach((image) => {image.classList.remove("selected");})
    $(".selectOverlay").removeClass("d-block")
    $(".titleOverlay").removeClass("d-block")
  })
// *NOTE - This to make page scalable
// Define the base page dimensions and scaling factors
let basePage = {
  width: $(window).width() * .8,
  height: $(window).height(),
  scale: 1,
  scaleX: 1,
  scaleY: 1.1,
  };
  // let maxAspectRatio = 2;
  // Define a function to resize the element based on the page dimensions
  function resizeElement(container, pageWidth, pageHeight) {
  // Calculate the scaling factor
  let scaleFactor = Math.min(pageWidth / basePage.width, pageHeight / basePage.height);
  // Set the width, height, and transform properties of the element
  container.css({
  width: basePage.width * scaleFactor * basePage.scale + 'px',
  height: basePage.height * scaleFactor * basePage.scale + 'px',
  transform: 'scale(' + scaleFactor + ')'
  });
  }
  $(function() {
  // Get a reference to the element to resize this change to container bdl element
  let container = $('.container');
  // Call the resize function initially
  resizeElement(container, $(window).width(), $(window).height());
  // Call the resize function whenever the window is resized
  $(window).resize(function() {resizeElement(container, $(window).width(), $(window).height());});
  });

});



