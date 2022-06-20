let url = 'http://localhost:3001/todos'

axios.get(url)
    .then(res => reload(res.data))
    .catch(err => console.log(err))



function reload(arr) {
    let box1 = document.querySelector('.box1')
    let box2 = document.querySelector('.box2')
    let box3 = document.querySelector('.box3')

    box1.innerHTML = ''
    box2.innerHTML = ''
    box3.innerHTML = ''

    let arr1 = []
    let arr2 = []
    let arr3 = []

    for(let item of arr){
        if(item.left === 0) {
            arr1.push(item)
            box1.innerHTML += `
            <div div class="item" id="${item.id}" data-on="${item.completed}">
                <div class="inp">
                    <input type="checkbox" name="" id="">
                </div>
                <div class="main">
                    <h3 class="name">${item.title}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, recusandae.</p>
                    <span class="when">Today</span>
                </div>
            </div > 
            `
        }  
        if(item.left === 1) {
            arr2.push(item)
            box2.innerHTML += `
            <div div class="item" id="${item.id}" data-on="${item.completed}">
                <div class="inp">
                    <input type="checkbox" name="" id="">
                </div>
                <div class="main">
                    <h3 class="name">${item.title}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, recusandae.</p>
                    <span class="when">Tomorrow</span>
                </div>
            </div > 
            `
        }  
        if(item.left > 1) {
            arr3.push(item)
            box3.innerHTML += `
            <div div class="item" id="${item.id}" data-on="${item.completed}">
                <div class="inp">
                    <input type="checkbox" name="" id="">
                </div>
                <div class="main">
                    <h3 class="name">${item.title}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, recusandae.</p>
                    <span class="when">Later</span>
                </div>
            </div > 
            `
        } 
        document.querySelector('.today h3').innerHTML = `FOR TODAY - ${arr1.length}`
        document.querySelector('.tomorrow h3').innerHTML = `TOMORROW - ${arr2.length}`
        document.querySelector('.later h3').innerHTML = `LATER - ${arr3.length}`
    }
    let inputs = document.querySelectorAll('input')


    inputs.forEach((element) => {
        if(element.parentNode.parentNode.getAttribute('data-on') === 'true'){
            element.checked = true
        }
        element.onclick = (e) => { 
            let id = e.target.parentNode.parentNode.id

            let array = arr.filter(elem => elem.id === +id)

            for(let elem2  of array){
                elem2.completed = !elem2.completed
                axios.patch(`${url}/${id}`, elem2)
                    .then(res => console.log(res))
            }
            console.log(array);
        }
    });

    let button = document.querySelector('.alls')
    let button2 = document.querySelector('.todays')

    button2.onclick = () => {
        button2.classList.add('active')
        button.classList.remove('active')

        document.querySelector('.tomorrow').style.display = 'none'
        document.querySelector('.later').style.display = 'none'
        document.querySelector('h1').innerHTML = 'TODOS FOR TODAY'
        document.querySelector('h1').style.width = '400px'
        document.querySelector('h5').style.display = 'none'
        document.querySelector('.today h3').style.display = 'none'

    }
    button.onclick = () => {
        button.classList.add('active')
        button2.classList.remove('active')

        document.querySelector('.tomorrow').style.display = 'block'
        document.querySelector('.later').style.display = 'block'
        document.querySelector('h1').innerHTML = 'ALL TODOS'
        document.querySelector('h1').style.width = '210px'
        document.querySelector('h5').style.display = 'block'
        document.querySelector('.today h3').style.display = 'block'

    }
    document.querySelector('h5').innerHTML = `HI, YOU HAVE  ${arr.length}  UNDONE TASKS`
}

