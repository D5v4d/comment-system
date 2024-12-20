class Filter {
  storage: Storag;
  messag: Messag;
  selectedFilter: HTMLElement;
  filterMenu: HTMLElement;
  filterName: HTMLElement;
  filterData: HTMLElement;
  filterGrade: HTMLElement;
  filterRelevance: HTMLElement;
  filterAnswer: HTMLElement;
  listComments: { name: string | undefined; surname: string | undefined; img: string | undefined; data: string | number; text: string; rating: number; favorites: string; imgFavoritws: string; answer: Array<{ name: string | undefined; surname: string | undefined; img: string | undefined; data: string | number | Date; text: string; nameSend: string | undefined; surnameSent: string | undefined; favorites: string; imgFavoritws: string; rating: number; }>; }[];
  filter: { flag: boolean; filterHeadText: string; };
  data: null;
  checkMark: null;
  relevance: null;
  answer: null;
  blockMenu: boolean;
  filterArray: Element[];
  constructor(storage: Storag, messag: Messag) {
    this.storage = storage;
    this.messag = messag;

    this.selectedFilter = this.storage.element.selectedFilter;
    this.filterMenu = this.storage.element.filterMenu;
    this.filterName = this.storage.element.filterName;

    this.filterData = this.storage.element.filterData;
    this.filterGrade = this.storage.element.filterGrade;
    this.filterRelevance = this.storage.element.filterRelevance;
    this.filterAnswer = this.storage.element.filterAnswer;

    this.listComments = this.messag.listComments;

    this.filterArray = Array.from(this.filterMenu.children);

    this.filter = {
      flag: true,
      filterHeadText: `По количеству оценок`,
    };

    this.data = null;
    this.checkMark = null;
    this.relevance = null;
    this.answer = null;

    this.blockMenu = false;
    this.initFilter();
    this.sorting();
  }

  //  Открытие и закрытие фильтра
  initFilter() {
    if(localStorage.getItem(`filter`)) this.filter = JSON.parse(localStorage.getItem("filter") as string);

    this.filterName.innerHTML = `${this.filter.filterHeadText}`;
    let checkMark: HTMLElement | null = document.querySelector(".check_mark")
    if(checkMark)
    checkMark.classList.remove("check_mark");

    this.filterArray.forEach((element) => {
      if (element.innerHTML == this.filterName.innerHTML) {
        element.classList.add("check_mark");
      }
    });

    this.filterImg();

    // Добавляем событие для открытия меню только один раз
    this.selectedFilter.addEventListener("click", () => {
      if (this.blockMenu){
        this.blockMenu = false;
        this.filterMenu.style.display = `none`; // Закрываем меню
      }else{
        this.filterMenu.style.display = `block`;
        this.blockMenu = true;
      } 
      });
  }


  sorting() {

    this.filterArray.forEach((element) => {
      element.addEventListener("click", (e) => {

        this.listComments = JSON.parse(localStorage.getItem("comments") as string);
        if(localStorage.getItem(`filter`)) 
        this.filter = JSON.parse(localStorage.getItem("filter") as string);

        let target = (e.target as Element)
        if (target.classList.contains("block__comment__head__answer")) {
          this.filter.filterHeadText = 'По количеству ответов'
          if (this.filter.flag) {
            this.filter.flag = false;
            this.listComments.sort((a, b) => {
              const answersA = a.answer.length;
              const answersB = b.answer.length;
              return answersA - answersB;
            });
          } else {
            this.filter.flag = true;
            this.listComments.sort((a, b) => {
              const answersA = a.answer.length;
              const answersB = b.answer.length;
              return answersB - answersA;
            });
          }
        }

        if(target.classList.contains("block__comment__head__grade")){
          this.filter.filterHeadText = 'По количеству оценок'
          if (this.filter.flag) {
            this.filter.flag = false;
            this.listComments.sort((a, b) => {
              const answersA = a.rating;
              const answersB = b.rating;
              return answersA - answersB;
            });
            this.listComments.forEach(comment => {
              comment.answer.sort((a, b) => {
                const answersA = a.rating;
                const answersB = b.rating;
                return answersA - answersB;
              });
            });

          } else {
            this.filter.flag = true;
            this.listComments.sort((a, b) => {
              const answersA = a.rating;
              const answersB = b.rating;
              return answersB - answersA;
            });
            this.listComments.forEach(comment => {
              comment.answer.sort((a, b) => {
                const answersA = a.rating;
                const answersB = b.rating;
                return answersB - answersA;
              });
            });
          }
        }
        
        if(target.classList.contains("block__comment__head__data")){
           this.filter.filterHeadText = 'По дате'
          if (this.filter.flag) {
            this.filter.flag = false;
            this.listComments.sort((a, b) => {
              return +new Date(a.data) - +new Date(b.data)
            });
            this.listComments.forEach(comment => {
              comment.answer.sort((a, b) => {
                return +new Date(a.data) - +new Date(b.data)
              });
            });
            
          } else {
            this.filter.flag = true;
            this.listComments.sort((a, b) => {
              return +new Date(b.data) - +new Date(a.data)
            });
            this.listComments.forEach(comment => {
              comment.answer.sort((a, b) => {
                return +new Date(b.data) - +new Date(a.data)
              });
            });
          }
        }
        localStorage.setItem("comments", JSON.stringify(this.listComments));
        localStorage.setItem("filter", JSON.stringify(this.filter));

        this.storage.element.blockCommentSent.innerHTML = "";

        this.messag.initMesseage();

        this.filterImg();

        // Сбрасываем старую отметку
        const currentMark: HTMLElement | null = this.filterMenu.querySelector(`.check_mark`);
        if (currentMark) currentMark.classList.remove("check_mark");

        // Устанавливаем новую отметку
        element.classList.add("check_mark");
        this.filterName.innerHTML = `${element.textContent}`;
        this.filter.filterHeadText = this.filterName.innerHTML;
        this.filterMenu.style.display = `none`; // Закрываем меню
      });
    });
  }

  // изминение фотографии фильтра img по фильтрации
  filterImg() {
    let arrow: HTMLImageElement | null = document.querySelector(".arrow")
    if(arrow)
    if (this.filter.flag) {
      arrow.src = "img/arrow-button.svg";
    } else {
      arrow.src = "img/arrow-top.svg";
    }
  }
}
