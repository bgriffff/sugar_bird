const events = document.querySelectorAll('.event')

events.forEach( event => {
    const date = dayjs(event.dataset.date).format('ddd MMM D, YYYY');
    const dateElement = event.querySelector('.date');
    dateElement.innerText = date;
})