class Carousel {
  constructor(el) {
      this.el = el;
      this.carouselOptions = ['previous', 'next'];
      this.carouselData = this.getCarouselData();
      this.carouselInView = [1, 2, 3, 4, 5];
      this.carouselContainer;
      this.carouselPlayState;
      this.currentIndex = 0; // Track the current index
  }

  getCarouselData() {
      const images = this.el.querySelectorAll('img');
      const data = Array.from(images).map((img, index) => ({
          id: `${index + 1}`,
          src: img.src,
          title: img.alt || ''
      }));

      // Hide the original images
      images.forEach(img => {
          img.style.display = 'none';
      });

      return data;
  }

  mounted() {
      this.setupCarousel();
  }

  setupCarousel() {
      const container = document.createElement('div');
      const controls = document.createElement('div');
      const controlDots = document.createElement('div');
      const headline = document.createElement('div');

      // Add container for carousel items and controls
      this.el.append(container, headline, controlDots, controls);
      container.className = 'carousel-container';
      controls.className = 'carousel-controls';
      controlDots.className = 'carousel-control-dots flex justify-center mt-4';
      headline.className = 'carousel-headline headline-6 md:headline-5 arrow-right text-center text-2xl my-4';

      // Take dataset array and append items to container
      this.carouselData.forEach((item, index) => {
          const carouselItem = document.createElement('img');
          container.append(carouselItem);

          // Add item attributes
          carouselItem.className = `carousel-item carousel-item-${index + 1}`;
          carouselItem.src = item.src;
          carouselItem.setAttribute('loading', 'lazy');
          carouselItem.setAttribute('data-index', `${index + 1}`);
      });

      this.carouselOptions.forEach((option) => {
          const btnArrows = { "next": "./images/icons/chevron-red-right.svg", "previous": "./images/icons/chevron-red-left.svg" };
          const btn = document.createElement('button');
          const axSpanImage = document.createElement('img');
          axSpanImage.src = btnArrows[option];
          btn.append(axSpanImage);

          // Add button attributes
          btn.className = `carousel-control carousel-control-${option}`;
          btn.setAttribute('data-name', option);

          // Add carousel control options
          controls.append(btn);
      });

      // Create control dots
      this.carouselData.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.className = `carousel-dot w-3 h-3 rounded-full bg-gray-500 mx-1 cursor-pointer`;
          dot.setAttribute('data-index', `${index}`);
          controlDots.append(dot);
      });

      // Set container property
      this.carouselContainer = container;

      // After rendering carousel to our DOM, setup carousel controls' event listeners
      this.setControls([...controls.children]);

      // Setup dot controls
      this.setDotControls([...controlDots.children]);

      // Set the initial headline and active dot
      this.updateHeadline(this.currentIndex);
      this.updateActiveDot(this.currentIndex);
  }

  setControls(controls) {
      controls.forEach(control => {
          control.onclick = (event) => {
              event.preventDefault();

              // Manage control actions, update our carousel data first then with a callback update our DOM
              this.controlManager(control.dataset.name);
          };
      });
  }

  setDotControls(dots) {
      dots.forEach(dot => {
          dot.onclick = (event) => {
              event.preventDefault();
              const index = parseInt(dot.getAttribute('data-index'));
              this.goToSlide(index);
          };
      });
  }

  goToSlide(index) {
      const difference = index - this.currentIndex;

      // Determine the direction of the animation
      const direction = difference > 0 ? 'next' : 'previous';

      // Update carousel data to bring the selected item to the front
      for (let i = 0; i < Math.abs(difference); i++) {
          if (direction === 'next') {
              this.carouselData.push(this.carouselData.shift());
          } else {
              this.carouselData.unshift(this.carouselData.pop());
          }
      }

      // Update carousel view
      this.carouselInView = this.carouselData.map((_, i) => i + 1);

      this.carouselInView.forEach((item, index) => {
          this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
      });

      this.carouselData.slice(0, 5).forEach((data, index) => {
          document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });

      // Update current index
      this.currentIndex = index;

      // Update active dot and headline
      this.updateActiveDot(this.currentIndex);
      this.updateHeadline(this.currentIndex);
  }

  controlManager(control) {
      if (control === 'previous') return this.previous();
      if (control === 'next') return this.next();

      return;
  }

  previous() {
      // Update order of items in data array to be shown in carousel
      this.carouselData.unshift(this.carouselData.pop());

      // Push the first item to the end of the array so that the previous item is front and center
      this.carouselInView.push(this.carouselInView.shift());

      // Update the css class for each carousel item in view
      this.carouselInView.forEach((item, index) => {
          this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
      });

      this.carouselData.slice(0, 5).forEach((data, index) => {
          document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });

      // Update current index
      this.currentIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;

      // Update active dot and headline
      this.updateActiveDot(this.currentIndex);
      this.updateHeadline(this.currentIndex);
  }

  next() {
      // Update order of items in data array to be shown in carousel
      this.carouselData.push(this.carouselData.shift());

      // Take the last item and add it to the beginning of the array so that the next item is front and center
      this.carouselInView.unshift(this.carouselInView.pop());

      // Update the css class for each carousel item in view
      this.carouselInView.forEach((item, index) => {
          this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
      });

      this.carouselData.slice(0, 5).forEach((data, index) => {
          document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      });

      // Update current index
      this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;

      // Update active dot and headline
      this.updateActiveDot(this.currentIndex);
      this.updateHeadline(this.currentIndex);
  }

  updateActiveDot(index) {
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
  }

  updateHeadline(index) {
      const headline = this.el.querySelector('.carousel-headline');
      headline.innerText = this.carouselData[index].title; // Display the title of the current item in view
  }
}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector('.carousel');
// Create a new carousel object
const galleryCarousel = new Carousel(el);
// Setup carousel and methods
galleryCarousel.mounted();
