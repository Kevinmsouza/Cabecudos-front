import Swal from 'sweetalert2'

function sendAlert(type, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
        confirmButtonColor: '#3EA4C4',
      })
}

function sendConfirm (type, title, text) {
    return Swal.fire({
        title: title,
        text: text,
        icon: type,
        showCancelButton: true,
        confirmButtonColor: '#3EA4C4',
        cancelButtonColor: '#E44747',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não! Mudei de ideia!'
      })
}

export {
    sendAlert,
    sendConfirm,
}