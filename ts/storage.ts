class Storag {
  element: {
    selectedFilter: HTMLElement;
    filterData: HTMLElement;
    filterGrade: HTMLElement;
    filterRelevance: HTMLElement;
    headFavorites: HTMLElement;
    headComment: HTMLElement;
    filterAnswer: HTMLElement;
    imgProfile: HTMLImageElement
    nameProfile: HTMLElement;
    quantityComment: HTMLElement;
    blockCommentSending: HTMLElement;
    quantity: HTMLElement;
    ratingComment: HTMLElement | null;
    blockCommentSent: HTMLElement;
    filterName: HTMLElement;
    filterMenu: HTMLElement;
    sorting: HTMLElement | null;
    textarea: HTMLTextAreaElement;
    btn: HTMLButtonElement;
    imgFavorites: HTMLImageElement | null;
  } = {
    selectedFilter: document.querySelector(`.block__comment__head__filter`)!,
    filterData: document.querySelector(`.block__comment__head__data`)!,
    filterGrade: document.querySelector(`.block__comment__head__grade`)!,
    filterRelevance: document.querySelector(`.block__comment__head__relevance`)!,
    headFavorites: document.querySelector(".block__comment__head__favorites")!,
    headComment: document.querySelector(".block__comment__head__comment")!,
    filterAnswer: document.querySelector(`.block__comment__head__answer`)!,
    imgProfile: document.querySelector(".block__comment__img__profile")!,
    nameProfile: document.querySelector(".block__comment__full__name")!,
    quantityComment: document.querySelector(".quantity__comment")!,
    blockCommentSending: document.querySelector(".block__comment__sending")!,
    quantity: document.querySelector(".quantity__characters")!,
    ratingComment: document.querySelector(".block__comment__sent__number"),
    blockCommentSent: document.querySelector(".comment")!,
    filterName: document.querySelector(`.filter__name`)!,
    filterMenu: document.querySelector(`.filter`)!,
    sorting: document.querySelector(`.sorting`),
    textarea: <HTMLTextAreaElement>document.getElementById("textarea")!,
    btn: document.querySelector(".btn__comment")!,
    imgFavorites: document.querySelector(".img__favorites"),
  };
}
