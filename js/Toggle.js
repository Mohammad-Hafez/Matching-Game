// *NOTE - preview , help show and hide
$("#previewIcon").click(()=>{
    $(".previewOverlay").css("display","bloc")
    $(".contentContainer").html(`<i class="fa-solid fa-circle-xmark" id="close-preview-btn"></i>
    <div class="innerContent mt-3">
        <i class="fa-solid fa-images fs-1"></i>
        <h1>Dummy Image</h1>
    </div>
`)
$("#close-preview-btn").click(()=>{
  originContent()
})
 })
 function originContent(){
  $(".contentContainer").html(`<div class="images d-flex align-items-stretch row g-2 ">
  <div class="innerImg d-flex flex-column justify-content-between text-center col-3" data-id="Scissors">
          <img src="img/p19ex21_1.png" class="w-75 mx-auto cursor-pointer" alt="">
          <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
  </div>
  <div class="innerImg d-flex flex-column justify-content-between text-center col-3" data-id="Board">
          <img src="img/p19ex21_2.png" class="w-75  mx-auto cursor-pointer" alt="">
          <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
  </div>
  <div class="innerImg d-flex flex-column justify-content-between text-center col-3" data-id="Chair">
          <img src="img/p19ex21_3.png" class="w-75  mx-auto cursor-pointer" alt="">
          <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
  </div>
  <div class="innerImg d-flex flex-column justify-content-between text-center col-3" data-id="Window">
          <img src="img/p19ex21_4.png" class="w-75  mx-auto cursor-pointer" alt="">
          <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
  </div>
</div>
 <canvas id="canvas"></canvas> 
<div class="titles d-flex align-items-center row g-2">
  <div class="innerTitle text-center d-flex flex-column justify-content-center col-3" data-id="Chair">
      <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
      <h4>
          chair
      </h4>
  </div>
  <div class="innerTitle text-center d-flex flex-column justify-content-center col-3" data-id="Window">
      <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
      <h4>
          window
      </h4>
  </div>
  <div class="innerTitle text-center d-flex flex-column justify-content-center col-3" data-id="Scissors">
      <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
      <h4>
          scissors
      </h4>
  </div>
  <div class="innerTitle text-center d-flex flex-column justify-content-center col-3" data-id="Board">
      <i class="fa-sharp fa-regular fa-circle cursor-pointer selectCircle"></i>
      <h4>
          board
      </h4>
  </div>
</div>
`)
 }
 originContent()
 $(document).click((e)=>{
    if (e.target.className== "previewOverlay" ) {
        $(".previewOverlay").css("display","none")
    }
    if (e.target.className== "helpOverlay") {
      $(".helpOverlay").css("display","none")
    }
 })
 $("#helpIcon").click(()=>{
  $(".helpOverlay").css("display","flex")
})
$("#close-help-btn").click(()=>{
  $(".helpOverlay").css("display","none")
})
