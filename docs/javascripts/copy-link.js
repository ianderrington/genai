(function(d, w) {
    if (w.self !== w.top) {
       d.className += " iframe";
    }
 }(document.documentElement, window));

// 
  function copyToClipboard(elementId) {
      var url = document.getElementById(elementId).href;
      navigator.clipboard.writeText(url).then(function() {
          // Show copied popup
          var element = document.getElementById(elementId);
          var popup = document.getElementById("popup-"+elementId);
          popup.classList.add("show");
          element.classList.remove("show");

        // remove text from element
        document.getElementById(elementId).textContent = "";


          // Hide popup after 2 seconds
          setTimeout(function() { popup.classList.remove("show"); }, 2000);
        // add text back to element
        element.classList.add("show");

      }, function(err) {
          console.error('Could not copy text: ', err);
      });
  }