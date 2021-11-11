import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import PaymentMethod from './PaymentMethod';

function sendAlert(type, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
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

function paymentAlert (teste) {
    const MySwal = withReactContent(Swal)

    return MySwal.fire({
        title: 'Escolha a forma de pagamento',
        showCancelButton: true,
        confirmButtonColor: '#3EA4C4',
        cancelButtonColor: '#E44747',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Voltar',
        html:
        <PaymentMethod/>
    })
}

export {
    sendAlert,
    sendConfirm,
    paymentAlert,
}