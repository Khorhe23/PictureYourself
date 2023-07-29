const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result),
          calc = document.querySelectorAll('.calc select');

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            if(sizeBlock.value && materialBlock.value || sizeBlock.value && materialBlock.value && promocodeBlock.value) {
                state.result = sum;
            }
        }
        if(promocodeBlock.value) {
            state.promo = promocodeBlock;
        }
    
        calc.forEach(select => {
            updateTime(select, "size", "size", sizeBlock);
            updateTime(select, "material", "material", materialBlock);
            updateTime(select, "options", "options", optionsBlock);
        });

        console.log(state);
    };


    function updateTime(select, value, key, block) {
        if(select.getAttribute('id') == value) {
            state[key] == block.value;
        }
    }

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;