const $iconSuccess = document.querySelectorAll('.icon-success');
const $iconError = document.querySelectorAll('.icon-error');
const $error = document.querySelectorAll('.error');

const iconChange = (index, isError) => {
  if (isError) {
    $iconSuccess[index].classList.add('hidden');
    $iconError[index].classList.remove('hidden');
  } else {
    $iconSuccess[index].classList.remove('hidden');
    $iconError[index].classList.add('hidden');
  }
};

const countCorrectInput = (arr, index, btn) => {
  const cnt = arr.filter(idx => (idx !== index ? !$iconSuccess[idx].classList.contains('hidden') : false)).length;

  if (cnt === arr.length - 1) btn.removeAttribute('disabled');
};

const activeSubmitButton = (reg, index, btn) => {
  if (reg) btn.setAttribute('disabled', '');
  else {
    countCorrectInput(
      [...$iconSuccess].map((_, i) => i),
      index,
      btn
    );
  }
};

const checkIsCorrectForm = (reg, index, msg, btn) => {
  iconChange(index, reg);
  $error[index].textContent = reg ? msg : '';
  $error[index].style.color = '#ed2553';
  activeSubmitButton(reg, index, btn);
};

export default {
  regEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  regName: /^[^\s]{2,8}$/,
  regPassword: /^[A-Za-z0-9]{6,12}$/,
  emailValidate(value, index, button) {
    console.log(this.regEmail);
    return checkIsCorrectForm(!this.regEmail.test(value), index, '이메일 형식에 맞게 입력해 주세요.', button);
  },

  nameValidate(value, index, button) {
    return checkIsCorrectForm(!this.regName.test(value), index, '영문 또는 숫자를 2~8자 입력하세요..', button);
  },

  passwordValidate(value, index, button) {
    return checkIsCorrectForm(!this.regPassword.test(value), index, '영문 또는 숫자를 6~12자 입력하세요.', button);
  },

  passwordConfirmValidate(value, index, button) {
    return checkIsCorrectForm(value, index, '비밀번호가 일치하지 않습니다.', button);
  },
};
