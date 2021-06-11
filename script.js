const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API 
const count = 30;
const apiKey = 'lpyDUW0gwxRbw0OO5j_gmE572uFCn98u-QeIsQO6lUA';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
    }
}

// Helper function to set attributes 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and photos and add to DOM 

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in the array. 
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank',
        });

        //Create <img> for photo 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description, 
            title: photo.alt_description, 
        });

        // EventListener, check when each is finished loading 
        img.addEventListener('load', imageLoaded)

        //Put <img> inside  <a> element, and both inside Image Container 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// Get photos from Unsplash API 

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
      
        displayPhotos();

    }
    catch (error) {
        // Catch errors here 
    }
}

// Check to see if scroll is near bottom of page, load more photos. 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load

getPhotos();