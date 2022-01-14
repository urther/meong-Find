import header from '../components/header';
import { handleHistory } from '../router';
import { getMyProfile, getMyPosts } from '../requests';
import { $ } from '../helpers/utils';

let curwriterNickname = '';
// render 바꿔
const render = (() => {
  window.onload = async () => {
    try {
      const {
        data: [user],
      } = await getMyProfile();

      if (user) {
        curwriterNickname = user.nickname;

        $('.profile__title-container').innerHTML = `
          <span>${user.nickname}</span>
          <span class="bold">님의 프로필</span>
        `;

        $('.profile__email-container').innerHTML = `
        <span class="profile__email-title">이메일</span>
        <span class="profile__email">${user.email}</span>
        `;

        $('.profile__city-container').innerHTML = `
          <span class="profile__city-title">지 역</span>
          <span class="profile__city">${user.city}</span>
          <span class="profile__district">${user.district}</span>
        `;
      }

      const { data: myposts } = await getMyPosts(curwriterNickname);
      if (myposts) {
        $('.profile__posting-container').innerHTML = myposts
          .map(
            ({ title }, index) => `
        <li class="profile__posting-list">
          <span class="profile__posting-num">${index + 1}</span>
          <span class="profile__posting-header">${title}</span>
          <a href="#" class="profile__posting-edit">
            <span>수정</span>
          </a>
          <button class="profile__posting-del">삭제</button>
        </li>
        `
          )
          .join('');
      }
    } catch (e) {
      console.error(e);
    }
  };
})();

const bindEvents = () => {
  header.bindEvents();

  window.addEventListener('popstate', handleHistory);
};

const init = () => {
  bindEvents();
};

window.addEventListener('DOMContentLoaded', init);
