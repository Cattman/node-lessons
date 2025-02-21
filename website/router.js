"use strict";
const appDiv = "app";
const navDiv = "nav";

let routes = {};
let templates = {};

// Register a template (this is to mimic a template engine)
let template = (name, templateFunction) => {
  return templates[name] = templateFunction;
};
// Define the routes. Each route is described with a route path & a template to render
// when entering that path. A template can be a string (file name), or a function that
// will directly create the DOM objects.
let route = (path, template) => {
    if (typeof template == "function") {
      return routes[path] = template;
    }
    else if (typeof template == "string") {
      return routes[path] = templates[template];
    }
    else {
      return;
    }
};

template('app', () => {
  let myDiv = document.getElementById('app');
  //myDiv.innerHTML = "app/";
  let links = [3];
  links[0] = createLink('home', 'Menu1', './home/home.html');
  links[1] = createLink('page2', 'Menu2', './page2/page2.html');
  for (let index = 0; index < links.length; index++) {
    myDiv.appendChild(links[index]);
  }
  return myDiv;
});

template('nav', () => {
  let myDiv = document.getElementById('nav');
  myDiv.innerHTML = "./menu/menu.html";
  return myDiv;
});

//Helper function to creat a navbar
let createNav = () => {

}

// Helper function to create a link.
let createLink = (title, text, href) => {
  let a = document.createElement('a');
  let linkText = document.createTextNode(text);
  a.appendChild(linkText);
  a.title = title;
  a.href = href;
  return a;
};

route()
route('/', 'nav')
route('/', 'app');

// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
    try {
     return routes[route];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};
// The actual router, get the current URL and generate the corresponding template
let router = (evt) => {
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    routeResolved();
};
// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);