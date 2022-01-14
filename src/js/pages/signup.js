import validate from '../helpers/validate';
import { $ } from '../helpers/utils';
import { getSignUpEmail, getSignUpName, getSignup, getSignUpForm } from '../requests';
import header from '../components/header';
import { moveToPage, handleHistory } from '../router';

const signUp = () => {
  header.bindEvents();

  const $signupButton = $('.sign-up-btn');
  const $emailInput = $('.sign-up-form-email');
  const $nicknameInput = $('.sign-up-form-name');
  // 이거 이렇게 쓰지말기 버튼 ~
  const $duplicateButton = document.querySelectorAll('.check-duplicated');

  // validate 에서 가져오기
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regName = /^[^\s]{2,8}$/;

  // 회원가입 완료
  $('.sign-up-form').onsubmit = async e => {
    e.preventDefault();

    try {
      const [nickname, email, password, city, district] = [
        $('#nickname').value,
        $('#email').value,
        $('#password').value,
        $('#sign-up-form-city').value,
        $('#sign-up-form-district').value,
      ];

      await getSignup(nickname, email, password, city, district);
      alert('회원가입이 완료되었습니다.');

      await moveToPage('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  // 에러아이콘 활성화, 성공아이콘 비활성화 함수
  const hideSuccessIcon = element => {
    element.querySelector('.icon-success').classList.add('hidden');
    element.querySelector('.icon-error').classList.remove('hidden');
  };

  // 성공아이콘 활성화, 에러아이콘 비활성화 함수
  const hideErrorIcon = element => {
    element.querySelector('.icon-error').classList.add('hidden');
    element.querySelector('.icon-success').classList.remove('hidden');
  };

  // 중복버튼 활성화/비활성화 함수
  const setDuplicateBtn = (e, regex, index) => {
    // e 못가져오는거 해결
    if (regex.test(e.target.value)) {
      $duplicateButton[index].removeAttribute('disabled');
    } else {
      $duplicateButton[index].setAttribute('disabled', '');
    }
  };

  // 회원가입 input 유효성 검사
  $('.sign-up-form').oninput = e => {
    if (e.target.matches('#nickname')) {
      validate.nameValidate(e.target.value, 0, $signupButton);

      hideSuccessIcon($nicknameInput);
      // $nicknameInput.querySelector('.icon-success').classList.add('hidden');
      // $nicknameInput.querySelector('.icon-error').classList.remove('hidden');

      console.log('ee', e);
      setDuplicateBtn(e, regName, 0);
      // if (regName.test(e.target.value)) {
      //   $duplicateButton[0].removeAttribute('disabled');
      // } else {
      //   $duplicateButton[0].setAttribute('disabled', '');
      // }
    } else if (e.target.matches('#email')) {
      validate.emailValidate(e.target.value, 1, $signupButton);

      hideSuccessIcon($emailInput);
      // $emailInput.querySelector('.icon-success').classList.add('hidden');
      // $emailInput.querySelector('.icon-error').classList.remove('hidden');

      setDuplicateBtn(e, regEmail, 1);
      // if (regEmail.test(e.target.value)) {
      //   $duplicateButton[1].removeAttribute('disabled');
      // } else {
      //   $duplicateButton[1].setAttribute('disabled', '');
      // }
    } else if (e.target.matches('#password')) {
      validate.passwordValidate(e.target.value, 2, $signupButton);

      if (e.target.value) validate.passwordConfirmValidate(e.target.value !== $('#repassword').value, 3, $signupButton);
    } else if (e.target.matches('#repassword')) {
      if (e.target.value) validate.passwordConfirmValidate($('#password').value !== e.target.value, 3, $signupButton);
    }
  };

  // 닉네임 중복확인
  $duplicateButton[0].onclick = async ({ target }) => {
    // e.preventDefault();
    const $errormsg = target.parentElement.querySelector('.error');
    //  const $errormsg = $('.sign-up-form-name').querySelector('.error');
    try {
      // const name = document.querySelector('#nickname').value;
      const res = await getSignUpName($('#nickname').value);
      const isDuplicate = res.data.nicknameDuplication;

      if (isDuplicate) {
        $errormsg.textContent = '이미 존재하는 닉네임입니다';
      } else {
        $errormsg.textContent = '사용 가능한 닉네임입니다';
        $errormsg.style.color = '#2196f3';

        hideErrorIcon($nicknameInput);
        // $nicknameInput.querySelector('.icon-error').classList.add('hidden');
        // $nicknameInput.querySelector('.icon-success').classList.remove('hidden');
      }
    } catch (error) {
      console.error(error);
    }
  };

  $duplicateButton[1].onclick = async ({ target }) => {
    const $errormsg = target.parentElement.querySelector('.error');

    try {
      const emailValue = document.querySelector('#email').value;
      const res = await getSignUpEmail(emailValue);
      const isDuplicate = res.data.emailDuplicate;

      console.log(typeof isDuplicate);
      if (isDuplicate) {
        // console.log('이미 존재');
        $errormsg.textContent = '이미 존재하는 이메일입니다';
      } else {
        $errormsg.textContent = '사용 가능한 이메일입니다';
        $errormsg.style.color = '#2196f3';

        hideErrorIcon($emailInput);
        // $emailInput.querySelector('.icon-error').classList.add('hidden');
        // $emailInput.querySelector('.icon-success').classList.remove('hidden');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const $citySelect = $('#sign-up-form-city');
  $citySelect.onchange = () => {
    const $districtSelect = $('#sign-up-form-district');
    // 나중에 value로 넣기
    let mainOption = $citySelect.options[$citySelect.selectedIndex].innerText;
    let subOptions = {
      seoul: ['강남구', '광진구', '서초구'],
      busan: ['해운대구', '민지구', '시안구'],
    };
    let subOption;

    // 객체로 빼
    switch (mainOption) {
      case '서울특별시':
        subOption = subOptions.seoul;
        break;
      case '부산광역시':
        subOption = subOptions.busan;
        break;
    }
    $districtSelect.options.length = 0;

    // for문 변경
    for (let i = 0; i < subOption.length; i++) {
      let option = document.createElement('option');
      option.innerText = subOption[i];
      $districtSelect.append(option);
    }
  };

  window.addEventListener('popstate', handleHistory);
};
window.addEventListener('DOMContentLoaded', signUp);
