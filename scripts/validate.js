const configObj = {
  formElement: '.form',
  inputElement: '.form__input',
  submitButtonSelector: '.form__subs-btn',
  inactiveButtonClass: 'form__subs-btn_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, configObj) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(configObj.inputErrorClass);
  errorElement.textContent = errorMessage;
	errorElement.classList.add(configObj.errorClass);
};

const hideInputError = (formElement, inputElement, configObj) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(configObj.inputErrorClass);
	errorElement.classList.remove(configObj.errorClass);
	errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, configObj);
  } else {
		hideInputError(formElement, inputElement, configObj);
	}	
};


const setSubmitButtonState = (inputList, buttonElement, configObj) => {
	const hasNotValidInput = inputList.some(
		(inputElement) => !inputElement.validity.valid
	);
	if (hasNotValidInput) {
		buttonElement.setAttribute('disabled', true);
		buttonElement.classList.add(configObj.inactiveButtonClass);
	}else{
		buttonElement.removeAttribute('disabled');
		buttonElement.classList.remove(configObj.inactiveButtonClass);
	}
};

const setEventListeners = (formElement, configObj) => {
	formElement.addEventListener('submit', (evt) => {
		evt.preventDefault();
	});
	
	const inputList = Array.from(formElement.querySelectorAll(configObj.inputElement));
	const buttonElement =  formElement.querySelector(configObj.submitButtonSelector);
	
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);
			setSubmitButtonState(inputList, buttonElement, configObj);
    });
	});
}

function enableValidation(configObj) {
	const formList = document.querySelectorAll(configObj.formElement);
	console.log(formList);
  formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			
			evt.preventDefault();
			
			const inputEmail = formElement.querySelector(configObj.inputElement);
			inputEmail.value = '';
  		disabledBtnSubmitImage(configObj);
		});

		setEventListeners(formElement, configObj);
	
	}); 
	
}
enableValidation(configObj);

function disabledBtnSubmitImage(configObj) {
	const btnSubmit = subscribeForm.querySelector(configObj.submitButtonSelector);
  btnSubmit.setAttribute('disabled', true);
  btnSubmit.classList.add(configObj.inactiveButtonClass);
}