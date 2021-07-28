const express = require('express');
const axios = require('axios');
const router = express.Router();
const Repo = require('../models/repo.js');

const { Octokit } = require("octokit");
const octokit = new Octokit({
    auth: "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",
    
});


let allRepos = [];

async function getReposOfUser() {
    try {
        const users = ['benawad', 'safak', 'adrianhajdin'];
        
        const resultAll = await Promise.all(
            users.map(user =>
            {
                return  octokit.request('GET /users/{username}/repos', {
                    username: user
                })
            }))
        for (let i = 0; i < resultAll.length; i++)
        {
            const result = resultAll[i].data;
            for(let j = 0; j < result.length; j++){

                const data = result[j];
                const res = await axios(data['languages_url'])
                let act = Object.keys(res.data);
                let langArray = [];
                for (let k = 0; k < 3; k++){
                        if(act[k])
                            langArray.push(act[k]);
                }
                
                let userRepoData = {
                    username: data['full_name'].split('/')[0],
                    repoName: data['name'],
                    userProfileUrl: data['owner']['html_url'],
                    stars: data['stargazers_count'],
                    forks: data['forks_count'],
                    description: data['description'],
                    languages: langArray,
                    majorLanguage: data['language'],
                    avatarUrl : data['owner']['avatar_url']
                };
                allRepos.push(userRepoData);

                }
        }
        }
     catch (e) {
        return console.log(e);
    }
}

//Search for repo based on user input
router.get('/', async (req, res) =>
{
    console.log('hit endpoint')
    const tech = req.query.tech;
    try
    {
        let repos = [];
        if (tech)
        {
            repos = await Repo.find({
                languages: {
                    $in: [tech],
                },
            });
            console.log('hit tech ')

        } else
        {
            repos = await Repo.find();
            console.log('hit all ')

        }
        res.status(201).send(repos);
    } catch (e) {
        res.status(400).send(e);
    }
})

//Store repos using backend 
router.post('/', async (req, res) => {
    try {
            console.log('success')
            await getReposOfUser()
            for (eachRepo of allRepos) {
            const newRepo = new Repo(eachRepo);
            const result = await newRepo.save();
            
                if (!result) {
                    return console.log('failed')
                }
            }
            res.send('Repos uploaded to db')
    } catch (e) {
        console.log(e);
        res.status(400).send('Failed'+ e)
    }
    console.log('success')
})

module.exports = router;
