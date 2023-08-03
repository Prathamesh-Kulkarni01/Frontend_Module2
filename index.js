
const showNav=()=>{
    const toggleBtn=document.getElementById('toggle')
    const navbar=document.getElementById('navbar')
            navbar.classList.toggle('show-menu')

}
    
const linkcolor=document.querySelectorAll('.nav_link')

function colorLink(){
    linkcolor.forEach(l=>l.classList.remove('active'))
    this.classList.add('active')
}
linkcolor.forEach(l=>l.addEventListener('click',colorLink))



