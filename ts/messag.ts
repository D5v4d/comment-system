class Messag {
  storage: Storag;
  profile: Profile;
  replyMessengFlag: boolean;
  favoriteFlag: boolean;
  addFavoriteFlag: boolean;
  textarea: HTMLTextAreaElement;
  btn: HTMLButtonElement;
  quantity: HTMLElement;
  quantityComment: HTMLElement;
  blockCommentSent: HTMLElement;
  headFavorites: HTMLElement;
  headComment: HTMLElement;
  blockCommentSending: HTMLElement;
  ratingComment: HTMLElement | null;
  imgFavorites: HTMLImageElement | null;
  listComments: Array<{
    name: string | undefined;
    surname: string | undefined;
    img: string | undefined;
    data: string | number;
    text: string;
    rating: number;
    favorites: string;
    imgFavoritws: string;
    answer: Array<
        {
          name: string | undefined;
          surname: string | undefined;
          img: string | undefined;
          data: string | number | Date;
          text: string;
          nameSend: string | undefined;
          surnameSent: string | undefined;
          favorites: string;
          imgFavoritws: string;
          rating: number;
        }
    >;
  }>;

  messageResponse: Element | undefined;
  check: number | undefined;
  filterFlag: { flag: boolean; filterHeadText: string; } | undefined;

  constructor(storage: Storag, profile: Profile) {
    this.storage = storage;
    this.profile = profile;
    this.textarea = this.storage.element.textarea;
    this.btn = this.storage.element.btn;
    this.quantity = this.storage.element.quantity;
    this.quantityComment = this.storage.element.quantityComment;
    this.blockCommentSent = this.storage.element.blockCommentSent;
    this.headFavorites = this.storage.element.headFavorites;
    this.headComment = this.storage.element.headComment;
    this.imgFavorites = this.storage.element.imgFavorites;
    this.blockCommentSending = this.storage.element.blockCommentSending;
    this.ratingComment = this.storage.element.ratingComment;

    this.replyMessengFlag = true;
    this.favoriteFlag = false;
    this.addFavoriteFlag = false;

    this.listComments = [];
    this.favoriteMessages();
    this.commentHead();
    this.sendingMessage();
    this.initMesseage();
    this.ratingMessages();
  }

  initMesseage(): void {
    this.filterFlag = JSON.parse(localStorage.getItem("filterFlag") as string);

    // localStorage.clear()
    this.listComments = JSON.parse(localStorage.getItem("comments") as string) ?? [];
    this.listComments.forEach((comment) => {
      this.renderMessage(comment);
      document
        .querySelectorAll(".block__comment__sent__answer")
        .forEach((element) => {
          this.messageResponse = element;
        });
      this.replyMessengFlag = false;
      comment.answer.forEach((element) => {
        this.renderMessage(element);
      });
      this.replyMessengFlag = true;
    });

    let sentNumber: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".block__comment__sent__number"
    );

    sentNumber.forEach((element) => {
      let numberReting = +element.innerHTML;
      if (numberReting < 0) {
        element.style.color = "red";
      } else if (numberReting > 0) {
        element.style.color = "green";
      } else {
        element.style.color = "black";
      }
    });

    let imgFavorites: NodeListOf<HTMLElement> =
      document.querySelectorAll(".img__favorites");
    if (imgFavorites)
      imgFavorites.forEach((element: HTMLElement) => {
        let nameSent = element.parentNode!.querySelector(
          ".block__comment__full__name"
        )!.innerHTML;
        let textSent = element.parentNode!.querySelector(
          ".block__comment__text"
        )!.innerHTML;

        this.listComments.forEach((comment) => {
          if (comment.favorites) {
            if (
              comment.text == textSent &&
              `${comment.name} ${comment.surname}` == nameSent
            ) {
              element.style.backgroundImage = comment.imgFavoritws;
            }
          }
          comment.answer.forEach((comment) => {
            if (comment.favorites) {
              if (
                comment.text == textSent &&
                `${comment.name} ${comment.surname}` == nameSent
              ) {
                element.style.backgroundImage = comment.imgFavoritws;
              }
            }
          });
        });
      });
  }

  // отправка сообщения
  sendingMessage() {
    document.addEventListener("click", (e) => {
      let target = (e.target as Element)
      if (target.className == "block__comment__sent__answer") {
        this.textarea.focus();
        this.messageResponse = target;
        this.replyMessengFlag = false;
      }

      if (e.target == this.btn) {
        let btnActive = document.querySelector(".active");

        if (btnActive && this.replyMessengFlag) {
          if (localStorage.getItem(`comment`))
            this.listComments = JSON.parse(
              localStorage.getItem("comments") as string
            );

          const newMesseng: {
            name: string | undefined;
            surname: string | undefined;
            img: string | undefined;
            data: string | number;
            text: string;
            rating: number;
            favorites: string;
            imgFavoritws: string;
            answer: Array<
                {
                  name: string | undefined;
                  surname: string | undefined;
                  img: string | undefined;
                  data: string | number | Date;
                  text: string;
                  nameSend: string | undefined;
                  surnameSent: string | undefined;
                  favorites: string;
                  imgFavoritws: string;
                  rating: number;
                }
            >;
          } = {
            name: this.profile.name,
            surname: this.profile.surname,
            img: this.profile.img,
            data: `${new Date()}`,
            text: this.textarea.value,
            rating: 0,
            favorites: "",
            imgFavoritws: "",
            answer: [],
          };

          this.listComments.push(newMesseng);

          localStorage.setItem("comments", JSON.stringify(this.listComments));

          this.listComments.forEach((comment, index) => {
            if (index == this.listComments.length - 1)
              this.renderMessage(comment);
          });
          this.update();
        }

        if (btnActive && !this.replyMessengFlag) {
          let nameSent = this.messageResponse!.parentNode!.querySelector(".block__comment__full__name")!.innerHTML;
          let textSent = this.messageResponse!.parentNode!.querySelector(".block__comment__text")!.innerHTML;

          this.listComments = JSON.parse(
            localStorage.getItem("comments") as string
          );

          this.listComments.forEach((comment) => {
            if (
              comment.text == textSent &&
              `${comment.name} ${comment.surname}` == nameSent
            ) {
              const newMessengAnswer: {
                name: string | undefined;
                surname: string | undefined;
                img: string | undefined;
                data: string | number | Date;
                text: string;
                nameSend: string | undefined;
                surnameSent: string | undefined;
                favorites: string;
                imgFavoritws: string;
                rating: number;
              } = {
                name: this.profile.name,
                surname: this.profile.surname,
                img: this.profile.img,
                data: `${new Date()}`,
                text: this.textarea.value,
                nameSend: comment.name,
                surnameSent: comment.surname,
                favorites: "",
                imgFavoritws: "",
                rating: 0,
              };

              comment.answer.push(newMessengAnswer);
              
              let commentAnswer =  comment.answer
              comment.answer.forEach((comment, index) => {
                if (index == commentAnswer.length - 1) this.renderMessage(comment);
              });
            }
          });

          localStorage.setItem("comments", JSON.stringify(this.listComments));
        }
        this.replyMessengFlag = true;
      }
    });
  }

  // открисовка сообшения в html
  renderMessage(comment: any) {
    let data = new Date(comment.data);
    let commentData = `${data.getDate()}.${data.getMonth()} ${data.getHours()}:${
      (data.getMinutes() < 10 ? "0" : "") + data.getMinutes()
    }`;
    if (this.replyMessengFlag) {
      let divComment = document.createElement("div");
      divComment.className = "sorting";
      divComment.innerHTML = `
        <div class = "block__comment__sent status ${comment.favorites}">
            <img class="block__comment__img__profile" src="${comment.img}" alt="foto"/>
            <span class="block__comment__full__name">${comment.name} ${comment.surname}</span>
            <span class="block__comment__data">${commentData}</span>
            <p class="block__comment__text">${comment.text}</p>
            <div class="block__comment__sent__answer">Ответить</div>
            <div class="img__favorites"></div>
            <div class="block__comment__sent__favorites">В избранном</div>
            <button class="block__comment__sent__minus">-</button>
            <div class="block__comment__sent__number">${comment.rating}</div>
            <button class="block__comment__sent__plus">+</button>
          </div>
          <div class="block__comment__answer__sorting"></div>
          `;
      this.blockCommentSent.appendChild(divComment);
    } else if (!this.replyMessengFlag) {
      let divReplyComment = document.createElement("div");
      divReplyComment.className = `block__comment__answer status ${comment.favorites}`;
      divReplyComment.innerHTML = `
          <img class="block__comment__img__profile" src="${comment.img}" alt="foto"/>
          <span class="block__comment__full__name">${comment.name} ${comment.surname}</span>
          <span class="block__comment__full__name_sending">${comment.nameSend} ${comment.surnameSent}</span>
          <span class="block__comment__data">${commentData}</span>
          <p class="block__comment__text">${comment.text}</p>
          <div class="img__favorites left_img"></div>
          <div id="answer__favorites" class="block__comment__sent__favorites">В избранном</div>
          <button class="block__comment__sent__minus">-</button>
          <div class="block__comment__sent__number">${comment.rating}</div>
          <button class="block__comment__sent__plus">+</button>
        `;
      this.messageResponse!.parentNode!.parentNode!.querySelector(".block__comment__answer__sorting")!.appendChild(divReplyComment);

      this.update();
    }
  }

  // рейтинг комментария
  ratingMessages() {
    document.addEventListener("click", (e) => {

      let target = (e.target as HTMLElement)
      if (
        target.classList.contains("block__comment__sent__minus") ||
        target.classList.contains("block__comment__sent__plus")
      ) {
        this.listComments = JSON.parse(localStorage.getItem("comments") as string) ?? [];

        let rating: HTMLElement | null = target.parentNode!.querySelector(".block__comment__sent__number");
        let ratingNumber = Number(rating?.innerHTML);

        if (target.classList.contains("block__comment__sent__minus")) {
          ratingNumber--;
        } else if (target.classList.contains("block__comment__sent__plus")) {
          ratingNumber++;
        }
        rating!.innerHTML = `${ratingNumber}`;

        this.listComments.forEach((comment) => {
          let nameSent = target.parentNode!.querySelector(".block__comment__full__name")!.innerHTML;
          let textSent = target.parentNode!.querySelector(".block__comment__text")!.innerHTML;

          if (
            comment.text == textSent &&
            `${comment.name} ${comment.surname}` == nameSent
          ) {
            comment.rating = ratingNumber;
            rating!.innerHTML = `${comment.rating}`;
          }

          comment.answer.forEach((comment) => {
            if (
              comment.text == textSent &&
              `${comment.name} ${comment.surname}` == nameSent
            ) {
              comment.rating = ratingNumber;
              rating!.innerHTML = `${comment.rating}`;
            }
          });
        });

        localStorage.setItem("comments", JSON.stringify(this.listComments));

        if (ratingNumber < 0) {
          rating!.style.color = "red";
        } else if (ratingNumber > 0) {
          rating!.style.color = "green";
        } else {
          rating!.style.color = "black";
        }
      }
    });
  }

  // При нажатии на раздел избранное показывает все избранные комментарии и меняет стили
  favoriteMessages() {
    this.headFavorites.addEventListener(`click`, () => {
      let status:NodeListOf<HTMLElement> = document.querySelectorAll(".status");
      let commentAnswer:HTMLElement | null = document.querySelector(".block__comment__answer");
      let sentAnswer:HTMLElement | null = document.querySelector(".block__comment__sent__answer");
      let imgFavorites:HTMLElement | null = document.querySelector(".img__favorites");

      // при нажатии показать все избранные коментарии
      if (this.favoriteFlag == false) {
        this.favoriteFlag = true;
        this.headFavorites.classList.add(`activ`);
        this.headComment.classList.remove(`activ`);
        this.blockCommentSending.style.display = `none`;

        this.check = setInterval(function () {
          let status:NodeListOf<HTMLElement> = document.querySelectorAll(".status");

          status.forEach((e) => {
            if (e.classList[2] !== "favorites") {
              e.style.display = `none`;
            }
          });
        }, 10);

        if (commentAnswer) {
          commentAnswer.style.marginLeft = "0px";
        }

        if (this.blockCommentSent) {
          sentAnswer!.style.display = `none`;
          imgFavorites!.style.marginLeft = "88px";
        }
      } else {
        // при нажатии второй раз показывает все коментариии

        this.favoriteFlag = false;
        this.headFavorites.classList.remove(`activ`);
        this.headComment.classList.add(`activ`);
        this.blockCommentSending.style.display = `grid`;

        clearInterval(this.check);
        status.forEach((e) => {
          e.style.display = `flex`;
        });

        if (commentAnswer) {
          commentAnswer.style.marginLeft = "86px";
        }
        if (this.blockCommentSent) {
          sentAnswer!.style.display = `block`;
          imgFavorites!.style.marginLeft = "0px";
        }
      }
    });

    // При нажатии на избарнное или иконку избранного, добовляет и удаляет класс фаворит, так же меняет изоброжение сердца.
    document.addEventListener("click", (e) => {
      let target = (e.target as HTMLElement)
      if (
        target.classList.contains("block__comment__sent__favorites") ||
        target.classList.contains("img__favorites")
      ) {
        let faforitesFlag = (target.parentNode as HTMLElement)
        faforitesFlag.classList.toggle("favorites");

        this.listComments = JSON.parse(localStorage.getItem("comments") as string) ?? [];

        this.listComments.forEach((comment) => {
          let nameSent = target.parentNode!.querySelector(".block__comment__full__name")!.innerHTML;
          let textSent = target.parentNode!.querySelector(".block__comment__text")!.innerHTML;

          if (
            comment.text == textSent &&
            `${comment.name} ${comment.surname}` == nameSent
          ) {
            let imgFavorites: HTMLImageElement | null = target.parentNode!.querySelector(".img__favorites")
            if (faforitesFlag) {
              comment.favorites = `favorites`;
              comment.imgFavoritws = `url(./img/heart-favorites.svg)`;
              imgFavorites!.style.backgroundImage = comment.imgFavoritws;
            } else {
              comment.favorites = ``;
              comment.imgFavoritws = `url(./img/heart.svg)`;
              imgFavorites!.style.backgroundImage = comment.imgFavoritws;
            }
          }

          comment.answer.forEach((comment) => {
            if (
              comment.text == textSent &&
              `${comment.name} ${comment.surname}` == nameSent
            ) {
              let imgFavorites: HTMLImageElement | null = target.parentNode!.querySelector(".img__favorites")
              if (faforitesFlag) {
                comment.favorites = `favorites`;
                comment.imgFavoritws = `url(./img/heart-favorites.svg)`;
                imgFavorites!.style.backgroundImage = comment.imgFavoritws;
              } else {
                comment.favorites = ``;
                comment.imgFavoritws = `url(./img/heart.svg)`;
                imgFavorites!.style.backgroundImage = comment.imgFavoritws;
              }
            }
          });
        });

        localStorage.setItem("comments", JSON.stringify(this.listComments));
      }
    });
  }

  // Меняет стили при переходе в раздел комментраия
  commentHead() {
    this.headComment.addEventListener(`click`, () => {
      let status: NodeListOf<HTMLElement> = document.querySelectorAll(".status");
      status.forEach((element) => {
        element.style.display = `flex`;
      });

      let commentAnswer: HTMLElement | null = document.querySelector(".block__comment__answer");
      let sentAnswer: HTMLElement | null = document.querySelector(".block__comment__sent__answer");
      let imgFavorites: HTMLElement | null = document.querySelector(".img__favorites");

      if (commentAnswer) {
        commentAnswer.style.marginLeft = "86px";
      }

      if (this.blockCommentSent) {
        sentAnswer!.style.display = `block`;
        imgFavorites!.style.marginLeft = "0px";
      }

      this.headComment.classList.add(`activ`);
      this.headFavorites.classList.remove(`activ`);
      this.favoriteFlag = false;
      this.blockCommentSending.style.display = `grid`;
      clearInterval(this.check);
    });
  }

  update() {
    this.textarea.value = "";
    this.textarea.style.height = "42px";
    this.quantity.innerHTML = "Макс. 1000 символов";
    this.btn.classList.remove(`active`);
  }
}
