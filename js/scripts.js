var starwarsRepository = (function () {
// Array with Star Wars Characters as Objects
  var characters = [];

// API URL
  var apiURL = 'https://akabab.github.io/starwars-api/api/all.json';

// function to add characters
  function add(item) {
    characters.push(item);
  }

// function to select characters
  function getAll() {
    return characters;
  }

// function to add List item to DOM
  function addListItem(character) {
    var $unorderedList = $('ul');
    // create necessary elements
    var $newListElement = $('<li></li>');
    var $newSpanElement = $('<span>' + character.name + '</span>');
    var $newButtonElement = $('<button>+</button>');
    // add the classes
    $newListElement.addClass('content__item');
    $newButtonElement.addClass('content__item--button');
    //append new elements
    $unorderedList.append($newListElement);
    $newListElement.append($newSpanElement);
    $newListElement.append($newButtonElement);
    // add event listener
    $newButtonElement.on('click', function (event) {
      showDetails(character);
    });
    $newButtonElement.on('click', function (event) {
      var audio = new Audio('files/lasrhit4.mp3');
      audio.play();
    });
  }

// modal functions (show/hide)
  function showModal(title, mass, height, gender, homeworld, species, more, image) {
    var $modalContainer = $('#modal-container');
    $modalContainer.empty(); // clear all content

    var modal = $('<div class="modal"></div>'); // create inner modal div

    // adding the new content
    var closeButtonElement = $('<div class="button-element"></div>'); // close button
    var closeButton = $('<button class="modal-close">Close</button>');
    closeButton.on('click', hideModal);

    var imageContainer = $('<div class="image-container"></div>'); // image
    var characterImage = $('<img src="' + image + '" class="character-image">');

    var titleElement = $('<h1>' + title + '<h1>'); // create title element

    var contentElementMass = $('<p>Mass: ' + mass + '</p>'); // create content elements
    var contentElementHeight = $('<p>Height: ' + height + '</p>');
    var contentElementGender = $('<p>Gender: ' + gender + '</p>');
    var contentElementHomeworld = $('<p>Homeworld: ' + homeworld + '</p>');
    var contentElementSpecies = $('<p>Species: ' + species + '</p>');
    var contentElementMore = $('<p>More Details: </p>');
    var contentElementMoreLink = $('<a href="' + more + '" target="_blank">Here</a>');

    // apoending elements
    modal.append(closeButtonElement);
    closeButtonElement.append(closeButton);
    modal.append(imageContainer);
    imageContainer.append(characterImage);
    imageContainer.append(titleElement);
    modal.append(contentElementMass);
    modal.append(contentElementHeight);
    modal.append(contentElementGender);
    modal.append(contentElementHomeworld);
    modal.append(contentElementSpecies);
    modal.append(contentElementMore);
    contentElementMore.append(contentElementMoreLink);
    $modalContainer.append(modal);

    $modalContainer.addClass('is-visible'); // add class to show modal
    $modalContainer
      .velocity('fadeIn', { duration: 500 });
  }

  function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible'); // remove class to hide modal
  }

// function for showing the details of the characters in a modal
  function showDetails(item) {
    showModal(item.name, item.mass, item.height, item.gender, item.homeworld, item.species, item.more, item.img);
  }

// loading the characters from API
  function loadList() {
    return $.ajax(apiURL, {dataType: 'json'})
      .then(function (response) {
        response.forEach(function (item) {
          var character = {
            name: item.name,
            mass: item.mass,
            height: item.height,
            gender: item.gender,
            homeworld: item.homeworld,
            species: item.species,
            more: item.wiki,
            img: item.image
          };
          add(character);
        });
      }).catch(function (e) {
          console.error(e);
        });
  }

// eventListeners for closing the modal by pressing ESC or clicking outside modal
  $(window).on('keydown', function(event) { // press ESC
    var $modalContainer = $('#modal-container');

    if (event.key === "Escape" && $modalContainer.hasClass('is-visible')) {
      hideModal();
    }
  });

  var $modalContainer = $('#modal-container'); // click outside modal
  $modalContainer.on('click', function(event) {
    if ($(event.target).is($modalContainer)) {
      hideModal();
    }
  });

  return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   showDetails: showDetails,
   loadList: loadList
  };

})();

// Call loadList() to create the elements for the DOM

starwarsRepository.loadList().then(function() {
  starwarsRepository.getAll().forEach(function(character){
    starwarsRepository.addListItem(character);
  });
});
