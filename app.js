const mode_change = document.getElementById("switch");

mode_change.addEventListener('click', () => {
    const mode = document.getElementById('mode');
    const icon = document.getElementById('icon');

    // console.log("Current text content:", mode.textContent);
    // console.log("Current icon inner HTML:", icon.innerHTML);

    if (mode.textContent === 'DARK' && icon.innerHTML === `<img src="./icons/moon.png" alt="">`) {
        mode.textContent = "LIGHT";
        icon.innerHTML = `<img src="./icons/002-sun.png" alt="">`;
        // console.log("Switching to light mode");
    } else {
        mode.textContent = "DARK";
        icon.innerHTML = ` <img src="./icons/moon.png" alt="">`;
        // console.log("Switching to dark mode")
    };

    // console.log("Updated text content:", mode.textContent);
    // console.log("Updated icon inner HTML:", icon.innerHTML);

    document.body.classList.toggle('mode_change');
});

const search_input = document.getElementById('search_input');
const search__btn = document.getElementById('search_btn');

search__btn.addEventListener('click', () => {
    const search_value = search_input.value;

    try {
        fetch(`https://api.github.com/users/${search_value}`)
            .then(response => response.json())
            .then(data => {
                const content_container = document.querySelector('.result');
                search__btn.innerHTML = '<span id="loader" class="loader"></span>';

                content_container.innerHTML = `
                    <div class="profile_info">
                        <div class="profile_img">
                            <img class="img" src="${data.avatar_url}" alt="">
                        </div>
                        <div class="username_info">
                            <div class="info">
                                <div class="username">${data.login}</div>
                                <div class="name">${data.name}</div>
                            </div>
                            <div class="join_date">'joined' + ${new Date(data.created_at).toDateString()}</div>
                        </div>
                    </div>
                    <div class="details">${data.bio || 'Not available'}</div>
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
                        <div class="tags">
                            <img class="link_icon" src="./icons/003-pin.png" alt="">
                            <a class="location" href="#">${data.location || 'Not available'}</a>
                        </div>
                        <div class="tags">
                            <img class="link_icon" src="./icons/002-url.png" alt="">
                            <a class="github_link" href="">${data.html_url || 'Not available'}</a>
                        </div>
                        <div class="tags">
                            <img class="link_icon" src="./icons/004-twitter.png" alt="">
                            <a class="twiter" href="">${data.twitter_username || 'Not available'}</a>
                        </div>
                        <div class="tags">
                            <img class="link_icon" src="./icons/001-office-building.png" alt="">
                            <a class="github" href="">${data.company || 'Not available'}</a>
                        </div>
                    </div>
                    `;
            }).finally(() => {
                search__btn.innerHTML = 'Search';
            });
    } catch (error) {
        // loader.classList.add()
        alert("No results");
    };
});