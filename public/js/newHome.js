const progress = document.querySelector('.progress-bar')
const progressbtn = document.querySelector('.progressbtn')
const tier = document.querySelector('.tier')
let count = 0;
const increase = () => {
    progressbtn.addEventListener('click', () => {
        count = count + 5;
        progress.style = "width:" + count + "%";
        if (count > 20 && count < 40) {
            tier.innerText = "Amateur"
        }
        else if (count >= 40 && count < 60) {
            tier.innerText = "Intermediate"
        }
        else if (count >= 60 && count < 80) {
            tier.innerText = "Skilled"
        }
        else if (count >= 80 && count <= 100) {
            tier.innerText = "Expert"
        }
    })

}
increase();