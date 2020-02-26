document.addEventListener('DOMContentLoaded', () => {
    var content = document.getElementById('content');
    var form = document.getElementById('todos');
    var input = document.getElementById('todo');
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    function addNote(note) {
        var element = document.createElement('div');
        element.innerHTML = note;
        element.className = 'note';
        element.addEventListener('click', () => {
            var info = document.createElement('span');
            info.className = 'info';
            info.innerHTML = ' deleting..';
            element.appendChild(info);
            fetch('/notes', {
                method: 'delete',
                headers: headers,
                body: JSON.stringify({note: note})
            }).then( (res) => {
                res.json().then( (data) => {
                    if (data.deleted === note) {
                        content.removeChild(element);
                    }
                })
            })
        });
        content.appendChild(element);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        var note = input.value;
        input.value = '';
        addNote(note);
        fetch('/notes', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({note: note})
        });
    })

    fetch('/notes').then((res) => {
        res.json().then((data) => {
            content.innerHTML = '';
            data.notes.forEach((note) => {
                addNote(note);
            });
        });
    })
})