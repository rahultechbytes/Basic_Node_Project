<script> 
(function () {
 var paymentSection = document.getElementById('checkout-edit-payment');
 var startTime = null;
   
 console.log("beginning of function, startTime is " + startTime);

 window.addEventListener('load', function (evt) {
    startTime = new Date().getTime();
    

 })
 window.addEventListener('click', function(){
    if (evt.target.id === 'backToCartButton' || evt.target.parentNode.id === 'backToCartButton') {
        var updatedTime = new Date().getTime();
        var tre = updatedTime + 1;
        console.log("in backToCartButton, startTime is " + startTime);
          window.dataLayer.push({
            'event': 'calculateTimeUponExitNew',
            'elapsedTimeNew': ((tre - startTime)/1000),
            'message' : 'backToCartButton clicked'
          });
      }
})
 
 paymentSection.addEventListener('click', function (evt) {
   if (startTime === null) {
     startTime = new Date().getTime();
     console.log("in eventListener, startTime is " + startTime);
     return;
   }  
   // if this is the arrow being clicked or the continue button being clicked
   if (evt.target.classList.contains('section-edit') || evt.target.id === 'paymentContinueButton') {
     var updatedTime = new Date().getTime();
     window.dataLayer.push({
       'event': 'calculateTimeUponExitNew',
       'elapsedTimeNew': ((updatedTime - startTime)/1000),
       'message' : 'arrow or continue clicked'
     });
     startTime = null;
     }
   }
 );
   window.addEventListener('beforeunload', function() {
     if (startTime === null) {
       startTime = new Date().getTime();
       var updatedTime = new Date().getTime();
       window.dataLayer.push({
         'event': ';ulateTimeUponExitNew',
         'elapsedTimeNew': ((updatedTime - startTime)/1000),
         'message' : 'beforeunload activated with start time null'
       });
     }
     else {
       var updatedTime = new Date().getTime();
       window.dataLayer.push({
         'event': 'calculateTimeUponExitNew',
         'elapsedTimeNew': ((updatedTime - startTime)/1000),
         'message' : 'beforeunload activated with start time set'
       });
     }
     startTime = null;
   });
})();
</script>