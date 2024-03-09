function get(element){
    return(document.getElementById(`${element}`));
}
// const userImage = document.querySelector("#userImage");
// const get = (element) => document.getElementById(`${element}`);
const userthemes = document.querySelector("[data-btntheme]");
const themeImage = get("themeImage");

const username = get("name");
const userImage = get("userImage");
const URL = "https://api.github.com/users/";
const input = get("inputField");
const searchBtn = get("btn");
const userGitLink = get("username");
const joinDate = get("date");
const userBio = get("profileBio");
const userrepos = get("repos");
const userfollowers = get("followers");
const userfollowing = get("following");
const userlocation = get("locationLink");
const userwebsite = get("websiteLink");
const usertwitter = get("twitterLink");
const useroffice = get("officeLink");
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function checkNull(apidata) {
    if (apidata === "" || apidata === null) {
        
        return false;
    }
    else {
        return true;
    }
}
github(URL+"omsonani-8");

searchBtn.addEventListener("click",()=>
{
     
    if(input.value != "" || input.value!=null)
    {
        github(URL+input.value);

    }
    
});
input.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        if (input.value !== "") {
            github(URL + input.value);
        }
    }
}, false);

async function github(gitURL)
{
    try
    {
        const response = await fetch(gitURL);
        const data = await response.json();
        console.log(data);
        
        
        userImage.src = `${data?.avatar_url}`;
        username.innerText =  `${data?.name}`;
        userGitLink.href = `${data?.html_url}`;
        userGitLink.innerText = `@${data?.login}`;
        date = data?.created_at.split("T").shift().split("-");
        joinDate.innerText = `Joined ${date[2]} ${month[date[1]-1]} ${date[0]}` 
        if(data.bio==="null")
        {
            userBio.innerText = "This Profile has no Bio";
        }
        else
        {
            userBio.innerText = `${data?.bio}`;
        }
        userrepos.innerText = data?.public_repos;
        userfollowers.innerText = data?.followers;
        userfollowing.innerText = data?.following;

        userlocation.innerText = checkNull(data?.location) ? data?.location : "Not Available"
        userwebsite.innerText = checkNull(data?.blog) ? data?.blog : "Not Available";

        userwebsite.href = checkNull(data?.blog) ? data?.blog : "#";

        usertwitter.innerText = checkNull(data?.twitter_username) ? data?.twitter_username : "Not Available";

        usertwitter.href = checkNull(data?.twitter_username) ? `https://twitter.com/${data?.twitter_username}` : "#";

        useroffice.innerText = checkNull(data?.company) ? data?.company : "Not Available";
        
    }
    catch(error)
    {
        console.log(error);
    }  
}




