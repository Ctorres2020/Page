const storage = firebase.storage(),
    bucket = storage.ref(),
    imgRef = bucket.child('img'),
    form = document.getElementById('upload'),
    uploader = document.getElementById('uploader'),
    progressBar = document.getElementById('progress-bar'),
    output = document.getElementById('output'),
    progressAdvance = document.getElementById('progress-advance')

    function saveFileInDB (url){
        let fileRef = firebase.database().ref().child('files')

        fileRef.push({
            url
        })
    }

    output.innerHTML = ''

    uploader.addEventListener('change', event => {
        Array.from(event.target.files).forEach(file =>{
            console.log('subiendo archivo')

            let uploadTask = imgRef.child(file.name).put(file)

            uploadTask.on('state_changed', data => {
                let progress = Math.floor((data.bytesTransferred / data.totalBytes) * 100)
                progressBar.value = progress
                progressAdvance.innerHTML = `${progress} %`
            }, error => {
                console.log(error)
                console.log(error.code, error.mesagge)
                progressAdvance.innerHTML = `<p>${error.code} - ${error.mesagge} </p>`
            }, () => {
                let fileRef = imgRef.child(file.name)
                fileRef.getDownloadURL()
                .then(url => {
                    if (file.type.match('image.*')){
                        output.innerHTML += `<button onclick="location.reload(true);">Cerrar imágen</button>
                        <img src="${url}">`
                    } else {
                        output.innerHTML += `<p>Tu archivo se ha subido puedes verlo <a href="${url}" target="_blank">Aquí</a></p>`
                    }
                    saveFileInDB(url)
                })
            })
        })
        form.reset()
    })