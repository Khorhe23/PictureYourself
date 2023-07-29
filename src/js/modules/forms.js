import {postData} from "../services/requests";
import clearObject from "./clearObject";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Loading...',
        success: 'We will call you!',
        failure: 'Somethings goes wrong...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name =  arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formDate = new FormData(item);
            let api;

            if(item.dataset.form == 'first') {
                for(let key in state) {
                    formDate.append(key, state[key]);
                }
            }

            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formDate)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    textMessage.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    clearObject(state);
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');

                        document.querySelectorAll('.calc select').forEach(select => {select.value = ""});
                    }, 5000);
                });
        });
    });
};

export default forms;