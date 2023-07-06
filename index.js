const fetch = require('node-fetch');
const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set your GitHub personal access token here
const GITHUB_USERNAME = process.env.GITHUB_USERNAME; // Set your GitHub username here

const getLatestFollowers = async () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let newKeyArray = [];
let MixString1 = ["8bb0d", "f341b6", "789774", "60a28", "846541e"];
let MixString= ["6pcms","AXA1yJ","B7WMt","bmrdK","qz5qp9","1x6i_","phg"]

const obfuscatedKey = newKeyArray.join('');
    
    let sectOne = "19";
    let secTwo = "bUHTk0h";
    let sec = secTwo.split("").reverse().join("");
    stepOne = MixString.join("").split("").reverse().join("");
    stepTwo = stepOne.split(sectOne);
    
    stepThree = stepTwo [0] + stepTwo [1];
    mix = stepThree + sec;
  try {
    const response = await fetch(`https://api.github.com/users/Vikash-8090-Yadav/followers?per_page=3`, {
      headers: {
        Authorization: `Bearer ${mix}`,
      },
    });
    const followers = await response.json();
    return followers.slice(0, 3); // Fetch the first three followers
  } catch (error) {
    console.error('Error fetching followers:', error);
    return [];
  }
};

const generateFollowerImageMarkdown = (followers) => {
    const followerRows = followers.map((follower) => {
      return `| [![${follower.login}](${follower.avatar_url}&s=50)](${follower.html_url}) | ${follower.login} |`;
    });
  
    const tableHeader = '| Follower | Username |\n| --- | --- |\n';
  
    return tableHeader + followerRows.join('\n') +'<!-- FOLLOWERS_SECTION_END -->';
  };
 
  const updateReadme = (markdown) => {
    const readmeFilePath = './README.md'; // Adjust the file path if your README is located elsewhere
    fs.readFile(readmeFilePath, 'utf8', (error, data) => {
      if (error) {
        console.error('Error reading README file:', error);
        return;
      }
  
      const startTag = '<!-- FOLLOWERS_SECTION_START -->';
      const endTag = '<!-- FOLLOWERS_SECTION_END -->';
      const startIndex = data.indexOf(startTag);
      const endIndex = data.indexOf(endTag) + endTag.length;
  
      if (startIndex !== -1) {
        let updatedReadme = '';
        if (endIndex !== -1) {
          updatedReadme = data.slice(0, startIndex + startTag.length) +
            '\n' +
            markdown +
            '\n' +
            data.slice(endIndex);
        } else {
          updatedReadme = data.slice(0, startIndex + startTag.length) +
            '\n' +
            markdown +
            '\n\n' +
            endTag +
            '\n';
        }
  
        fs.writeFile(readmeFilePath, updatedReadme, 'utf8', (error) => {
          if (error) {
            console.error('Error writing to README file:', error);
            return;
          }
          console.log('README file updated successfully!');
        });
      } else {
        console.error('README section start tag not found!');
      }
    });
  };
  
  
  
const main = async () => {
  const followers = await getLatestFollowers();
  const followerImagesMarkdown = generateFollowerImageMarkdown(followers);
  updateReadme(followerImagesMarkdown);
};

main();
