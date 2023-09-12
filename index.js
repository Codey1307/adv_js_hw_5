class Card {
  constructor({ id, title, body, userId }, { name, email }) {
    this.postId = id;
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.card = null;
  }

  render() {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.dataset.postId = this.postId;
    this.card.innerHTML = `
<h2>${this.name} <span>@${this.email}</span></h2>
<h3>${this.title}</h3>
<p>${this.body}</p>
<button class="delete_btn">Delete post</button>
`;

    const deleteBtn = this.card.querySelector(".delete_btn");
    deleteBtn.addEventListener('click', () => {
      this.deleteCard();
    });

    container.append(this.card);
  }

  deleteCard() {
    axios
      .delete(`https://ajax.test-danit.com/api/json/posts/${this.postId}`)
      .then(() => {
        const cardElem = document.querySelector(
          `[data-post-id="${this.postId}"]`
        );
        if (cardElem) {
          cardElem.remove();
        }
      })
      .catch((error) => console.log("Не вдалося видалити елемент:", error));
  }
}


axios
  .get("https://ajax.test-danit.com/api/json/users")
  .then(({ data: userData }) => {
    axios
      .get("https://ajax.test-danit.com/api/json/posts")
      .then(({ data: postData }) => {
        postData.forEach((post) => {
          const user = userData.find( (user) => user.id === post.userId )
          if(user){
            new Card(post, user).render()
          }
        });
      }).catch((error) => console.log("Помилка при роботі з данним постів:", error));
  }).catch((error) => console.log("Помилка при роботі з данним користувачів:", error));

  