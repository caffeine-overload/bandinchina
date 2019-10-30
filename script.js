const isProd = window.location.href.indexOf("https://caffeine-overload.github.io/bandinchina") > -1;
const stateManagement = $("#current-page")[0];

let initialRender = true;

// Changes the links in dev environment for testing purposes
if(!isProd) {
  const listOfLinks = $("[data-link-type=\"go-to\"]");

  listOfLinks.each(function() {
    const link = $(this);

    // Prevents re-rendering of the same "home" content
    link.click(() => {
      if(stateManagement.innerText !== "Home") {
        $.get("./README.md", renderMarkdown());
      }
    })
  })
}

// Obtains the README file and renders it
$.get("./README.md", renderMarkdown());

// Obtains the whitelist document in the public assets and renders it
$("#whitelist-nav").click(e => {
  $.get("https://raw.githubusercontent.com/caffeine-overload/bandinchina/master/public/assets/lists/whitelist.md", renderMarkdown({newState: "Whitelist"}));
  return false;
})

// Obtains the blacklist document in the public assets and renders it
$("#blacklist-nav").click(e => {
  $.get("https://raw.githubusercontent.com/caffeine-overload/bandinchina/master/public/assets/lists/blacklist.md", renderMarkdown({newState: "Blacklist"}));
  return false;
})


// A button that redirects to the home page
// This was refactored into a button to work in a dev environment while still maintaining the 
// 	slug "/bandinchina" as the homepage
$("#home-nav").click(e => {
  location.href = `${location.origin}${location.pathname}`;
  return false;
})

function renderMarkdown(params = {}) {
  const { newState = "Home" } = params;

  const isList = newState === "Blacklist" || newState === "Whitelist";

  return function (file) {
    stateManagement.innerText = newState;
    // filter the markdown table using a Regular Expression
    // this is meant to allow certain content to show up in the repo but not in the site
    // by setting the flags <!-- RENDER START --> and <!-- RENDER END -->
    const tableRegex = /<!-- RENDER START -->([\S\s]*?)<!-- RENDER END -->/;
    const match = file.match(tableRegex);
    const tableMD = (match.length > 1) ? match[1] : "Table wasn't loaded properly 😬";

    // render the markdown into HTML
    const render = (new showdown.Converter({ tables: true })).makeHtml(tableMD);

    // replace the main content with the rendered .md
    $(" #content ").html(render);
    $(" #content table ").addClass("table table-hover");
    
    if(initialRender) {
      initialRender = false;
    } else {
      location.href = "#content";
    }
  }
}