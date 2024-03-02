const initialDarkMode = true;

const applyStyles = (darkMode) => {
    const mode = document.getElementById("mode");
    const icon = document.getElementById("icon");
    const title = document.querySelector(`.title`);
    const search = document.querySelector(".search");
    const result = document.querySelector(`.result`);
    const search_input = document.getElementById("search_input");
    const username = document.querySelector(".username");
    const join_date = document.querySelector(`.join_date`);
    const details = document.querySelector(".details");
    const follow_info = document.querySelector(".follow_info");
    const unit = document.querySelectorAll(`.unit`);
    const quantity = document.querySelectorAll(".quantity");
    const links = document.querySelectorAll('a');
  
    if (darkMode) {
      mode.textContent = "LIGHT";
      icon.innerHTML = `<img src="./icons/002-sun.png" alt="">`;
      mode.style.color = "#fff";
      title.style.color = "#fff";
      search.style.background = "#1E2A47";
      search_input.style.background = "#1E2A47";
      search_input.style.color = "#fff";
      result.style.background = "#1E2A47";
      username.style.color = "#fff";
      join_date.style.color = "#fff";
      details.style.color = "#fff";
      follow_info.style.background = "#141D2F";
      unit.forEach((item) => {
        item.style.color = "#fff";
      });
      quantity.forEach((item) => {
        item.style.color = "#fff";
      });
      links.forEach((link) => {
        link.style.color = "#fff";
      });
      document.body.classList.add("mode_change");
    } else {
      mode.textContent = "DARK";
      icon.innerHTML = ` <img src="./icons/moon.png" alt="">`;
      mode.style.color = "#697C9A";
      title.style.color = "#222731";
      search.style.background = "#FEFEFE";
      search_input.style.background = "#FEFEFE";
      search_input.style.color = "#4B6A9B";
      result.style.background = "#FEFEFE";
      username.style.color = "#2B3442";
      join_date.style.color = "#697C9A";
      details.style.color = "#4B6A9B";
      follow_info.style.background = "#F6F8FF";
      unit.forEach((item) => {
        item.style.color = "#4B6A9B";
      });
      quantity.forEach((item) => {
        item.style.color = "#2B3442";
      });
      links.forEach((link) => {
        link.style.color = "#4B6A9B";
      });
      document.body.classList.remove("mode_change");
    }
};
  
applyStyles(initialDarkMode);

const mode_change = document.getElementById("switch");
mode_change.addEventListener("click", () => {
  const currentMode = document.body.classList.contains("mode_change");
  applyStyles(!currentMode);
});

const search_btn = document.getElementById("search_btn");

search_btn.addEventListener("click", () => {
  const search_input = document.getElementById("search_input");
  const search_value = search_input.value.trim();
  if (search_value !== "") {
    searchResault(search_value);
    search_input.value = "";
  };
  
});

const searchResault = (search_value) => {
  const content_container = document.querySelector(".result");
  let loader = `<span class="loader"></span>`;
  content_container.innerHTML = loader;

  try {
    fetch(`https://api.github.com/users/${search_value}`)
      .then((response) => response.json())
      .then((data) => {
        
        const content = `
          <div class="profile_img1">
            <img class="img1" src="${data.avatar_url}" alt="" style="width: 117px; height: 117px; border-radius: 117px">
          </div>
          <div class="result_container">
              <div class="profile_info">
                  <div class="profile_img">
                      <img class="img" src="${data.avatar_url}" alt="">
                  </div>
                  <div class="username_info">
                      <div class="info">
                          <div class="username">${data.login}</div>
                          <div class="name">${data.name}</div>
                      </div>
                      <div class="join_date">joined: ${new Date(data.created_at).toDateString()}</div>
                  </div>
              </div>
              <div class="details">${data.bio || "Not available"}</div>
              <div class="follow_info">
                  <div class="repository_quantity">
                      <div class="unit">Repos</div>
                      <div class="quantity">${data.public_repos}</div>
                  </div>
                  <div class="follower_quantity">
                      <div class="unit">Followers</div>
                      <div class="quantity">${data.followers}</div>
                  </div>
                  <div class="following_quantity">
                      <div class="unit">Following</div>
                      <div class="quantity">${data.following}</div>
                  </div>
              </div>
              <div class="links">
                  <div class="location_tag">
                      <img class="link_icon" src="./icons/003-pin.png" alt="">
                      <a class="location" href="#">${data.location || "Not available"}</a>
                  </div>
                  <div class="github_tag">
                      <img class="link_icon" src="./icons/002-url.png" alt="">
                      <a class="github_link" href="">${data.html_url || "Not available"}</a>
                  </div>
                  <div class="twiter_tag">
                      <img class="link_icon" src="./icons/004-twitter.png" alt="">
                      <a class="twiter" href="">${data.twitter_username || "Not available"}</a>
                  </div>
                  <div class="office_tag">
                      <img class="link_icon" src="./icons/001-office-building.png" alt="">
                      <a class="office" href="">${data.company || "Not available"}</a>
                  </div>
              </div>
          </div>`;
          content_container.innerHTML = content;
          applyStyles(document.body.classList.contains("mode_change"));
      });
  } catch (error) {
    alert("No results");
  }
};
