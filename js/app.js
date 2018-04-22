// Model

var model = {
  currentCat: null,
  cats: [
    {
      clicks: 0,
      name: "Cat1",
      img: "images/cat1.jpg"
    },
    {
      clicks: 0,
      name: "Cat2",
      img: "images/cat2.jpg"
    },
    {
      clicks: 0,
      name: "Cat3",
      img: "images/cat3.jpg"
    },
    {
      clicks: 0,
      name: "Cat4",
      img: "images/cat4.jpg"
    },
    {
      clicks: 0,
      name: "Cat5",
      img: "images/cat5.jpg"
    }
  ]
};

// Octopus

var octopus = {

  init: function() {
    model.currentCat = model.cats[0];

    catListView.init();
    catView.init();
    adminView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  incrementCounter: function(){
    model.currentCat.clicks++;
    catView.render();
  },

  adminView: function() {
    this.adminForm = document.getElementById('admin-form');
    if (this.adminForm.style.display === "none") {
      this.adminForm.style.display = "block";
    } else {
      this.adminForm.style.display = "none"
    }
  },

  updateCat: function() {
    this.formName = document.getElementById('form-name').value;
    this.formUrl = document.getElementById('form-url').value;
    this.formClicks = document.getElementById('form-clicks').value;

    if(this.formName) {
      model.currentCat.name = this.formName;
    };
    if(this.formUrl) {
      model.currentCat.img = this.formUrl;
    };
    if(this.formClicks) {
      model.currentCat.clicks = this.formClicks;
    };

    this.formName = "";
    this.formUrl = "";
    this.formClicks = "";

    catView.render();
    catListView.render();
  },

  cancelUpdate: function() {
    this.formName = document.getElementById('form-name');
    this.formUrl = document.getElementById('form-url');
    this.formClicks = document.getElementById('form-clicks');

    this.formName.value = "";
    this.formUrl.value = "";
    this.formClicks.value = "";
  }
};

// View

var catView = {

  init: function() {
    this.catElem = document.getElementById('cat')
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    this.catImageElem.addEventListener('click', function(){
      octopus.incrementCounter();
    });

    this.render()
  },

  render: function() {

    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clicks;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.img;
  }
};

var catListView = {

  init: function() {
    this.catListElem = document.getElementById('cats');

    this.render();
  },

  render: function(){
    var cat, elem, i;

    var cats = octopus.getCats();

    this.catListElem.innerHTML = '';

    for (i = 0; i < cats.length; i++) {
      cat = cats[i];

      elem = document.createElement('li');
      elem.textContent = cat.name;

      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));

      this.catListElem.appendChild(elem);
    }
  }
};

var adminView = {
  init: function() {
    this.adminButton = document.getElementById('admin');
    this.adminForm = document.getElementById('admin-form');
    this.saveButton = document.getElementById('save');
    this.cancelButton = document.getElementById('cancel');

    this.adminForm.style.display = "none"

    this.adminButton.addEventListener("click", function(){
      octopus.adminView();
    });
    this.saveButton.addEventListener("click", function(){
      octopus.updateCat();
    });
    this.cancelButton.addEventListener("click", function(){
      octopus.cancelUpdate();
    });
  }
};

octopus.init();
