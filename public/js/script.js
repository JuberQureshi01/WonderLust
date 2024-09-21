// EJavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  // Tax switch button
  let taxSwitch = document.getElementById("flexSwitchCheckDefault")
  taxSwitch.addEventListener("click",()=>{
    let taxInfo = document.getElementsByClassName("tax-info");
    for(Info of taxInfo){

      if(Info.style.display!="inline"){
        Info.style.display="inline";
      }
      else{
        Info.style.display="none";
      }
    }
  })