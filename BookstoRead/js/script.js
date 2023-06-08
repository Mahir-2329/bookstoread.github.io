document.addEventListener('DOMContentLoaded', () => {
  const bookContainer = document.getElementById('bookContainer');
  const categorySelect = document.getElementById('category');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');

  const url = 'https://hapi-books.p.rapidapi.com/nominees/romance/2020';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9548690ea3msh00145c5131868b0p101866jsna9e7a7152123',
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const votes = document.getElementById('votes').value;
    const cover = document.getElementById('cover').value;
    const bookURL = document.getElementById('url').value;

    const formData = {
      name: bookName,
      author: author,
      category: category,
      votes: votes,
      cover: cover,
      url: bookURL
    };

    try {
      const submitURL = 'https://hapi-books.p.rapidapi.com/nominees';

      const response = await fetch(submitURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '9548690ea3msh00145c5131868b0p101866jsna9e7a7152123',
          'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Book submitted successfully!');
        document.getElementById('submitForm').reset();
      } else {
        throw new Error('Error submitting book');
      }
    } catch (error) {
      console.error('Error submitting book:', error);
    }
  }

  // Add form submit event listener
  const submitForm = document.getElementById('submitForm');
  submitForm.addEventListener('submit',handleSubmit);

  function displayBooks(data) {
    bookContainer.innerHTML = '';

    data.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');

      const bookImage = document.createElement('img');
      bookImage.src = book.cover;
      bookCard.appendChild(bookImage);

      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-card-info');

      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.name;
      bookInfo.appendChild(bookTitle);

      const bookAuthor = document.createElement('p');
      bookAuthor.textContent = `Author: ${book.author}`;
      bookInfo.appendChild(bookAuthor);

      const bookVotes = document.createElement('p');
      bookVotes.textContent = `Votes: ${book.votes}`;
      bookInfo.appendChild(bookVotes);

      const bookLink = document.createElement('a');
      bookLink.href = book.url;
      bookLink.textContent = 'Read More';
      bookInfo.appendChild(bookLink);

      bookCard.appendChild(bookInfo);
      bookContainer.appendChild(bookCard);
    });
  }

  async function fetchBooks() {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      displayBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  searchButton.addEventListener('click', () => {
    fetchBooks();
  });

  fetchBooks();
});
