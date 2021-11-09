import Swal from 'sweetalert2'

function sendAlert(type, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
      })
}

export {
    sendAlert,
}